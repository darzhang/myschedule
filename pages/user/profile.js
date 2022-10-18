import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import UserProfile from "../../components/UserProfile";
import { db } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";

export default function profile() {
  const {user} = useAuth();
  const [document, setDocument] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async() => {
      const docRef = doc(db, process.env.NEXT_PUBLIC_FIREBASE_USER_COLLECTION, user.uid);
      console.log(docRef)
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data())
      const docData = docSnap.data();
      setDocument(docData);
      setIsLoading(false);
    }
    fetchUser();
  }, [])
  return (
    <div>
      {!isLoading && <UserProfile doc={document} />}
    </div>
  )
}