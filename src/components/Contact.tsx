'use client';

import { useState } from 'react';
import { useLang } from '@/context/LangContext';
import styles from './Contact.module.css';
import Turnstile from 'react-turnstile';

export default function Contact() {
  const { t } = useLang();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      alert('Please complete verification');
      return;
    }

    setLoading(true);

    const payload = {
      ...form,
      website: (e.currentTarget.elements.namedItem('website') as HTMLInputElement)?.value,
      token,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSent(true);

        setForm({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });

        setToken(null);

        setTimeout(() => setSent(false), 4000);
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const mapsUrl =
    'https://www.google.com/maps?q=33.5465462,-7.6807892&hl=fr&z=17&output=embed';

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.topDivider}></div>

      <div className="container">
        <div className={styles.header}>
          <p className="section-subtitle">{t('contact.badge')}</p>
          <h2 className="section-title">{t('contact.title')}</h2>
          <div className="divider" style={{ margin: '1.5rem auto' }} />
        </div>

        <div className={styles.grid}>
          {/* FORM */}
          <div className={styles.formWrap}>
            <form onSubmit={handleSubmit} className={styles.form}>

              <input
                type="text"
                name="website"
                autoComplete="off"
                tabIndex={-1}
                style={{ display: 'none' }}
              />

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>{t('contact.name')}</label>
                  <input
                    className={styles.input}
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>{t('contact.email')}</label>
                  <input
                    className={styles.input}
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>{t('contact.phone')}</label>
                  <input
                    className={styles.input}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>{t('contact.subject')}</label>
                  <input
                    className={styles.input}
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
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
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              {/* TURNSTILE */}
              {siteKey ? (
                <Turnstile
                  sitekey={siteKey}
                  onVerify={(token) => setToken(token)}
                />
              ) : (
                <p style={{ color: 'red' }}>
                  Turnstile site key missing
                </p>
              )}

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={loading || !token}
              >
                {loading ? '...' : t('contact.send')}
              </button>

              {sent && (
                <p className={styles.success}>✓ {t('contact.success')}</p>
              )}
            </form>
          </div>

          {/* INFO */}
          <div className={styles.infoWrap}>
            <div className={styles.mapWrap}>
              <iframe
                src={mapsUrl}
                width="100%"
                height="250"
                style={{ border: 0 }}
                loading="lazy"
                title="Map"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}