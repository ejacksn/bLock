import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useStateContext } from '@/context/StateContext'
//import {login, isEmailInUse} from '@/backend/Auth'

import { loginUser } from '@/backend/Auth' //login fucntion 
import Link from 'next/link'
import Navbar from '@/components/Dashboard/Navbar'
const Login = () => {

  const { user, setUser } = useStateContext()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const [username, setUsername] = useState('')

  const router = useRouter()

  const [loginError, setLoginError] = useState('') //state to hold error message


  async function handleLogin(){

    setLoginError('') //clear error message
    

    if (!email || !password) { // can't log in with blank fields, duh
      setLoginError("All fields are required.");
      return;

    }
    try{
      await loginUser(email, password, setUser) //login function
      router.push('/dashboard') //redirect to dashboard
    }
    catch(error){
      console.log('login error', error)
      setLoginError(error.message) //set error message
    }
    
  }

  return (
    <>
    <Navbar/>
    <CenterDiv>
    <Section>
        <Header>Login</Header>

        <OrganizingDiv>
        
        <Input type="email" placeholder="email"value={email} onChange={(e) => setEmail(e.target.value)}/>
        
        <Input type="password" placeholder="password"value={password} onChange={(e) => setPassword(e.target.value)}/>

        

        <UserAgreementText>By signing in, you automatically agree to our <UserAgreementSpan href='/legal/terms-and-conditions' rel="noopener noreferrer" target="_blank"> Terms and Conditions</UserAgreementSpan></UserAgreementText>

        {loginError? <ErrorDiv>{loginError}</ErrorDiv> : null} {/*show error div on error*/}

        <MainButton onClick={handleLogin}>Login</MainButton>

        </OrganizingDiv>

    </Section>
    </CenterDiv>
    </>
  )
}

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;
  background-color: #061003;

`
const OrganizingDiv = styled.div`
  display: flex;
  flex-direction: column;
`
const Section = styled.section`
  display: block;
  width: 50%;
  padding: 20px;
  background-color: #AAAE7F;
  border-radius: 8%;
  border: 2px solid #AAAE7F;
  padding: 20px;
`;

const Header = styled.h1`
  font-size: 24px; /* Adjusted for better scalability */
  color: #061003;
  font-family: 'Poppins', sans-serif;
`;

const Input = styled.input`
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  border-radius:7px;;
  
  border: 2px #061003 solid;
  height: 40px;
  margin: 1rem .5rem;
  padding-left: 7px;
  background-color: #D0D6B3;

  

  

`;

const InputTitle = styled.label` /* Changed to label for semantics */
  font-size: 14px;
  color: #666;
`;

const MainButton = styled.button`
  background-color: #061003;

  color: #d0d6b3;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;

  height: 40px;
  border-radius: 8px;
  width: 50%;
  align-self: center;
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
`;

const UserAgreementSpan = styled(Link)`
  color: #061d03;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  &:not(:last-of-type)::after {
    content: ', '; /* Adds comma between links */
  }
`;
const ErrorDiv = styled.div`
  border: red solid 2px;
  border-radius: 8px;
  font-size: 12px;
  margin-top: 10px;
  text-align: center;
  color: red;
`;


export default Login