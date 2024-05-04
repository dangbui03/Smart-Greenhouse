import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import BackButton from "./BackButton";
import RecordList from "./RecordList";
import { db, auth } from "../../../firebase/firebaseConfig";
import Image from "next/image";

interface Props {
  params: {
    uid: string;
  };
}
export async function generateMetadata({ params: { uid } }: Props) {
  const docRef = collection(db, "users", uid, "records");
  const docSnap = await getDocs(docRef);

  if (docSnap.empty) {
    return {
      title: "User's record not found",
    };
  }

  return {
    title: "Records",
  };
}

export default async function Uid({ params: { uid } }: Props) {
  const docRef = collection(db, "users", uid, "records");
  const docSnap = await getDocs(docRef);

  return (
    <>
      {!docSnap.empty && (
        <main className="h-screen flex">
          <BackButton />
          <RecordList records={JSON.parse(JSON.stringify(docSnap.docs))} />
        </main>
      )}
      {docSnap.empty && (
        <main className=" h-screen w-screen flex justify-center items-center">
          <Image
            src="/required.png"
            alt="bb warned you"
            width={500}
            height={500}
          />
        </main>
      )}
    </>
  );
}
