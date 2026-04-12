'use client';
import { useLang } from '@/context/LangContext';
import styles from './About.module.css';

export default function About() {
  const { t } = useLang();

  return (
    <section id="about" className={styles.about}>
      <div className={`container ${styles.inner}`}>

        {/* Image */}
        <div className={styles.imageWrap}>
          <div className={styles.glow}></div>

          <div className={styles.imageFrame}>
            <img
              src="https://res.cloudinary.com/di00pq8bf/image/upload/v1775886153/a9b7ba7f-879d-4418-8993-6a698205137b_qwugzi.jpg"
              alt="Ratby"
              className={styles.img}
            />
          </div>

          <div className={styles.imageBadge}>
            <span>⚖</span>
          </div>
        </div>

        {/* Text */}
        <div className={styles.text}>
          <p className="section-subtitle">{t('about.badge')}</p>

          <h2 className={styles.title}>
            {t('about.title')}
          </h2>

          <div className={styles.line}></div>

          <p className={styles.desc}>{t('about.desc1')}</p>
          <p className={styles.desc}>{t('about.desc2')}</p>

          <div className={styles.tags}>
            <div className={styles.tag}>🎓 {t('about.exp')}</div>
            <div className={styles.tag}>🌐 {t('about.lang')}</div>
            <div className={styles.tag}>⚖ {t('about.bar')}</div>
          </div>

          <a href="#contact" className={styles.button}>
            {t('nav.consult')}
          </a>
        </div>

      </div>
    </section>
  );
}