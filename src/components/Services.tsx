'use client';
import { useLang } from '@/context/LangContext';
import styles from './Services.module.css';

const icons = ['🏢', '👨‍👩‍👧', '🏗️', '⚖️', '👔', '🏛️'];

export default function Services() {
  const { t } = useLang();

  const services = [
    { title: t('s1.title'), desc: t('s1.desc') },
    { title: t('s2.title'), desc: t('s2.desc') },
    { title: t('s3.title'), desc: t('s3.desc') },
    { title: t('s4.title'), desc: t('s4.desc') },
    { title: t('s5.title'), desc: t('s5.desc') },
    { title: t('s6.title'), desc: t('s6.desc') },
  ];

  return (
    <section id="services" className={styles.services}>
      <div className={styles.topDivider}></div>

      <div className="container">
        <div className={styles.header}>
          <p className="section-subtitle">{t('services.badge')}</p>
          <h2 className="section-title">{t('services.title')}</h2>
          <div className="divider" style={{ margin: '1.5rem auto' }}></div>
        </div>

        <div className={styles.grid}>
          {services.map((s, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardNum}>0{i + 1}</div>
              <div className={styles.cardIcon}>{icons[i]}</div>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <div className={styles.cardLine}></div>
              <p className={styles.cardDesc}>{s.desc}</p>
              <div className={styles.cardHover}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
