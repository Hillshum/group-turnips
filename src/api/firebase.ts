import fbConfig from './firebaseConfig';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp(fbConfig);

const firestore = firebase.firestore();

export { firestore };

export const auth = firebase.auth();
