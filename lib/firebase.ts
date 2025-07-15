import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Safe Firebase config using only environment variables
const getFirebaseConfig = () => {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  // Check if all required environment variables are present
  const missingVars = Object.entries(config)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    const envVarNames = missingVars.map(key => {
      const envName = key.replace(/([A-Z])/g, '_$1').toUpperCase();
      return `NEXT_PUBLIC_FIREBASE_${envName.replace('NEXT_PUBLIC_FIREBASE_', '')}`;
    });
    
    throw new Error(
      `Missing required Firebase environment variables: ${envVarNames.join(', ')}\n` +
      `Please create a .env.local file with your Firebase configuration.\n` +
      `See SETUP-FIREBASE.md for detailed instructions.`
    );
  }

  return config;
};

const firebaseConfig = getFirebaseConfig();
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 