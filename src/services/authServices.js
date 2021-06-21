import firebase from "../firebase";
import { removeUserAccessToken, searchForAccessToken, updateDocument } from "./firestoreServices";

const auth = firebase.auth();
export const authAddUser = async (email, password) => {
    const userCredentials = await auth.createUserWithEmailAndPassword(email, password).catch(err => {
        return { rejected: true, error: err };
    });
    return userCredentials;
}


export const authVerifyUser = async (email, password) => {
    const userCredentials = await auth.signInWithEmailAndPassword(email, password).catch(err => {
        return {rejected : true, error : err};
    });
    return userCredentials;
}

export const googleAuth = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const gData = await auth.signInWithPopup(provider);

    return gData;
}


export const isTokenAvailable = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
        return false;
    }

    return accessToken;
}

export const checkUserStatus = async () => {
    
    const accessToken= isTokenAvailable();
    if (!accessToken){
        return false;
    }

    const doc = await searchForAccessToken(accessToken);

    if (!doc[0]?.data()) {
        return false;
    }
    console.log(auth.currentUser);
    return doc[0];
}

export const passwordResetRequest = async (email) => {
    return await auth.sendPasswordResetEmail(email);
}

export const setAccessToken = async (docId, accessToken) => {
    await updateDocument('userInfo', docId, { accessToken });
    localStorage.setItem("accessToken", accessToken);
}

export const removeAuthToken = () => {
    localStorage.removeItem("accessToken");
}

