'use client';
import { useEffect, useState } from 'react';
import { useLang } from '@/context/LangContext';
import styles from './BlogSection.module.css';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image?: string;
}

export default function BlogSection() {
  const { t, lang } = useLang();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/posts')
      .then(r => r.json())
      .then(data => setPosts(data))
      .catch(() => setPosts([]));
  }, []);

  return (
    <section id="blog" className={styles.blog}>
      <div className={styles.topDivider}></div>
      <div className="container">
        <div className={styles.header}>
          <p className="section-subtitle">{t('blog.badge')}</p>
          <h2 className="section-title">{t('blog.title')}</h2>
          <div className="divider" style={{ margin: '1.5rem auto' }}></div>
        </div>

        {posts.length === 0 ? (
          <p className={styles.empty}>{t('blog.empty')}</p>
        ) : (
          <div className={styles.grid}>
            {posts.map((post, i) => (
              <article key={post.id} className={`${styles.card} ${i === 0 ? styles.featured : ''}`}>
                <div className={styles.cardImage}>
                  <img
                    src={post.image || `https://images.unsplash.com/photo-1589216532372-1c2a367900d9?w=600&q=60`}
                    alt={post.title}
                    className={styles.img}
                  />
                  <div className={styles.imgOverlay}></div>
                  <span className={styles.category}>{post.category}</span>
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.date}>{new Date(post.date).toLocaleDateString(lang === 'ar' ? 'ar-MA' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  <h3 className={styles.title}>{post.title}</h3>
                  <p className={styles.excerpt}>{post.excerpt}</p>
                  <a href={`/blog/${post.id}`} className={styles.readMore}>{t('blog.readmore')}</a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
