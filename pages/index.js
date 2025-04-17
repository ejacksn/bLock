import Hero from "@/components/LandingPage/Hero"
import { styled } from 'styled-components'
import Navbar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"

import ScrollingText from '@/components/ScrollingText';
import Link from "next/link";

export default function Home() {
  return (
    <>
      

        <Navbar/>
        <HomePageContainer>
        
        <ScrollingText />
        <Link href="/auth/signup">
        <StartButton>Get Started</StartButton>
        </Link>
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
