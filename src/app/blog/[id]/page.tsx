import { notFound } from 'next/navigation'
import { getPostById } from '@/lib/posts'
import styles from './post.module.css'

export const dynamic = "force-dynamic"

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const post = await getPostById(id)

  if (!post || !post.published) notFound()

  return (
    <div className={styles.page}>
      {/* HERO SECTION */}
      <div className={styles.hero}>
        {post.image && (
          <div className={styles.heroImage}>
            <img src={post.image} alt={post.title} />
            <div className={styles.heroOverlay}></div>
          </div>
        )}

        <div className={`container ${styles.heroContent}`}>
          <span className={styles.category}>{post.category}</span>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.date}>
            {new Date(post.date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="container">
        <div className={styles.content}>
          <a href="/#blog" className={styles.back}>
            ← Retour au Blog
          </a>

          <div className={styles.body}>
            {post.content.map((block, i) => {
              // TEXT BLOCK
              if (block.type === 'text') {
                return <p key={i}>{block.value}</p>
              }

              // IMAGE BLOCK
              if (block.type === 'image') {
                return (
                  <img
                    key={i}
                    src={block.url}
                    alt=""
                    style={{
                      maxWidth: '100%',
                      borderRadius: '10px',
                      margin: '10px 0',
                    }}
                  />
                )
              }

              // VIDEO BLOCK
              if (block.type === 'video') {
                return (
                  <video
                    key={i}
                    src={block.url}
                    controls
                    style={{
                      maxWidth: '100%',
                      borderRadius: '10px',
                      margin: '10px 0',
                    }}
                  />
                )
              }

              return null
            })}
          </div>
        </div>
      </div>
    </div>
  )
}