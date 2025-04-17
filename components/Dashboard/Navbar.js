import React from 'react';
import styled from 'styled-components';
import Link from 'next/link'

import { useStateContext } from '@/context/StateContext';
import Home from '@/components/Dashboard/Home'
import { GlobalStyle } from '@/pages/_app';



import { logoutUser } from '@/backend/Auth';
const Navbar = () => {
  const { user, setUser } = useStateContext()

  return (
    <Nav>
      <Logo className="poppins-medium"onClick={() => logOut(setUser)} href="/">chainLink.</Logo>
      <Home></Home>
      <NavLinks>
        
        {user? //displayname if logged in on navbar + removes login/signup buttons
        <UserText>Logged in as {user.displayName}</UserText>
        
        : 
        <>
        <ButtonLink href="/auth/login">Login</ButtonLink>
        <ButtonLink href="/auth/signup">Sign Up</ButtonLink>
        </>
}
      </NavLinks>
      <NavEnd>
        { user? //logout button if logged in
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
  background-color: #061003;
  display: flex;
  flex-direction:row;
  justify-content: flex-start;
  align-items: center;
  height: min(10vh, 50px);
  
  width:100%;
  
`;

const Logo = styled(Link)`
  color: #D0D6B3;
  text-decoration:none;
  font-size: 1.5rem;
  font-weight: bold;
  padding-left: 1%;

`;

const NavLeft = styled.div`


`

const NavLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  width: min(40%, 400px);
  

`;

const ButtonLink = styled(Link)`
  color: #D0D6B3;
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
  background-color: #D0D6B3;
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

