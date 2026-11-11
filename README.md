# 💬 WhatsApp Clone

> A real-time chat web app inspired by WhatsApp, built with Next.js, React and Firebase. Users sign in with Google, start one-to-one chats by email, and exchange messages instantly. The app also supports emoji, voice typing, clickable links and "last seen" status.

<!-- Add a screenshot of your running app here, e.g.:
![App screenshot](public/screenshot.png)
-->

---

## ✨ Features

- 🔐 **Google sign-in** with Firebase Authentication
- 💬 **Real-time messaging**: messages sync instantly through Cloud Firestore listeners
- ➕ **New chats by email**, with checks that block invalid emails, duplicate chats and chatting with yourself
- 🔎 **Chat search** that filters conversations in the sidebar as you type
- 🟢 **"Last active" status** that shows when the other person was last online (for example, *2 minutes ago*)
- 😀 **Emoji picker** (emoji-mart)
- 🎙️ **Voice-to-text** messages using the browser's Web Speech API
- 🔗 **Clickable links**: URLs in messages are detected and turned into links
- 🔔 **Sound effect** when a message is sent
- 🕒 **Timestamps** on every message
- ⚡ **Server-side rendering** of chat history with `getServerSideProps` for fast first loads
- 📱 **Responsive layout** for desktop and mobile

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 12](https://nextjs.org/) / React 17 |
| Backend | [Firebase](https://firebase.google.com/): Authentication (Google) and Cloud Firestore |
| Styling | styled-components, Sass, Material-UI v4 |
| Realtime hooks | react-firebase-hooks |
| Extras | emoji-mart, timeago-react, moment, uifx, email-validator, better-react-spinkit |

---

## 📁 Project Structure

```
Whatsapp-clone/
├── components/
│   ├── Sidebar.js          # User avatar, chat search, chat list, new-chat button
│   ├── Chat.js             # A single chat row in the sidebar
│   ├── ChatScreen.js       # Chat header, messages, input, emoji and voice
│   └── Message.js          # A single message bubble (with link detection)
├── pages/
│   ├── _app.js             # Auth gate; updates the user's profile and last seen
│   ├── index.js            # Home / landing screen
│   ├── Login.js            # Google sign-in page
│   ├── Loading.js          # Loading spinner
│   └── chat/[id].js        # Dynamic chat route (server-side rendered)
├── utils/
│   └── getRecipientEmail.js
├── public/                 # Icons and sound effects
├── styles/globals.css
├── firebase.js             # Firebase initialization
└── package.json
```

---

## 🗄️ Firestore Data Model

```
users/{uid}
  ├── email
  ├── photoURL
  └── lastSeen            (server timestamp)

chats/{chatId}
  ├── users: [emailA, emailB]
  └── messages/{messageId}
        ├── message
        ├── user          (sender's email)
        ├── photoURL
        └── timestamp     (server timestamp)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 14 or 16** (recommended, because Next 12 and `node-sass` 7 don't build on newer versions)
- A **Firebase project**

### 1. Clone and install
```bash
git clone https://github.com/<your-username>/Whatsapp-clone.git
cd Whatsapp-clone
npm install
```

### 2. Set up Firebase
1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Go to **Authentication → Sign-in method** and enable **Google**.
3. Go to **Firestore Database** and create a database.
4. Go to **Project settings → Your apps** and register a **Web app**, then copy its config.
5. Paste the config into `firebase.js`:
   ```js
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT.appspot.com",
     messagingSenderId: "YOUR_SENDER_ID",
     appId: "YOUR_APP_ID",
   };
   ```

### 3. Run
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000), sign in with Google, click **➕** and enter a friend's Gmail address to start chatting.

### Build for production
```bash
npm run build
npm start
```
The app can also be deployed to [Vercel](https://vercel.com/) with no extra configuration.

---

## 🔒 Firestore Security Rules (recommended)

Restrict access so users can only read and write chats they belong to:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == uid;
    }
    match /chats/{chatId} {
      allow read, update: if request.auth.token.email in resource.data.users;
      allow create: if request.auth.token.email in request.resource.data.users;
      match /messages/{messageId} {
        allow read, write: if request.auth.token.email in
          get(/databases/$(database)/documents/chats/$(chatId)).data.users;
      }
    }
  }
}
```

---

## 🛣️ Possible Improvements

- [ ] File and image sharing (the attach icon is a placeholder for now)
- [ ] Sound for incoming messages
- [ ] Group chats
- [ ] Read receipts and typing indicators
- [ ] Date separators between days
- [ ] Upgrade to the Firebase v9 modular SDK and the latest Next.js

---

## ⚠️ Disclaimer

This is an educational project and is not affiliated with WhatsApp or Meta.