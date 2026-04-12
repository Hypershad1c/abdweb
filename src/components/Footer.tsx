'use client';

import { useLang } from '@/context/LangContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.topLine}></div>

      <div className="container">
        <div className={styles.grid}>

          {/* BRAND */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>⚖</span>
              <div>
                <p className={styles.logoName}>Ratby</p>
                <p className={styles.logoSub}>Cabinet Juridique</p>
              </div>
            </div>

            <p className={styles.tagline}>{t('footer.tagline')}</p>

            {/* SOCIALS */}
            <div className={styles.socials}>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '212707737347'}`}
                className={styles.social}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                className={styles.social}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 110 6 3 3 0 010-6zm-5 2a5 5 0 110 10 5 5 0 010-10zm7 11a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                className={styles.social}
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M12 2v10.2a4.2 4.2 0 11-3.5-4.1V5.5A7.5 7.5 0 1015 13V8.5c1.2 1 2.7 1.6 4.5 1.7V7.2c-2.6-.2-4.6-2.1-4.9-5.2H12z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                className={styles.social}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M22 12a10 10 0 10-11.6 9.9v-7h-2.2V12h2.2v-2c0-2.2 1.3-3.4 3.3-3.4.9 0 1.8.1 2 .1v2.3h-1.4c-1.1 0-1.4.7-1.4 1.4V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z"/>
                </svg>
              </a>

              {/* Phone */}
              <a href="tel:+212707737347" className={styles.social} aria-label="Phone">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.6a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </a>

              {/* Email */}
              <a href="mailto:contact@cabinet-ratby.ma" className={styles.social} aria-label="Email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>

            </div>
          </div>

          {/* NAVIGATION */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul className={styles.colLinks}>
              {[
                ['#hero', 'Accueil'],
                ['#about', 'À Propos'],
                ['#services', 'Services'],
                ['#blog', 'Blog'],
                ['#contact', 'Contact'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className={styles.colLink}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Services</h4>
            <ul className={styles.colLinks}>
              {[
                'Droit des Affaires',
                'Droit de la Famille',
                'Droit Immobilier',
                'Contentieux Pénal',
                'Droit du Travail',
                'Droit Administratif',
              ].map((s) => (
                <li key={s}>
                  <a href="#services" className={styles.colLink}>{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact</h4>
            <div className={styles.contactInfo}>
              <p>157 LOT CHAHDIA, RUE 86 N8<br />Casablanca 20220</p>
              <p>+212 7 07 73 73 47</p>
              <p>contact@cabinet-ratby.ma</p>
              <p>Lun–Ven: 9h–18h</p>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {year} Cabinet Ratby. {t('footer.rights')}.
          </p>

          <div className={styles.bottomLinks}>
            <a href="/privacy" className={styles.bottomLink}>
              {t('footer.privacy')}
            </a>
            <span className={styles.sep}>·</span>
            <a href="/terms" className={styles.bottomLink}>
              {t('footer.terms')}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}