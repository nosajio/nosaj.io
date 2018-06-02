const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const MemoryFS = require('memory-fs');
const postcss = require('postcss');
const { basedir, fromBase } = require('constants/paths');

const { error, log } = require('server/logging')('compile-assets');

const dev = process.env.ENV === 'development';

// Initialise the memory filesystem where the assets will be stored
// until they are needed in response to incoming requests.
// * Keep out of scope so that memfs can act as a in memory cache for assets
const memfs = new MemoryFS();

// Plugins to apply to the postcss pipeline
const postcssPlugins = [];


/**
 * Retrieve an asset from filesystem
 * @param {String[]} assetPath The path from the output directory to
 *                                  the requested file.
 */
const assetFromFS = assetPath => {
  const assetString = memfs.readFileSync(`/${assetPath}`).toString();
  return assetString;
}


/**
 * Save an asset as a fake file in memory
 * @param {String} filepath 
 * @param {String} contents 
 */
const assetToFS = (filepath, contents) => {
  const filename = path.basename(filepath);
  memfs.writeFileSync(`/${filename}`, contents);
}


/**
 * Compile postcss css files to memory. Handles an array of entry points
 * @param {String[]} entries - entry paths should be relative to project dir
 */
const cssToMemory = async entries => {
  const postcssOps = entries.map(e => openFileAndPostcss(e));
  const cssBundles = await Promise.all(postcssOps).catch(err => error(err));
  try {
    cssBundles.forEach(b => assetToFS(...b));
  } catch(err) {
    throw err;
  }
  return entries;
}


/**
 * Open a css file and buffer the contents to postcss
 * @param {String} filepath - Path to a css file to be compiiled
 */
const openFileAndPostcss = filepath => {
  const pathFromBase = fromBase(filepath);
  let fileContents;
  try {
    fileContents = fs.readFileSync(pathFromBase);
  } catch(err) {
    error('Couldn\'t open the css file for some reason');
    return Promise.reject(err);
  }
  return postcss(postcssPlugins)
      .process(fileContents, { from: pathFromBase })
      .then(result => ([filepath, result.css]))
}


/**
 * Compile assets from entry point and return a Map of bundles
 * @param {String|String[]} entry
 */
const bundleToMemory = entry => new Promise(resolve => {
  
  // Setup the webpack options
  // TODO move this into a config file, split for prod/dev environments
  const options = {
    mode: dev ? 'development' : 'production',
    entry,

    output: {
      // Don't mirror the machine's filesystem, start at root instead. It's only
      // an in memory abstraction anyway
      path: '/'
    },
  };

  // Prime the webpack compiler and then configure and run it
  const compiler = webpack(options);

  // Use the memory filesystem
  compiler.outputFileSystem = memfs;
  
  compiler.run((err, stats) => {
    if (err || stats.hasErrors()) {
      error(stats.compilation.errors);
      return;
    }
    const compileTime = stats.endTime - stats.startTime;
    log('Compiled assets in %sms', compileTime);

    resolve();
  });
});


module.exports = { assetFromFS, bundleToMemory, cssToMemory }