import { NextResponse } from 'next/server'
import { getPublishedPosts, savePost } from '@/lib/posts'

export async function GET() {
  const posts = await getPublishedPosts()
  return NextResponse.json(posts)
}

export async function POST(req: Request) {
  const body = await req.json()

  await savePost({
    ...body,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    published: true
  })

  return NextResponse.json({ success: true })
}