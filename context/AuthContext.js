import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react"
import Swal from "sweetalert2";
import { auth, db } from "../config/firebase";


const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({children}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if(user) {
        setUser({
          uid: user.uid,
          email: user.email,
        });
      }else {
        setUser(null);
      }
      setLoading(false);
    })

    return unsubscribe;
  }, [])

// save user email and password in firebase authentication
const signup = async (email, password, name, setIsLoading) => {
  try {
    const userResult = await createUserWithEmailAndPassword(auth, email, password);
    console.log(name, email, db, userResult.user.uid)
    const docRef = await setDoc(doc(db, "users", userResult.user.uid), {
      name: name,
      email : email
    });
    console.log(docRef)
    router.push('/');
    Swal.fire({
      icon: 'success',
      title: 'You have succefully sign up',
    });
    
  } catch (e) {
    const type = e.code;
    console.log(e)
    Swal.fire({
      icon: 'error',
      title: type
    });
    setIsLoading(false);
  }
}

// signin using existing user details
const signin = async(email, password, setIsLoading) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    router.push('/');
    Swal.fire({
      icon: 'success',
      title: 'You have succefully Sign in',
    });
    
  } catch (e) {
    const type = e.code;
    Swal.fire({
      icon: 'error',
      title: type
    });
    setIsLoading(false);
  }
}

//sign the user out
const signout = async() => {
  try{
    router.push('/signin').then(async() => {
      await signOut(auth);
      Swal.fire({
        icon: 'success',
        title: 'You have succesfully Sign out'
      });
    })
    
  }catch (e) {
    const type = e.code;
    Swal.fire({
      icon: 'error',
      title: type
    });
  }
}

  return (
    <AuthContext.Provider value={{user, signup, signin, signout}}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}