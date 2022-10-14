import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react"
import Swal from "sweetalert2";
import { auth } from "../config/firebase";


const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({children}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        setUser({
          uid: user.uid,
          email: user.email,
          name: user.name,
        });
      }else {
        setUser(null);
      }
      setLoading(false);
    })

    return unsubscribe;
  }, [])

  // save user email and password in firebase authentication
  const signup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
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

// login using existing user details
const signin = async(email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
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
      case 'auth/user-not-found':
        Swal.fire({
          icon: 'error',
          title: 'There is no user corresponding to the email'
        });
        break;
      case 'auth/wrong-password':
        Swal.fire({
          icon: 'error',
          title: 'Wrong password for email provided'
        });
        break;
    }
  }
  await signInWithEmailAndPassword(auth, email, password);
  Swal.fire({
    icon: 'success',
    title: 'You have succesfully log in',
  }).then((result) => {
    if(result.isConfirmed){
      router.push('/')
    }
  })
}

  return (
    <AuthContext.Provider value={{user, signup, signin}}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}