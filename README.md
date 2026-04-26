# Cabinet Ratby — Site Web Officiel

Site web professionnel pour cabinet d'avocat — Next.js 14, TypeScript, dark blue & gold theme.

## ✨ Fonctionnalités

- 🌗 Thème sombre luxueux (bleu marine & or)
- 📱 100% responsive (mobile, tablette, desktop)
- 🌐 Traduction instantanée Français ↔ Arabe (RTL)
- 📝 Blog avec page admin sécurisée (JWT)
- 🗺️ Google Maps intégré
- 💬 Bouton WhatsApp flottant
- 🔒 Panel admin protégé par mot de passe
- ⚡ Optimisé pour Vercel

---

## 🚀 Installation locale

### 1. Prérequis
- Node.js 18+ installé
- npm ou yarn

### 2. Cloner / extraire le projet
```bash
cd lawyer-website
```

### 3. Installer les dépendances
```bash
npm install
```

### 4. Configurer les variables d'environnement
```bash
cp .env.example .env.local
```
Puis éditer `.env.local` :
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=VotreMotDePasseSecurise
JWT_SECRET=une-chaine-aleatoire-longue-et-secrete
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=votre_cle_google_maps
NEXT_PUBLIC_WHATSAPP_NUMBER=212600000000
NEXTAUTH_SECRET=autre-chaine-secrete
NEXTAUTH_URL=http://localhost:3000
```

### 5. Lancer en développement
```bash
npm run dev
```
Ouvrir [http://localhost:3000](http://localhost:3000)



Depuis le dashboard admin vous pouvez :
- Créer, modifier, supprimer des articles de blog
- Publier ou mettre en brouillon
- Ajouter image, catégorie, extrait

---

## 🗺️ Google Maps

1. Aller sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créer un projet
3. Activer l'API **Maps Embed API**
4. Créer une clé API
5. La coller dans `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

> Sans clé API, une carte embed OpenStreetMap générique s'affiche quand même.

---

## 💬 WhatsApp

Dans `.env.local`, mettre le numéro au format international sans `+` :
```
NEXT_PUBLIC_WHATSAPP_NUMBER=212600000000
```
(Maroc: 212 + numéro sans le 0 initial)

---

## 🎨 Personnalisation

### Nom & informations du cabinet
Éditer `src/context/LangContext.tsx` — modifier les traductions :
- `about.title` → nom du cabinet
- `contact.addr.val` → adresse
- `contact.hours.val` → horaires
- `hero.badge` → titre professionnel

### Couleurs
Éditer `src/styles/globals.css` :
```css
:root {
  --navy: #0a1628;      /* fond principal */
  --gold: #c9a84c;      /* accent doré    */
}
```

### Images
Les images proviennent d'Unsplash (libres de droits).
Pour les remplacer, éditer les URLs `src=` dans :
- `src/components/Hero.tsx`
- `src/components/About.tsx`

---

## 🌐 Déploiement sur Vercel

### Option A — Via CLI (recommandé)

```powershell
# 1. Installer Vercel CLI
npm install -g vercel

# 2. Se connecter
vercel login

# 3. Déployer
vercel

# Répondre aux questions :
# - Set up and deploy? Y
# - Which scope? (votre compte)
# - Link to existing project? N
# - Project name: lawyer-website
# - Directory: ./
# - Override settings? N
```

### Option B — Via GitHub + Vercel Dashboard

1. Créer un repo GitHub et pousser le code :
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/VOTRE_USER/lawyer-website.git
git push -u origin main
```

2. Aller sur [vercel.com](https://vercel.com) → New Project
3. Importer le repo GitHub
4. Ajouter les variables d'environnement dans Vercel Dashboard :
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
5. Cliquer **Deploy**

### ⚠️ Note sur le stockage des articles (Vercel)

Vercel est **serverless** — le système de fichiers est en lecture seule en production.
Pour persister les articles de blog, deux options :

**Option 1 (Gratuite) — Vercel KV (Redis)**
```bash
npm install @vercel/kv
```
Puis remplacer `src/lib/posts.ts` par la version KV (voir section ci-dessous).

**Option 2 (Simple) — PlanetScale / Supabase**
Utiliser une base de données gratuite externe.

**Option 3 (Développement local seulement)**
Le fichier `data/posts.json` fonctionne parfaitement en local.

---

## 📁 Structure du projet

```
lawyer-website/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Page d'accueil
│   │   ├── layout.tsx            # Layout racine
│   │   ├── admin/
│   │   │   ├── page.tsx          # Redirection admin
│   │   │   ├── layout.tsx        # Layout admin (sans navbar)
│   │   │   ├── login/page.tsx    # Page de connexion
│   │   │   └── dashboard/page.tsx # Dashboard admin
│   │   ├── blog/[id]/page.tsx    # Article de blog
│   │   └── api/
│   │       ├── posts/route.ts    # API publique des posts
│   │       └── admin/
│   │           ├── posts/route.ts # API admin posts
│   │           └── login/route.ts # API authentification
│   ├── components/
│   │   ├── Navbar.tsx / .module.css
│   │   ├── Hero.tsx / .module.css
│   │   ├── About.tsx / .module.css
│   │   ├── Services.tsx / .module.css
│   │   ├── BlogSection.tsx / .module.css
│   │   ├── Contact.tsx / .module.css
│   │   ├── Footer.tsx / .module.css
│   │   ├── WhatsAppButton.tsx / .module.css
│   │   └── LayoutShell.tsx
│   ├── context/
│   │   └── LangContext.tsx       # Traductions FR/AR
│   ├── lib/
│   │   ├── posts.ts              # Gestion des articles
│   │   └── auth.ts               # Authentification JWT
│   ├── middleware.ts             # Protection routes admin
│   └── styles/
│       └── globals.css           # Styles globaux + variables
├── data/
│   └── posts.json               # Stockage articles (local)
├── .env.example                 # Template variables d'env
├── .gitignore
├── next.config.js
├── package.json
├── tsconfig.json
├── vercel.json
└── README.md
```

---

## 🛠️ Scripts disponibles

```bash
npm run dev      # Démarrer en développement (port 3000)
npm run build    # Build de production
npm run start    # Démarrer en production
npm run lint     # Vérifier le code
```

---

## 📞 Support

Pour toute question technique, consulter la documentation Next.js : https://nextjs.org/docs
