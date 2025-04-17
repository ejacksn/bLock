import { doc, setDoc, getDoc, getDocs,addDoc, collection, query, where,deleteDoc } from "firebase/firestore"
import { auth, database } from "./Firebase"

import { Timestamp } from "firebase/firestore"



export const createBoard = async (title, links, user) => {
    if (!auth.currentUser) { //no user = no creation >:(
        console.error("User is not authenticated");
        return;
    }

    try{
        const boardData={
            title: title,
            links: links,
            ownerId: user.uid,
            ownerName: user.displayName,
            creationTime: Timestamp.now(), //creation time using firebase timestamp
            views: 0


        }
        const boardRef = await addDoc(collection(database, "boards"), boardData); //create new board document in boards collection
        console.log("Board created successfully");
        return boardRef.id; //return id of created board so i can use it for sharable link
        
    }
    catch(error){
        console.error("Error creating board", error);
        throw error; //throw to be caught by calling function
    }

}

export const getBoard = async (boardId) => {
    if (!boardId) {
        console.error("No board id provided");
        return;
    }

    try{
        const boardRef = doc(database, "boards", boardId); //get reference to board document
        const boardSnap = await getDoc(boardRef); //get board document
        if (boardSnap.exists()) {
            return boardSnap.data(); //return data of board document
        } else {
            console.error("No such document");
        }

        if (boardSnap.exists()){
            return boardSnap.data();
        }
        else{
            console.error("No such document");
        }
    }
    catch(error){
        console.error("Error getting board", error);
        return null;
    }



}

export const getBoardsByUser = async (userId) => {
    if (!userId) {
        console.error("No user id provided");
        return;
    }

    try{
        const boardsRef = collection(database, "boards"); //get ref to boards collection
        const q = query(boardsRef, where("ownerId", "==", userId)); //query boards collection for boards owned by logged in user
        const boardsSnap = await getDocs(q); //get boards documents
        return boardsSnap.docs.map(doc => (
            {
                id: doc.id,
                data: doc.data()
            }
        )); //return array of board documents with ids as an object
            
    }
    catch(error){
        console.error("Error getting boards", error);
        return [];
    }
}

export const deleteBoard = async (boardId) => {
    if (!boardId) {
        console.error("No board id");
        return;
    }


    try{ //fetch the board doc then delete it by its ref
        const boardRef = doc(database, "boards", boardId); //get reference to board document
        await deleteDoc(boardRef); //delete board document
        console.log("Board deleted");
    }
    catch(error){
        console.error("Error deleting this board", error);
        throw error; //throw error so it can be caught by calling function for dispalying error message
    }
}