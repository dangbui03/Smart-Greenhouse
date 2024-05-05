import { auth, db } from "./firebaseConfig"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { OAuthCredential } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default async function SignAction(formData: FormData) {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider).then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = (credential as OAuthCredential).accessToken;
        // The signed-in user info.
        const user = result.user;

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
        } else {
            await setDoc(doc(db, "users", user.uid), {});
        }
        return user
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
}