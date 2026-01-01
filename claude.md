# nosaj.io

Personal site with MDX blog built on Next.js 16.

## Stack

- Next.js 16 (Turbopack, React Compiler, `"use cache"`)
- React 19, TypeScript, Tailwind CSS 4
- pnpm for package management

## Project Structure

```
/blog/*.mdx      # Blog posts with YAML frontmatter
/src/app         # Next.js App Router pages
/src/components  # React components
/src/lib         # Utilities and helpers
```

## Blog System

Posts live in `/blog/*.mdx` with frontmatter:

```yaml
---
title: Post Title
date: 2025-01-01
tags: [tag1, tag2]
excerpt: Optional description
---
```

Core functions in `src/lib/blog.ts`:
- `getPostSlugs()` - list all post slugs
- `getPostBySlug(slug)` - get single post with metadata
- `getAllPosts()` - all posts sorted by date (newest first)

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm lint         # Run oxlint
pnpm format       # Format with prettier
pnpm test         # Run tests
```

## Testing

- Node test runner with `tsx`
- Colocate tests as `{file}.test.ts`
- Use `node:assert` for assertions

## Code Style

- Minimal comments, self-documenting code
- Use `@/*` path alias for src imports
- Use `cn()` from `@/lib/cn` for className merging

## Commits

Simple, descriptive, active voice: "add feature", "fix bug in component"

## CI

GitHub Actions runs on PRs: lint → format check → test → build
