'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';

type Block =
  | { type: 'text'; value: string }
  | { type: 'image'; url: string }
  | { type: 'video'; url: string };

interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  published: boolean;
  image?: string;
  content: Block[];
}

export default function AdminDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [view, setView] = useState<'list' | 'edit'>('list');
  const [editPost, setEditPost] = useState<Partial<Post> | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const fetchPosts = async () => {
    const res = await fetch('/api/admin/posts');
    if (res.status === 401) {
      router.push('/admin/login');
      return;
    }
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleNew = () => {
    setEditPost({
      title: '',
      excerpt: '',
      category: 'Juridique',
      published: true,
      image: '',
      content: [{ type: 'text', value: '' }],
    });
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
    await fetch('/api/admin/posts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
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
            <p className={styles.sidebarName}>Ratby</p>
            <p className={styles.sidebarSub}>Admin</p>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          <button
            className={`${styles.navItem} ${view === 'list' ? styles.navActive : ''}`}
            onClick={() => setView('list')}
          >
            📋 Articles
          </button>

          <button className={styles.navItem} onClick={handleNew}>
            ✏️ Nouvel Article
          </button>

          <a href="/" className={styles.navItem} target="_blank">
            🌐 Voir le Site
          </a>
        </nav>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          🚪 Déconnexion
        </button>
      </aside>

      {/* MAIN */}
      <main className={styles.main}>
        {view === 'list' ? (
          <>
            <div className={styles.header}>
              <div>
                <h1 className={styles.pageTitle}>Articles du Blog</h1>
                <p className={styles.pageSubtitle}>GESTION DES CONTENUS</p>
              </div>
              <button className={styles.newBtn} onClick={handleNew}>
                + Nouvel Article
              </button>
            </div>

            {msg && <div className={styles.successMsg}>✓ {msg}</div>}

            {posts.length === 0 ? (
              <div className={styles.empty}>
                <span>Aucun article pour le moment</span>
                <button className={styles.newBtn} onClick={handleNew}>
                  + Créer le premier article
                </button>
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

                {posts.map((p) => (
                  <div key={p.id} className={styles.tableRow}>
                    <span className={styles.postTitle}>{p.title}</span>
                    <span className={styles.category}>{p.category}</span>
                    <span className={styles.date}>
                      {new Date(p.date).toLocaleDateString('fr-FR')}
                    </span>
                    <span>
                      {p.published ? (
                        <span className={styles.published}>Publié</span>
                      ) : (
                        <span className={styles.draft}>Brouillon</span>
                      )}
                    </span>
                    <div className={styles.actions}>
                      <button
                        className={styles.editBtn}
                        onClick={() => handleEdit(p.id)}
                      >
                        Modifier
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(p.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          /* EDITOR */
          <div className={styles.editor}>
            <div className={styles.editorHeader}>
              <button className={styles.backBtn} onClick={() => setView('list')}>
                ← Retour
              </button>
              <h2 className={styles.editorTitle}>
                {editPost?.id ? "Modifier l'article" : 'Nouvel article'}
              </h2>
            </div>

            <div className={styles.editorForm}>
              {/* Row 1: Title + Category */}
              <div className={styles.editorRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Titre</label>
                  <input
                    className={styles.input}
                    placeholder="Titre de l'article"
                    value={editPost?.title || ''}
                    onChange={(e) =>
                      setEditPost({ ...editPost, title: e.target.value })
                    }
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Catégorie</label>
                  <select
                    className={styles.input}
                    value={editPost?.category || 'Juridique'}
                    onChange={(e) =>
                      setEditPost({ ...editPost, category: e.target.value })
                    }
                  >
                    <option>Juridique</option>
                    <option>Droit des Affaires</option>
                    <option>Droit de la Famille</option>
                    <option>Droit Immobilier</option>
                    <option>Droit Pénal</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Excerpt + Image URL */}
              <div className={styles.editorRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Extrait</label>
                  <textarea
                    className={`${styles.input} ${styles.textarea}`}
                    rows={3}
                    placeholder="Résumé court de l'article…"
                    value={editPost?.excerpt || ''}
                    onChange={(e) =>
                      setEditPost({ ...editPost, excerpt: e.target.value })
                    }
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Image principale (URL)</label>
                  <input
                    className={styles.input}
                    placeholder="https://…"
                    value={editPost?.image || ''}
                    onChange={(e) =>
                      setEditPost({ ...editPost, image: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Content blocks */}
              <div className={styles.field}>
                <label className={styles.label}>Contenu</label>

                {(editPost?.content || []).map((block: any, i: number) => (
                  <div key={i} style={{ marginBottom: '0.75rem' }}>
                    {block.type === 'text' && (
                      <textarea
                        className={`${styles.input} ${styles.textarea} ${styles.contentArea}`}
                        rows={6}
                        placeholder="Texte du bloc…"
                        value={block.value}
                        onChange={(e) => {
                          const updated = [...(editPost?.content || [])];
                          updated[i] = { type: 'text', value: e.target.value };
                          setEditPost({ ...editPost, content: updated });
                        }}
                      />
                    )}
                    {block.type === 'image' && (
                      <input
                        className={styles.input}
                        placeholder="URL de l'image"
                        value={block.url}
                        onChange={(e) => {
                          const updated = [...(editPost?.content || [])];
                          updated[i] = { type: 'image', url: e.target.value };
                          setEditPost({ ...editPost, content: updated });
                        }}
                      />
                    )}
                    {block.type === 'video' && (
                      <input
                        className={styles.input}
                        placeholder="URL de la vidéo"
                        value={block.url}
                        onChange={(e) => {
                          const updated = [...(editPost?.content || [])];
                          updated[i] = { type: 'video', url: e.target.value };
                          setEditPost({ ...editPost, content: updated });
                        }}
                      />
                    )}
                  </div>
                ))}

                {/* Add block buttons */}
                <div className={styles.actions} style={{ marginTop: '0.5rem' }}>
                  <button
                    className={styles.editBtn}
                    onClick={() =>
                      setEditPost({
                        ...editPost,
                        content: [
                          ...(editPost?.content || []),
                          { type: 'text', value: '' },
                        ],
                      })
                    }
                  >
                    + Texte
                  </button>
                  <button
                    className={styles.editBtn}
                    onClick={() =>
                      setEditPost({
                        ...editPost,
                        content: [
                          ...(editPost?.content || []),
                          { type: 'image', url: '' },
                        ],
                      })
                    }
                  >
                    + Image
                  </button>
                  <button
                    className={styles.editBtn}
                    onClick={() =>
                      setEditPost({
                        ...editPost,
                        content: [
                          ...(editPost?.content || []),
                          { type: 'video', url: '' },
                        ],
                      })
                    }
                  >
                    + Vidéo
                  </button>
                </div>
              </div>

              {/* Footer: publish toggle + actions */}
              <div className={styles.editorFooter}>
                <label className={styles.toggleLabel}>
                  <input
                    type="checkbox"
                    checked={editPost?.published ?? true}
                    onChange={(e) =>
                      setEditPost({ ...editPost, published: e.target.checked })
                    }
                  />
                  Publier l'article
                </label>

                <div className={styles.editorActions}>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => setView('list')}
                  >
                    Annuler
                  </button>
                  <button
                    className={styles.saveBtn}
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? 'Sauvegarde…' : 'Sauvegarder'}
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