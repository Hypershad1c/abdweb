'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  published: boolean;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [view, setView] = useState<'list' | 'edit'>('list');
  const [editPost, setEditPost] = useState<Partial<Post> & { content?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const fetchPosts = async () => {
    const res = await fetch('/api/admin/posts');
    if (res.status === 401) { router.push('/admin/login'); return; }
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleNew = () => {
    setEditPost({ title: '', content: '', excerpt: '', category: 'Juridique', published: true });
    setView('edit');
  };

  const handleEdit = async (id: string) => {
    const res = await fetch('/api/admin/posts');
    const data = await res.json();
    const post = data.find((p: Post) => p.id === id);
    setEditPost(post);
    setView('edit');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet article ?')) return;
    await fetch('/api/admin/posts', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchPosts();
  };

  const handleSave = async () => {
    if (!editPost) return;
    setLoading(true);
    const res = await fetch('/api/admin/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editPost),
    });
    if (res.ok) {
      setMsg('Article sauvegardé !');
      setTimeout(() => setMsg(''), 3000);
      setView('list');
      fetchPosts();
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.push('/admin/login');
  };

  return (
    <div className={styles.page}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span>⚖</span>
          <div>
            <p className={styles.sidebarName}>El Amrani</p>
            <p className={styles.sidebarSub}>Admin</p>
          </div>
        </div>
        <nav className={styles.sidebarNav}>
          <button className={`${styles.navItem} ${view === 'list' ? styles.navActive : ''}`} onClick={() => setView('list')}>
            <span>📋</span> Articles
          </button>
          <button className={styles.navItem} onClick={handleNew}>
            <span>✏️</span> Nouvel Article
          </button>
          <a href="/" className={styles.navItem} target="_blank">
            <span>🌐</span> Voir le Site
          </a>
        </nav>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <span>🚪</span> Déconnexion
        </button>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        {view === 'list' ? (
          <>
            <div className={styles.header}>
              <div>
                <h1 className={styles.pageTitle}>Articles du Blog</h1>
                <p className={styles.pageSubtitle}>{posts.length} article{posts.length !== 1 ? 's' : ''}</p>
              </div>
              <button className={styles.newBtn} onClick={handleNew}>+ Nouvel Article</button>
            </div>

            {msg && <div className={styles.successMsg}>✓ {msg}</div>}

            {posts.length === 0 ? (
              <div className={styles.empty}>
                <p>Aucun article. Créez votre premier article.</p>
                <button className={styles.newBtn} onClick={handleNew}>Créer un Article</button>
              </div>
            ) : (
              <div className={styles.table}>
                <div className={styles.tableHeader}>
                  <span>Titre</span>
                  <span>Catégorie</span>
                  <span>Date</span>
                  <span>Statut</span>
                  <span>Actions</span>
                </div>
                {posts.map(p => (
                  <div key={p.id} className={styles.tableRow}>
                    <span className={styles.postTitle}>{p.title}</span>
                    <span className={styles.category}>{p.category}</span>
                    <span className={styles.date}>{new Date(p.date).toLocaleDateString('fr-FR')}</span>
                    <span className={p.published ? styles.published : styles.draft}>
                      {p.published ? 'Publié' : 'Brouillon'}
                    </span>
                    <div className={styles.actions}>
                      <button className={styles.editBtn} onClick={() => handleEdit(p.id)}>Modifier</button>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(p.id)}>Supprimer</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className={styles.editor}>
            <div className={styles.editorHeader}>
              <button className={styles.backBtn} onClick={() => setView('list')}>← Retour</button>
              <h2 className={styles.editorTitle}>{editPost?.id ? 'Modifier l\'Article' : 'Nouvel Article'}</h2>
            </div>

            <div className={styles.editorForm}>
              <div className={styles.editorRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Titre *</label>
                  <input className={styles.input} value={editPost?.title || ''} onChange={e => setEditPost({ ...editPost, title: e.target.value })} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Catégorie</label>
                  <select className={styles.input} value={editPost?.category || 'Juridique'} onChange={e => setEditPost({ ...editPost, category: e.target.value })}>
                    {['Juridique', 'Droit des Affaires', 'Droit de la Famille', 'Droit Immobilier', 'Droit Pénal', 'Droit du Travail', 'Actualités'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Image (URL)</label>
                <input className={styles.input} placeholder="https://..." value={(editPost as any)?.image || ''} onChange={e => setEditPost({ ...editPost, image: e.target.value } as any)} />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Extrait (résumé court)</label>
                <textarea className={`${styles.input} ${styles.textarea}`} rows={3} value={editPost?.excerpt || ''} onChange={e => setEditPost({ ...editPost, excerpt: e.target.value })} />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Contenu complet *</label>
                <textarea className={`${styles.input} ${styles.contentArea}`} rows={14} value={(editPost as any)?.content || ''} onChange={e => setEditPost({ ...editPost, content: e.target.value } as any)} />
              </div>

              <div className={styles.editorFooter}>
                <label className={styles.toggleLabel}>
                  <input type="checkbox" checked={editPost?.published ?? true} onChange={e => setEditPost({ ...editPost, published: e.target.checked })} />
                  Publier immédiatement
                </label>
                <div className={styles.editorActions}>
                  <button className={styles.cancelBtn} onClick={() => setView('list')}>Annuler</button>
                  <button className={styles.saveBtn} onClick={handleSave} disabled={loading}>
                    {loading ? 'Sauvegarde...' : '✓ Sauvegarder'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
