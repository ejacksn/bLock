import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useStateContext } from '@/context/StateContext'
//import {login, isEmailInUse} from '@/backend/Auth'

//import { loginUser } from '@/backend/Auth' //login fucntion 
import Link from 'next/link'
import Navbar from '@/components/Dashboard/Navbar'

import PageSkeleton from '@/components/PageSkeleton'
const Login = () => {

  const {authenticated, setAuthenticated } = useStateContext()
  //const { user, setUser } = useStateContext()
  const { wallet, setWallet } = useStateContext()
  


  const router = useRouter()

  const [loginError, setLoginError] = useState('') //state to hold error message


  async function handleLogin(){

    setLoginError('') //clear error message
    

    if (!wallet) { // can't log in with blank fields, duh
      setLoginError("Wallet Address Required.");
      return;

    }
    try{
      // PUT WALLET AUTHENTICATION AWAIT HERE
      setAuthenticated(true) //set authenticated to true
      setWallet(wallet) //set wallet address
      router.push('/dashboard') //redirect to dashboard
    }
    catch(error){
      console.log('login error', error)
      setLoginError(error.message) //set error message
      
    }
    
  }

  return (
    <>
    <PageSkeleton>
      <CenterDiv>
      <Section>
          <Header>Authenticate</Header>

          <OrganizingDiv>
          
          
          
          <Input type="text" placeholder="Wallet Address"value={wallet} onChange={(e) => setWallet(e.target.value)}/>

          

          

          {loginError? <ErrorDiv>{loginError}</ErrorDiv> : null} {/*show error div on error*/}

          <MainButton onClick={()=>{handleLogin()}}>Connect Wallet</MainButton>

          </OrganizingDiv>

      </Section>
      </CenterDiv>
    </PageSkeleton>
    </>
  )
}

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: var(--color1);

`
const OrganizingDiv = styled.div`
  display: flex;
  flex-direction: column;
`
const Section = styled.section`
  display: block;
  height: 25%;
  width: 50%;
  padding: 20px;
  background-color: var(--color2);
  border-radius: 8%;
  border: none;
  padding: 20px;
`;

const Header = styled.h1`
  font-size: 24px; /* Adjusted for better scalability */
  color: var(--color4);
  font-family: 'Poppins', sans-serif;
  text-align: center;
`;

const Input = styled.input`
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  border-radius:20px;
  
  border: 2px var(--color3) solid;
  height: 40px;
  margin: 1rem .5rem;
  padding-left: 7px;
  background-color: var(--color1);
  color: var(--color4);

  

  

`;

const InputTitle = styled.label` /* Changed to label for semantics */
  font-size: 14px;
  color: #666;
`;

const MainButton = styled.button`
  background-color: var(--color3);

  color: #d0d6b3;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;

  height: 40px;
  border-radius: 8px;
  width: 50%;
  align-self: center;
  border: none;
  &:hover {
    background-color: #D0D6B3;
    color: #061003;
  }
`;

const UserAgreementText = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  color: #061003;
`

// const UserAgreementSpan = styled(Link)`
//   color: #061d03;
//   font-weight: bold;
//   cursor: pointer;
//   &:hover {
//     text-decoration: underline;
//   }
//   &:not(:last-of-type)::after {
//     content: ', '; /* Adds comma between links */
//   }
// `



const ErrorDiv = styled.div`
  border: red solid 2px;
  border-radius: 8px;
  font-size: 12px;
  margin-top: 10px;
  text-align: center;
  color: red;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  
  padding: 5px;
`;


export default Login