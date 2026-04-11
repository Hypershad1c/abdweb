'use client';
import { useState } from 'react';
import { useLang } from '@/context/LangContext';
import styles from './Contact.module.css';

export default function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

const mapsUrl =
  "https://www.google.com/maps?q=33.5465462,-7.6807892&hl=fr&z=17&output=embed";

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.topDivider}></div>
      <div className="container">
        <div className={styles.header}>
          <p className="section-subtitle">{t('contact.badge')}</p>
          <h2 className="section-title">{t('contact.title')}</h2>
          <div className="divider" style={{ margin: '1.5rem auto' }}></div>
        </div>

        <div className={styles.grid}>
          {/* Form */}
          <div className={styles.formWrap}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>{t('contact.name')}</label>
                  <input
                    className={styles.input}
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>{t('contact.email')}</label>
                  <input
                    className={styles.input}
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>{t('contact.phone')}</label>
                  <input
                    className={styles.input}
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>{t('contact.subject')}</label>
                  <input
                    className={styles.input}
                    type="text"
                    required
                    value={form.subject}
                    onChange={e => setForm({...form, subject: e.target.value})}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>{t('contact.message')}</label>
                <textarea
                  className={`${styles.input} ${styles.textarea}`}
                  rows={5}
                  required
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                />
              </div>
              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? '...' : t('contact.send')}
              </button>
              {sent && <p className={styles.success}>✓ {t('contact.success')}</p>}
            </form>
          </div>

          {/* Info + Map */}
          <div className={styles.infoWrap}>
            <div className={styles.infoBlock}>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>📍</span>
                <div>
                  <p className={styles.infoLabel}>{t('contact.address')}</p>
                  <p className={styles.infoValue}>{t('contact.addr.val')}</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>📞</span>
                <div>
                  <p className={styles.infoLabel}>Téléphone</p>
                  <p className={styles.infoValue} dir ="ltr">+212 7 07 73 73 47</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>✉️</span>
                <div>
                  <p className={styles.infoLabel}>Email</p>
                  <p className={styles.infoValue}>contact@cabinet-ratby.ma</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>🕐</span>
                <div>
                  <p className={styles.infoLabel}>{t('contact.hours')}</p>
                  <p className={styles.infoValue} style={{ whiteSpace: 'pre-line' }}>{t('contact.hours.val')}</p>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className={styles.mapWrap}>
              <iframe
                src={mapsUrl}
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cabinet Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
