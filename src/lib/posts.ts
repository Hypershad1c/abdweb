import fs from 'fs';
import path from 'path';

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

const DATA_FILE = path.join(process.cwd(), 'data', 'posts.json');

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  }
}

export function getPosts(): Post[] {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

export function getPublishedPosts(): Post[] {
  return getPosts().filter(p => p.published);
}

export function getPostById(id: string): Post | undefined {
  return getPosts().find(p => p.id === id);
}

export function savePost(post: Post): void {
  ensureDataFile();
  const posts = getPosts();
  const idx = posts.findIndex(p => p.id === post.id);
  if (idx >= 0) posts[idx] = post;
  else posts.unshift(post);
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
}

export function deletePost(id: string): void {
  ensureDataFile();
  const posts = getPosts().filter(p => p.id !== id);
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
}
