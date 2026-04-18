'use client';
import { useLang } from '@/context/LangContext';
import styles from './Hero.module.css';

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="hero" className={styles.hero}>
      {/* Background layers */}
      <div className={styles.bgImage}></div>
      <div className={styles.bgOverlay}></div>
      <div className={styles.bgPattern}></div>

      {/* Decorative vertical lines */}
      <div className={styles.vline1}></div>
      <div className={styles.vline2}></div>

      <div className={`container ${styles.content}`}>
        <div className={styles.left}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            {t('hero.badge')}
          </div>

          <h1 className={styles.title}>
            <span className={styles.titleLine1}>{t('hero.title1')}</span>
            <span className={styles.titleLine2}>{t('hero.title2')}</span>
            <span className={styles.titleLine3}>{t('hero.title3')}</span>
          </h1>

          <div className={styles.divider}></div>

          <p className={styles.desc}>{t('hero.desc')}</p>

          <div className={styles.ctas}>
            <a href="#contact" className="btn-primary">{t('hero.cta1')}</a>
            <a href="#services" className="btn-outline">{t('hero.cta2')}</a>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            {[
              { num: '12+', label: t('hero.stat1') },
              { num: '200+', label: t('hero.stat2') },
              { num: '98%', label: t('hero.stat3') },
            ].map((s, i) => (
              <div key={i} className={styles.stat}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side image card */}
        <div className={styles.right}>
          <div className={styles.imageCard}>
            <div className={styles.imageInner}>
              {/* Using a professional placeholder */}
              <img
                src="https://images.unsplash.com/photo-1589216532372-1c2a367900d9?w=600&q=80"
                alt="Cabinet Juridique"
                className={styles.heroImg}
              />
            </div>
            <div className={styles.imageCaption}>
              <span className={styles.scaleIcon}>⚖</span>
              <span>Cabinet Ratby — Casablanca</span>
            </div>
            <div className={styles.cardCorner}></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  );
}
