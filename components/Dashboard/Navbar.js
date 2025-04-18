import React from 'react';
import styled from 'styled-components';
import Link from 'next/link'

import { useStateContext } from '@/context/StateContext';
import Home from '@/components/Dashboard/Home'
import { GlobalStyle } from '@/pages/_app';

import { useRouter } from 'next/router';



//import { logoutUser } from '@/backend/Auth';
const Navbar = () => {

  const router = useRouter() //import router for redirecting
  const { authenticated, setAuthenticated } = useStateContext()
  const { wallet, setWallet } = useStateContext()

  function logoutUser() {
    setAuthenticated(false); //set authenticated to false
    setWallet(null); //set wallet address to null
    router.push('/'); //redirect to home page
    
    //logoutUser() //call logout function
  }

  return (
    <Nav>
      <Logo className="poppins-medium"onClick={() => {}} href="/">bLock</Logo>
      
      <NavLinks>
        
        {authenticated? //displayname if logged in on navbar + removes login/signup buttons
        <>
        <UserText>Wallet Linked</UserText>
        <ButtonLink href="/dashboard">My Capsules</ButtonLink>
        <ButtonLink href="/capsules/create">Create a Capsule</ButtonLink>
        </>
        : 
        <>
        <ButtonLink href="/auth/authenticate">Login</ButtonLink>
        
        </>
}
      </NavLinks>
      <NavEnd>
        { authenticated? //logout button if logged in
          <>
            <LogoutButton onClick={logoutUser}>Sign Out</LogoutButton>
          </>
          : null


        }

      </NavEnd>
    </Nav>
  );
};

const Nav = styled.nav`
  background-color: var(--color2);
  display: flex;
  flex-direction:column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  
  width:20rem;
  
`;

const Logo = styled(Link)`
  color: var(--color4);
  text-decoration:none;
  font-size: 1.5rem;
  font-weight: bold;
  

`;

const NavLeft = styled.div`


`

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  
  width: min(40%, 400px);
  

`;

const ButtonLink = styled(Link)`
  color: var(--color4);
  text-decoration:none;
  padding: 0.5rem;
  font-family: poppins;

  &:hover {
    background-color: #D0D6B3; //colorswap when hover
    color: #061003;
    
    border-radius: 5px;
  }
    

`
const LogoutButton = styled.button`
  text-color: #061003;
  background-color:#D0D6B3 ;
  border: 1px solid #061003;
  border-radius: 5px;
  text-decoration:none;
  padding: 0.5rem;
  font-family: poppins;
  align-self: flex-end;

  &:hover {
    background-color: #061003; //color swap when hover
    color: #D0D6B3;
    
  }


`



const NavEnd = styled.div`
  display: flex;
  width:50%;
  justify-content: flex-end;
`
const UserText = styled.span`
color: #D0D6B3;
font-family: poppins;
`

export default Navbar;

