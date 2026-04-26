'use client';
import { useState, useEffect } from 'react';
import { useLang } from '@/context/LangContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { t, toggleLang, lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { key: 'nav.home',     href: '#hero' },
    { key: 'nav.about',    href: '#about' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.blog',     href: '#blog' },
    { key: 'nav.contact',  href: '#contact' },
  ];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {/* Logo */}
        <a href="#hero" className={styles.logo}>
          <span className={styles.logoIcon}>⚖</span>
          <div className={styles.logoText}>
            <span className={styles.logoName}>Abdessamad Ratby</span>
            <span className={styles.logoSub}>Cabinet D'avocats</span>
          </div>
        </a>

        {/* Desktop Links */}
        <ul className={styles.links}>
          {links.map(l => (
            <li key={l.key}>
              <a href={l.href} className={styles.link} onClick={() => setMenuOpen(false)}>
                {t(l.key)}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.langBtn} onClick={toggleLang} title="Switch language">
            {t('lang.switch')}
          </button>
          <a href="#contact" className={styles.ctaBtn}>{t('nav.consult')}</a>
          <button className={styles.burger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span className={`${styles.bar} ${menuOpen ? styles.open1 : ''}`}></span>
            <span className={`${styles.bar} ${menuOpen ? styles.open2 : ''}`}></span>
            <span className={`${styles.bar} ${menuOpen ? styles.open3 : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
        {links.map(l => (
          <a key={l.key} href={l.href} className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
            {t(l.key)}
          </a>
        ))}
        <button className={styles.mobileLang} onClick={toggleLang}>{t('lang.switch')}</button>
        <a href="#contact" className={styles.mobileCta} onClick={() => setMenuOpen(false)}>{t('nav.consult')}</a>
      </div>
    </nav>
  );
}
