import fbConfig from './firebaseConfig';

import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const app = initializeApp(fbConfig);

const firestore = getFirestore(app);
if (window.location.hostname === 'localhost') {
  connectFirestoreEmulator(firestore, 'localhost', 8080)
}
export { firestore };

export const auth = getAuth(app);
