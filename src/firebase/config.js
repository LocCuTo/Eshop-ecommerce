import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_API_KEY,
    authDomain: 'eshop-11aa7.firebaseapp.com',
    projectId: 'eshop-11aa7',
    storageBucket: 'eshop-11aa7.appspot.com',
    messagingSenderId: '101935577850',
    appId: '1:101935577850:web:ae72239afe677199b86743',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
