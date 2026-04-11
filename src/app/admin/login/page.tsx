'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      setError('Identifiants incorrects. Veuillez réessayer.');
    }
    setLoading(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.bgPattern}></div>

      <div className={styles.card}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>⚖</span>
          <div>
            <p className={styles.logoName}>El Amrani</p>
            <p className={styles.logoSub}>Administration</p>
          </div>
        </div>

        <div className={styles.divider}></div>

        <h1 className={styles.title}>Connexion</h1>
        <p className={styles.subtitle}>Accès réservé à l&apos;administrateur</p>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Nom d&apos;utilisateur</label>
            <input
              type="text"
              className={styles.input}
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Mot de passe</label>
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {error && <p className={styles.error}>⚠ {error}</p>}
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter →'}
          </button>
        </form>

        <a href="/" className={styles.back}>← Retour au site</a>
      </div>
    </div>
  );
}
