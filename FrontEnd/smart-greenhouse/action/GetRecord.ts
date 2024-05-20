"use client"
import { db } from "../firebase/firebaseConfig"
import { query, collection, orderBy, limit, getDocs } from "firebase/firestore";

export default async function GetRecord(uid: string) {
    const docRef = query(
        collection(db, "users", uid, "records"),
        orderBy("createdDate", "desc"), // Sorting by created time in descending order
        limit(25)
    );
    const docSnap = await getDocs(docRef);
    return docSnap
}