require('dotenv').config();

const boot = require('./boot-server');

const withAssets = {
  staticPath: './web/static',

  // Homepage assets
  // TODO this could be automated if a few rules are adhered to
  js: { 
    homepage: './web/views/homepage/homepage.js', 
    posts: './web/views/posts/posts.js',
    post: './web/views/post/post.js',
    contact: './web/views/contact/contact.js'
  },
  css: [
    './web/views/homepage/homepage.css', 
    './web/views/posts/posts.css', 
    './web/views/post/post.css',
    './web/views/contact/contact.css',
  ]
}

boot( withAssets );