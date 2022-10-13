import {initializeApp} from 'firebase/app';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import {useRouter} from 'next/router';
import Swal from 'sweetalert2';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// save user email and password in firebase authentication
export const signUp = async (email, password, router) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    Swal.fire({
      icon: 'success',
      title: 'You have succefully sign up',
    }).then((result) => {
      if(result.isConfirmed){
        router.push('/')
      }
    });
    
  } catch (e) {
    const type = e.code;
    switch(type) {
      case 'auth/email-already-in-use':
        Swal.fire({
          icon: 'error',
          title: 'Email has been used for another account'
        });
        break;
    }
  }
  
  

}