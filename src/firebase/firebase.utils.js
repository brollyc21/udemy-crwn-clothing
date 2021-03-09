import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDk4h5VgYZ7w2IojrkDt4gpwE0FyUjUWBQ",
  authDomain: "crwb-db-76b1b.firebaseapp.com",
  databaseURL: "https://crwb-db-76b1b.firebaseio.com",
  projectId: "crwb-db-76b1b",
  storageBucket: "crwb-db-76b1b.appspot.com",
  messagingSenderId: "115352583760",
  appId: "1:115352583760:web:7ea4536ff7ba645ee19b55",
  measurementId: "G-8T77H5K2K9"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;