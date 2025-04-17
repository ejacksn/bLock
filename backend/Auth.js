import { CiZoomIn } from "react-icons/ci";
import { auth } from "./Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail, updateProfile , reload} from "firebase/auth";
 

export const registerUser = async (email, password, username, setUser) => {
    
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password); //create user using the email and password
        const user = userCredential.user;
        
        await updateProfile(user, { //update the user profile with the username
            displayName: username 
        }); 
        await reload(user); //refreshes the user object with the new dispalyname so when i set user it will have the actual display name in the object

        setUser({
            "uid": user.uid,
            "email": user.email,
            "displayName": user.displayName
        }); //set the user in stateContext apparently its better to use this than just setUser(user) so we don't expose fields in user object unintentionally

        return user; //return user object
    }
    catch(err){
        console.log('Signup Error:', err)
        throw err; //throw error to be caught by calling sign up button function so that i can display the error to the user
    }
}

export const loginUser = async (email, password, setUser) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password); //sign in user with email and password
        const user = userCredential.user; //get user obj from userCredential
        setUser({
            "uid": user.uid,
            "email": user.email,
            "displayName": user.displayName
        }); //set user in stateContext
        return user; //return user object
    }
    catch(err){
        console.log('Login Error:', err)
        throw err; //throw error to be caught by calling sign up button function so that i can display the error to the user
    }
}


export const logoutUser = async () => {
    try{ 
        auth.signOut(); //sign out user
        console.log('User signed out');
        
    }
    catch (err){
        console.log('Logout Error:', err)
        throw err; //throw error to be caught by calling sign up button function so that i can display the error to the user
    }
   
 }
    
