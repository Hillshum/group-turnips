import fbConfig from './firebaseConfig';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp(fbConfig);

const firestore = firebase.firestore();
if (window.location.hostname === 'localhost') {
  firestore.settings({
    host: 'localhost:8080',
    ssl: false,
  });
}
export { firestore };

export const auth = firebase.auth();
