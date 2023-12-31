import { initializeApp, getApps } from 'firebase/app';
import 'firebase/firestore';

let app;

if (!getApps().length) {
  app = initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  });
} else {
  app = getApps()[0]; // Use the existing app instance if there is one
}

export default app;
