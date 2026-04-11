'use client';
import { useLang } from '@/context/LangContext';
import styles from './About.module.css';

export default function About() {
  const { t } = useLang();

  return (
    <section id="about" className={styles.about}>
      <div className={`container ${styles.inner}`}>
        {/* Left – Image */}
        <div className={styles.imageWrap}>
          <div className={styles.imageFrame}>
            <img
              src="https://res.cloudinary.com/di00pq8bf/image/upload/v1775886153/a9b7ba7f-879d-4418-8993-6a698205137b_qwugzi.jpg"
              alt="Ratby"
              className={styles.img}
            />
          </div>
          <div className={styles.imageBadge}>
            <span className={styles.badgeIcon}>⚖</span>
          </div>
          {/* Decorative */}
          <div className={styles.decorBox}></div>
        </div>

        {/* Right – Text */}
        <div className={styles.text}>
          <p className="section-subtitle">{t('about.badge')}</p>
          <h2 className={`section-title ${styles.name}`}>{t('about.title')}</h2>
          <div className="divider"></div>

          <p className={styles.desc}>{t('about.desc1')}</p>
          <p className={styles.desc}>{t('about.desc2')}</p>

          <div className={styles.pills}>
            <div className={styles.pill}>
              <span className={styles.pillIcon}>🎓</span>
              <span>{t('about.exp')}</span>
            </div>
            <div className={styles.pill}>
              <span className={styles.pillIcon}>🌐</span>
              <span>{t('about.lang')}</span>
            </div>
            <div className={styles.pill}>
              <span className={styles.pillIcon}>⚖</span>
              <span>{t('about.bar')}</span>
            </div>
          </div>

          <a href="#contact" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-flex' }}>
            {t('nav.consult')}
          </a>
        </div>
      </div>
    </section>
  );
}
