import { authAddUser, authVerifyUser, checkUserStatus, removeAuthToken, googleAuth, setAccessToken, passwordResetRequest } from "../../services/authServices";
import { addDocument, updateDocument, searchForEmail, removeUserAccessToken } from "../../services/firestoreServices";
import { uploadFile } from "../../services/fireStorage";
import { loginAction, setUserAction, logOutAction } from "../actions/authActions";


/**
 *
 * @param {function} dispatch
 * @param {object} userData
 * @returns {String} containing Id of the firebase document
 */

const registerUser = async (dispatch, email, password, userData={}) => {
        const response = await authAddUser(email, password);
        if(response.rejected){
            throw response.error;
        }

        const userDoc = await addDocument('userInfo', {email,...userData});
        const userInfo = (await userDoc.get()).data();
        const userId = userDoc.id;

        // Set user data to store
        dispatch(setUserAction({ ...userInfo, userId }))

        return userId;
}   

const updateUser = async (userId, userData) => {
    return await updateDocument('userInfo', userId, userData);
} 


/**
 * 
 * @param {function} dispatch 
 * @param {object} userData 
 * @returns {object} User's firestore Document object
 */

const signInUser = async (dispatch, userData) => {
        const credentials = await authVerifyUser(userData.email, userData.password);
        
        // Throw error if user is not registered before
        if(credentials.rejected){
            throw credentials.error;
        }

        const accessToken = credentials.user.refreshToken;

        const doc = (await searchForEmail(userData.email));
        const userId = doc[0].id;
        await setAccessToken(userId, accessToken);

        dispatch(loginAction(credentials.user, { ...doc[0].data(), userId }));

        return doc[0].data();
}



/**
 *
 * @param {function} dispatch
 * @param {object} userData
 * @returns {object} Conatining User's firestore Document object
 */

const signUpWithGoogle = async (dispatch) => {
    const gData = await googleAuth().catch((error) => {
        throw error;
    });
    const { displayName: name, email } = gData.user;
    
    const doc = await searchForEmail(email);

    if(doc.length > 0) {
        throw {code: "auth/email-already-exist"};
    }

    const userDoc = await addDocument('userInfo', { name,email})
    const userInfo = (await userDoc.get()).data();
    const userId = userDoc.id;

    dispatch(setUserAction({ ...userInfo, userId }))

}



/**
 * 
 * @param {function} dispatch 
 * @returns {object} containing firestore document object
 */


const loginWithGoogle = async (dispatch) => {
    const gData = await googleAuth().catch((error) => {
        throw error;
    });

    const {email, refreshToken } = gData.user;
    const doc = await searchForEmail(email);

    if (doc.length < 1) {
        throw { code: "auth/email-not-registered" };
    }
    const userId = doc[0].id;

    await setAccessToken(userId, refreshToken);

    dispatch(loginAction(gData.user, { ...doc[0].data(), userId }));
    return doc[0].data();
}
 
/**
 * 
 * @param {function} dispatch 
 * @returns {Promise} Fullfilled promise
 */

const setUserData = async (dispatch) => {
    const userData = await checkUserStatus();
    if (!userData) {
        return false;
    }

    const userInfo = {
        ...userData && { ...userData.data() },
        userId: userData?.id
    }

    dispatch(setUserAction(userInfo))
}

/**
 * 
 * @param {function} dispatch 
 * @param {File} file 
 * @param {string} ref 
 * @param {string} userId 
 * @returns {string} containing location of the image on server
 */
const setUserImage = async (dispatch, file, ref, userId) => {
    const imageUrl = await uploadFile(file,ref).catch((error) => {
        throw error;
    });
    const doc = await updateDocument('userInfo', userId, {imageUrl});
    dispatch(setUserAction({ imageUrl }))
    return imageUrl;
}


/**
 * 
 * @param {function} dispatch 
 * @param {string} userId 
 * @returns {Promise} Fullfilled promise
 */

const logOutUser = async (dispatch, userId) => {

    await removeUserAccessToken(userId);
    removeAuthToken();

    dispatch(logOutAction())
}


/**
 * 
 * @param {string} email 
 * @returns {Promise} Fullfilled promise
 */

const resetPassword = async (email) => {
    const resolved = await passwordResetRequest(email).catch((error) => {
        throw error;
    });
    return resolved;
}       


export { 
    registerUser, 
    signInUser, 
    updateUser, 
    setUserData, 
    logOutUser, 
    signUpWithGoogle, 
    loginWithGoogle,
    resetPassword,
    setUserImage
};