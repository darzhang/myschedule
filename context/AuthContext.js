import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
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

  // login using existing user details
  
  

}

  return (
    <AuthContext.Provider value={{user, signup}}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}