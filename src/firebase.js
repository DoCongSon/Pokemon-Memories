import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, getDocs } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: 'AIzaSyB9OoI-ci-XEm48y7-KTEopGTDRgSHS6MU',
  authDomain: 'pokemon-memories-742b9.firebaseapp.com',
  projectId: 'pokemon-memories-742b9',
  storageBucket: 'pokemon-memories-742b9.appspot.com',
  messagingSenderId: '337493813626',
  appId: '1:337493813626:web:126e807f157a3c78288ec3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const setScore = async ({ name, time, mode }) => {
  try {
    await addDoc(collection(db, `ranks${mode}`), {
      name,
      time,
    });
  } catch (error) {
    console.log({ error });
  }
};

const getScores = async ({ mode }) => {
  try {
    const scores = [];
    const querySnapshot = await getDocs(collection(db, `ranks${mode}`));
    querySnapshot.forEach((doc) => {
      scores.push(doc.data());
    });
    return scores.sort((a, b) => a.time - b.time);
  } catch (error) {
    console.log({ error });
  }
};

export { setScore, getScores };
