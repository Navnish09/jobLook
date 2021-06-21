import firebase from "../firebase";

const storageRef = firebase.storage().ref();
export const uploadFile = async (fileObj, ref) => {

    const fileRef = storageRef.child(ref);
    const file = await fileRef.put(fileObj);
    const ImageUrl = await fileRef.getDownloadURL();
    return ImageUrl;
}