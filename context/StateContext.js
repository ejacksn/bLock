import { useRouter } from 'next/router';
import React, { createContext, useContext, useState, useEffect } from 'react';
//import { onIdTokenChanged } from 'firebase/auth';
//import {auth} from '@/backend/Firebase'

const Context = createContext();

export const StateContext = ({ children }) => {

  // Variables to Carry Across Multiple Pages
  const [wallet, setWallet] = useState(null); // wallet address
  const [user, setUser] = useState(undefined);
  const [authenticated, setAuthenticated] = useState(false); // variable to track whether user is authenticated

  /*
    user object is like this:
    {
      uid: '<USER_ID>',
      email: '<USER_EMAIL>',
      displayName: '<USER_DISPLAY_NAME>'
  } 
*/

  const router = useRouter()
  const { asPath } = useRouter()


  
  //  //AUTHENTICATION REMEMBER ME USEEFFECT
  //  useEffect(() => {
  //    const unsubscribe = onIdTokenChanged(auth, (user) => {
  //      if(user){
  //        console.log('Token or user state changed:', user)
  //        user.getIdToken().then((token) => {
  //          console.log('New ID token:', token)
  //        })
  //        setUser(user)
  //      } else {
  //        setUser(null) //there is no user signed in
  //      }
  //    });
  //    return () => unsubscribe();
  //  }, []);
   




return(
    <Context.Provider
    value={{
        user,
        setUser,
        authenticated,
        setAuthenticated,
        wallet,
        setWallet
    }}
    >
      {children}
    </Context.Provider>
    )
 }

export const useStateContext = () => useContext(Context);
