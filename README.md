# 🎵 CrossBeats

Crée, partage et écoute des playlists musicales **cross-platform** de façon collaborative et en temps réel.

---

## 🚦 Limites actuelles des APIs musicales (2024)
- **SoundCloud** : L’accès à l’API publique est restreint, il faut contacter le support pour obtenir un Client ID.
- **Deezer** : La création de nouvelles applications développeur est suspendue, impossible d’obtenir un nouvel App ID.
- **Spotify & YouTube** : APIs toujours accessibles pour la recherche et l’affichage (avec limitations sur la lecture intégrée).

> **CrossBeats** reste un socle technique moderne, prêt à évoluer dès que les politiques d’API changent ou pour des usages “playlist universelle” (partage de liens, synchronisation sociale, etc.).

---

## 🚀 Fonctionnalités principales
- Authentification Google (Firebase Auth)
- Création de playlists multi-plateformes (Spotify, YouTube, SoundCloud, Deezer via liens)
- Ajout de morceaux via recherche inter-API (mock ou liens)
- Sauvegarde et édition des playlists (Firestore)
- Lecture synchronisée en temps réel (Firebase Realtime Database)
- Dashboard moderne : navigation, mes playlists, playlists récentes
- Responsive design (mobile/tablette/desktop)

---

## 🧱 Stack technique
- **Frontend** : React + Vite + Tailwind CSS + React Router DOM
- **Backend** : Firebase (Auth, Firestore, Realtime Database)
- **APIs musicales** : Spotify, YouTube (SoundCloud/Deezer en attente)

---

## ⚡️ Démarrage rapide

1. **Clone le repo**
   ```sh
   git clone https://github.com/carmelo0511/CrossBeats.git
   cd CrossBeats
   ```
2. **Installe les dépendances**
   ```sh
   npm install
   ```
3. **Configure Firebase**
   - Crée un projet sur [Firebase Console](https://console.firebase.google.com/)
   - Active Auth (Google), Firestore, Realtime Database
   - Récupère la config et crée un fichier `.env` à la racine :
     ```env
     VITE_FIREBASE_API_KEY=...
     VITE_FIREBASE_AUTH_DOMAIN=...
     VITE_FIREBASE_PROJECT_ID=...
     VITE_FIREBASE_STORAGE_BUCKET=...
     VITE_FIREBASE_MESSAGING_SENDER_ID=...
     VITE_FIREBASE_APP_ID=...
     VITE_FIREBASE_DATABASE_URL=...
     ```
4. **Lance le serveur**
   ```sh
   npm run dev
   ```
5. **Ouvre [http://localhost:5173](http://localhost:5173) dans ton navigateur**

---

## 🎬 Démo

![CrossBeats UI Screenshot](https://user-images.githubusercontent.com/placeholder/crossbeats-demo.png)

---

## 🛠️ Idées d’évolution ou de pivot
- Playlist “universelle” : chaque morceau a un bouton “Écouter sur…” pour chaque plateforme
- Ajout manuel de liens Deezer/SoundCloud + player embed
- Synchronisation “sociale” : chaque utilisateur écoute sur sa plateforme, mais la progression est partagée
- Chat enrichi, votes, suggestions, réactions
- Conversion de playlists entre plateformes
- Déploiement Vercel/Netlify

---

## 📄 Licence
MIT

---

> Made with ❤️ by [@carmelo0511](https://github.com/carmelo0511) et la communauté 