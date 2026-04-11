import { NextRequest, NextResponse } from 'next/server';
import { getPosts, savePost, deletePost, Post } from '@/lib/posts';
import { isAuthenticated } from '@/lib/auth';
import { randomBytes } from 'crypto';

// GET all posts (admin sees all including unpublished)
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json(getPosts());
}

// POST create/update post
export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  const post: Post = {
    id: body.id || randomBytes(8).toString('hex'),
    title: body.title,
    content: body.content,
    excerpt: body.excerpt || body.content.slice(0, 150) + '...',
    category: body.category || 'Juridique',
    image: body.image || '',
    date: body.date || new Date().toISOString(),
    published: body.published ?? true,
  };
  savePost(post);
  return NextResponse.json({ success: true, post });
}

// DELETE post
export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await req.json();
  deletePost(id);
  return NextResponse.json({ success: true });
}
