import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Navbar from '@/components/Dashboard/Navbar'
import { useStateContext } from '@/context/StateContext'
import { useRouter } from 'next/router'

import { GlobalStyle } from '@/pages/_app'

import PageSkeleton from '@/components/PageSkeleton'






const Dashboard = () => {

//   
return(
  <>
  <PageSkeleton>
    <Wrapper>
      <span >
        <SectionTitle>My Capsules</SectionTitle>
        <CreateButton>+</CreateButton>
        </span>
      <CapsuleContainer>
        <CapsuleCard></CapsuleCard>
        <CapsuleCard></CapsuleCard>
        <CapsuleCard></CapsuleCard>
        
      </CapsuleContainer>

    </Wrapper>


    
  </PageSkeleton>








  </>
)
}


//STYLED COMPONENTS
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: var(--color1);
  padding-top: 20px;
`
const SectionTitle = styled.text`
  font-size: 2rem;
  color: var(--color4);
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  margin-left: 1rem;
  margin-right: 1rem;
  
`

const CapsuleContainer = styled.div`
  display: flex;
  flex-wrap: none;
  flex-direction: row;
  
`
const CapsuleCard = styled.div`
  background-color: var(--color2);
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
` 
const CreateButton = styled.button`
  background-color: var(--color3);
  color: var(--color1);
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 20px;
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: var(--color1);
    color: var(--color4);
    border : 2px solid var(--color3);
    }
`


export default Dashboard