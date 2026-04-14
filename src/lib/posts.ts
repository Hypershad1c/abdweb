import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

const POSTS_KEY = 'lawyer:posts'

//
// 🔥 BLOCK TYPES (NEW CMS SYSTEM)
//
export type PostContentBlock =
  | { type: 'text'; value: string }
  | { type: 'image'; url: string }
  | { type: 'video'; url: string }

//
// 🔥 POST MODEL
//
export interface Post {
  id: string
  title: string
  content: PostContentBlock[]   // ✅ CHANGED HERE
  excerpt: string
  category: string
  image?: string
  date: string
  published: boolean
}

//
// 🔥 SAFE GET
//
export async function getPosts(): Promise<Post[]> {
  const data = await redis.get<Post[] | string | null>(POSTS_KEY)

  if (!data) return []

  if (typeof data === 'string') {
    try {
      const parsed = JSON.parse(data)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  return Array.isArray(data) ? data : []
}

//
// 🔥 SAVE POST
//
export async function savePost(post: Post): Promise<void> {
  const posts = await getPosts()

  const updated = posts.some(p => p.id === post.id)
    ? posts.map(p => (p.id === post.id ? post : p))
    : [post, ...posts]

  await redis.set(POSTS_KEY, updated)
}

//
// 🔥 GET PUBLISHED
//
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getPosts()
  return posts.filter(p => p.published)
}

//
// 🔥 GET SINGLE POST
//
export async function getPostById(id: string): Promise<Post | null> {
  const posts = await getPosts()
  return posts.find(p => p.id === id) ?? null
}

//
// 🔥 DELETE POST
//
export async function deletePost(id: string): Promise<void> {
  const posts = await getPosts()
  const updated = posts.filter(p => p.id !== id)
  await redis.set(POSTS_KEY, updated)
}