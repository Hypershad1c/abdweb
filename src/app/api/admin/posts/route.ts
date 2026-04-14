import { NextRequest, NextResponse } from 'next/server'
import { getPosts, savePost, deletePost, Post } from '@/lib/posts'
import { isAuthenticated } from '@/lib/auth'
import { randomBytes } from 'crypto'

// GET all posts (admin sees all)
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const posts = await getPosts()
  return NextResponse.json(posts)
}

// CREATE / UPDATE post
export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()

  // 🔥 Convert block content → excerpt safely
  const excerpt =
    Array.isArray(body.content)
      ? body.content
          .filter((b: any) => b.type === 'text')
          .map((b: any) => b.value)
          .join(' ')
          .slice(0, 150) + '...'
      : ''

  const post: Post = {
    id: body.id || randomBytes(8).toString('hex'),
    title: body.title,
    content: body.content || [],
    excerpt,
    category: body.category || 'Juridique',
    image: body.image || '',
    date: body.date || new Date().toISOString(),
    published: body.published ?? true,
  }

  await savePost(post)

  return NextResponse.json({ success: true, post })
}

// DELETE post
export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await req.json()

  await deletePost(id)

  return NextResponse.json({ success: true })
}