import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { getPostSlugs, getPostBySlug, getAllPosts } from "./blog";

const TEST_BLOG_DIR = path.join(process.cwd(), "blog");

const samplePost = `---
title: Test Post
date: 2024-01-15
tags:
  - test
  - sample
excerpt: A test post for unit testing
---

# Test Post

This is test content.
`;

const olderPost = `---
title: Older Post
date: 2024-01-01
tags:
  - old
---

# Older Post

This is older content.
`;

describe("blog", () => {
  beforeEach(() => {
    if (!fs.existsSync(TEST_BLOG_DIR)) {
      fs.mkdirSync(TEST_BLOG_DIR, { recursive: true });
    }
    fs.writeFileSync(path.join(TEST_BLOG_DIR, "test-post.mdx"), samplePost);
    fs.writeFileSync(path.join(TEST_BLOG_DIR, "older-post.mdx"), olderPost);
  });

  afterEach(() => {
    const testFiles = ["test-post.mdx", "older-post.mdx"];
    for (const file of testFiles) {
      const filePath = path.join(TEST_BLOG_DIR, file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  });

  describe("getPostSlugs", () => {
    it("should return all mdx file slugs", () => {
      const slugs = getPostSlugs();
      assert.ok(slugs.includes("test-post"));
      assert.ok(slugs.includes("older-post"));
    });

    it("should strip file extensions from slugs", () => {
      const slugs = getPostSlugs();
      const hasExtension = slugs.some(
        (s) => s.endsWith(".mdx") || s.endsWith(".md"),
      );
      assert.strictEqual(hasExtension, false);
    });
  });

  describe("getPostBySlug", () => {
    it("should return post data for valid slug", () => {
      const post = getPostBySlug("test-post");
      assert.ok(post !== null);
      assert.strictEqual(post.title, "Test Post");
      assert.strictEqual(post.slug, "test-post");
      assert.deepStrictEqual(post.tags, ["test", "sample"]);
      assert.strictEqual(post.excerpt, "A test post for unit testing");
    });

    it("should return null for non-existent slug", () => {
      const post = getPostBySlug("does-not-exist");
      assert.strictEqual(post, null);
    });

    it("should parse date as ISO string", () => {
      const post = getPostBySlug("test-post");
      assert.ok(post !== null);
      assert.ok(post.date.includes("2024-01-15"));
    });

    it("should include raw MDX content", () => {
      const post = getPostBySlug("test-post");
      assert.ok(post !== null);
      assert.ok(post.content.includes("# Test Post"));
      assert.ok(post.content.includes("This is test content."));
    });

    it("should strip frontmatter from content", () => {
      const post = getPostBySlug("test-post");
      assert.ok(post !== null);
      assert.ok(
        !post.content.includes("---"),
        "Content should not contain frontmatter delimiters",
      );
      assert.ok(
        !post.content.includes("title: Test Post"),
        "Content should not contain frontmatter fields",
      );
    });
  });

  describe("getAllPosts", () => {
    it("should return all posts", () => {
      const posts = getAllPosts();
      assert.ok(posts.length >= 2);
    });

    it("should sort posts by date descending (newest first)", () => {
      const posts = getAllPosts();
      const testPost = posts.find((p) => p.slug === "test-post");
      const olderPost = posts.find((p) => p.slug === "older-post");
      assert.ok(testPost && olderPost);
      const testIndex = posts.indexOf(testPost);
      const olderIndex = posts.indexOf(olderPost);
      assert.ok(
        testIndex < olderIndex,
        "Newer post should come before older post",
      );
    });
  });
});
