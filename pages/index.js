import Hero from "@/components/LandingPage/Hero"
import { styled } from 'styled-components'
import Navbar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"

import ScrollingText from '@/components/ScrollingText';
import Link from "next/link";
import { GlobalStyle } from '@/pages/_app';

export default function Home() {
  return (
    <>
      

        
        <HomePageContainer>
        
        <ScrollingText />
        <Wrapper>
      <Title>bLock</Title>
      <Subtitle>Lock messages or cryptocurrency until a specified date in the future.</Subtitle>
      <Link href="/auth/authenticate">
        <Button>Connect Wallet</Button>
      </Link>
    </Wrapper>
        <ScrollingText />
        
        </HomePageContainer>
        
    </>
  )
}

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #061003;
  width: 100vw;
  height: 100vh;
  margin: 0%;
  overflow: hidden;
  align-items: center;
`
const StartButton = styled.button`
  background-color: var(--light-primary);
  color: #061003;
  padding: 10px 20px;
  border: 2px solid var(--dark-primary);
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 200px;
  font-family: 'Poppins', sans-serif;
  align-self: center;
  
  
  min-width: 300px;
  height: 50px;
  

  &:hover{
    background-color: var(--dark-primary);
    color: var(--light-primary);
    border : 2px solid var(--light-primary);
    }
  
`
const Wrapper = styled.div`
  
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  font-family: 'Poppins', sans-serif;
`

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--color4);
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 2rem;
 
  color: var(--color4);
`

const Button = styled.button`
  padding: 0.75rem 2rem;
  background-color: var(--color3);
  color: var(--color1);
  font-weight: bold;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    background-color: var(--color1);
    color: var(--color4);
    border: 2px solid var(--color3);
  }
  `
