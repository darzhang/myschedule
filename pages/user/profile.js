import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import UserProfile from "../../components/UserProfile";
import { db } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  const [document, setDocument] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchUser = async () => {
        const docRef = doc(
          db,
          process.env.NEXT_PUBLIC_FIREBASE_USER_COLLECTION,
          user.uid
        );
        const docSnap = await getDoc(docRef);
        const docData = docSnap.data();
        setDocument(docData);
        setIsLoading(false);
      };
      fetchUser();
    }
  }, []);
  return <div>{!isLoading && <UserProfile doc={document} />}</div>;
}
