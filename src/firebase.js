import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider,signInWithPopup  } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCOupwDtBcA3GFKIXO5uIFYDQSCh2UIYjQ",
    authDomain: "slack-clone-ddf83.firebaseapp.com",
    projectId: "slack-clone-ddf83",
    storageBucket: "slack-clone-ddf83.appspot.com",
    messagingSenderId: "415935335119",
    appId: "1:415935335119:web:5f924d90180d60326205ba",
    measurementId: "G-VYKEH1YNGK"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();
  
  export { auth, provider, db ,signInWithPopup  };
  