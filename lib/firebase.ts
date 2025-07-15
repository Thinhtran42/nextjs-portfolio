import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Production-ready Firebase config
const getFirebaseConfig = () => {
  // Try to get from environment variables first
  const fromEnv = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  // Check if all env vars are available
  if (Object.values(fromEnv).every(val => val)) {
    return fromEnv;
  }

  // Fallback for local development only
  if (process.env.NODE_ENV === 'development') {
    console.warn('Using fallback Firebase config for local development');
    return {
      apiKey: "AIzaSyCIidMAIjrOiCkgx9vvftc4SsyWslECtJo",
      authDomain: "my-portfolio-2af00.firebaseapp.com",
      projectId: "my-portfolio-2af00",
      storageBucket: "my-portfolio-2af00.firebasestorage.app",
      messagingSenderId: "380859987341",
      appId: "1:380859987341:web:93d69f3c62a3af20e5f9c4",
    };
  }

  // Throw error in production if env vars are missing
  throw new Error('Firebase environment variables are required for production deployment');
};

const firebaseConfig = getFirebaseConfig();
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 