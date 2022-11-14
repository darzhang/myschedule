import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";

export default function EventPage() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState({});

  useEffect(() => {
    const fetchEvent = async () => {
      const docSnap = await getDoc(
        doc(db, process.env.NEXT_PUBLIC_FIREBASE_EVENT_COLLECTION, id)
      );
      setEvent(docSnap.data());
    };
    fetchEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>{event.title}</div>;
}
