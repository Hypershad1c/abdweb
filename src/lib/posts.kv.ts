/**
 * PRODUCTION VERSION — uses Vercel KV (Redis) instead of file system.
 *
 * To use this:
 * 1. Run: npm install @vercel/kv
 * 2. In Vercel Dashboard → Storage → Create KV database
 * 3. Copy KV_REST_API_URL and KV_REST_API_TOKEN to your env vars
 * 4. Replace src/lib/posts.ts with this file
 *
 * This version works both locally (with .env.local KV vars) and on Vercel.
 */

import { kv } from '@vercel/kv';

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  image?: string;
  date: string;
  published: boolean;
}

const POSTS_KEY = 'lawyer:posts';

export async function getPosts(): Promise<Post[]> {
  const posts = await kv.get<Post[]>(POSTS_KEY);
  return posts ?? [];
}

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter(p => p.published);
}

export async function getPostById(id: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find(p => p.id === id);
}

export async function savePost(post: Post): Promise<void> {
  const posts = await getPosts();
  const idx = posts.findIndex(p => p.id === post.id);
  if (idx >= 0) posts[idx] = post;
  else posts.unshift(post);
  await kv.set(POSTS_KEY, posts);
}

export async function deletePost(id: string): Promise<void> {
  const posts = (await getPosts()).filter(p => p.id !== id);
  await kv.set(POSTS_KEY, posts);
}
