import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useStateContext } from '@/context/StateContext'
//import { isEmailInUse, register} from '@/backend/Auth' //old import from template

import Link from 'next/link'
import Navbar from '@/components/Dashboard/Navbar'

import { registerUser } from '@/backend/Auth' //function to register new user

const Signup = () => {

  const { user, setUser } = useStateContext()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [username, setUsername] = useState('')

  const [signUpError, setSignUpError] = useState('') //state to hold error message

  const router = useRouter()

  async function validateEmail(){
    const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if(emailRegex.test(email) == false ){
        setSignUpError('Invalid email format') // set error div to show invalid email format
        return false;
    }
    console.log('so far so good...')
    /* apparently firebase implicitly checks for email duplication so this will be ahndled by error on signup 
    const emailResponse = await isEmailInUse(email)
    console.log('email response', emailResponse)
    if(emailResponse.length == 0 ){
        return false;
    }
    */

    return true;
}

  async function handleSignup(){

    setSignUpError('') //clear error message

    const isValidEmail = await validateEmail()

    if (!username || !email || !password) {
      setSignUpError("All fields are required.");
      return;
    }

    if (isValidEmail == false) { //if email is not valid, return so signup aborts
        console.log('invalid email')
        return;
    }
    // console.log('isValidEmail', isValidEmail)
    // if(!isValidEmail){ return; }
    
    

    
    
    try{
        await registerUser(email, password, username, setUser)
        router.push('/dashboard')
    }catch(err){
        console.log('Error Signing Up', err)
        setSignUpError(err.message) //set signUpError stateful var to the error message from firebase
    }
  }


  return (
    <>
    <Navbar/>
    <CenterDiv>
    <Section>
        <Header>Sign Up</Header>
        <Input type="text" placeholder="username"value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
        <Input type="email" placeholder="email"value={email} onChange={(e) => setEmail(e.target.value)}/>
        <Input type="password" placeholder="password"value={password} onChange={(e) => setPassword(e.target.value)}/>

        <UserAgreementText>By signing in, you automatically agree to our <UserAgreementSpan href='/legal/terms-and-conditions' rel="noopener noreferrer" target="_blank"> Terms and Conditions</UserAgreementSpan></UserAgreementText>
        {signUpError? <ErrorDiv>{signUpError}</ErrorDiv> : null} {/*show error div on error*/}

        <MainButton onClick={handleSignup}>Signup</MainButton>

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

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 20px;
  background-color: #AAAE7F;
  border-radius: 8%;
  border: 2px solid #D0D6B3;
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
  border: border-box;
  border: 2px #061003 solid;
  height: 40px;
  margin: 1rem .5rem;
  padding-left: 7px;

  background-color: #D0D6B3;

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
  margin: 1rem;
  &:hover {
    background-color: #D0D6B3;
    color: #061003;
  }
`;

const UserAgreementText = styled.p`
  font-size: 12px;
  font-family: 'Poppins', sans-serif;
`;

const UserAgreementSpan = styled(Link)` 
  color: #061003;
  font-weight: bold;
  text-decoration: none; 
  &:hover {
    text-decoration: underline;
  }

`;
const ErrorDiv = styled.div`
  border: red solid 2px;
  border-radius: 8px;
  font-size: 12px;
  margin-top: 10px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  color: #D0D6B3;
  padding: 10px 0px;
  opacity: 0.8;
  background-color: red;
  
`;


export default Signup