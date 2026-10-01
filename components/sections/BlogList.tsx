"use client";

import { BlogCard } from "@/components/sections/BlogCard";
import type { BLOG_POSTS } from "@/lib/content";

type Post = (typeof BLOG_POSTS)[number];

/** Full list of real posts, each opening its own page on /blog/[slug]/. */
export function BlogList({ posts }: { posts: Post[] }) {
  return (
    <section className="section">
      <div className="blog-list-grid">
        {posts.map((post) => (
          <BlogCard post={post} key={post.href} />
        ))}
      </div>
    </section>
  );
}
