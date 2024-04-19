import { auth } from "./firebaseConfig"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default async function SignAction(formData: FormData) {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider)
    return result
}