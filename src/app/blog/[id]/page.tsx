import { notFound } from 'next/navigation';
import { getPostById } from '@/lib/posts';
import styles from './post.module.css';

export default function PostPage({ params }: { params: { id: string } }) {
  const post = getPostById(params.id);
  if (!post || !post.published) notFound();

  return (
    <div className={styles.page}>
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
            {new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.content}>
          <a href="/#blog" className={styles.back}>← Retour au Blog</a>
          <div className={styles.body}>
            {post.content.split('\n').map((para, i) => (
              para.trim() ? <p key={i}>{para}</p> : <br key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
