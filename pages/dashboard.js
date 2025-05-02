import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Navbar from '@/components/Dashboard/Navbar'
import { useStateContext } from '@/context/StateContext'
import { useRouter } from 'next/router'

import { GlobalStyle } from '@/pages/_app'

import { useCapsuleContract } from '@/backend/useCapsuleContract'
import { ethers } from 'ethers'

import PageSkeleton from '@/components/PageSkeleton'






const Dashboard = () => {


  const { authenticated, setAuthenticated } = useStateContext(); //var to track if user logged in
  const { wallet, setWallet } = useStateContext()
  const router = useRouter() //import router for redirecting

  const capsuleContract = useCapsuleContract(); //import capsule contract from useCapsuleContract
  const [capsules, setCapsules] = useState([]); //state to hold capsules
  const [loading, setLoading] = useState(false) //loading state 

  async function handleWithdraw(id) { //function to withdraw capsule
    if (!capsuleContract) return;
    try {
      setLoading(true);
      const call = await capsuleContract.withdraw(id); //call withdraw in contract
      await call.wait();
      alert(`Capsule ${id} successfully withdrawn!`);
  
      // Mark capsule as withdrawn in state
      setCapsules((prev) =>
        prev.map((capsule) => (capsule.id === id ? { ...capsule, withdrawn: true } : capsule)) //if capsule is one we just withdrew change its withdrawn state to true
      );
    } catch (err) {
      console.error(err);
      alert('Withdrawal failed: ' + (err.reason || err.message));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { ////useffect to kick non logged out users 
    if(!authenticated){
      router.push('/')
    
    }

    async function loadCapsules() { //function to load capsules
      if (!capsuleContract) {
        return; // Wait for the contract to be initialized
      }
      try {
        //console.log('Fetching capsule IDs...');
        const ids = await capsuleContract.getUserCapsuleIDs(); //get ids of capsules that belong to user
        //console.log('Capsule IDs:', ids);
        const fullCapsules = await Promise.all(ids.map(async (id) => {
          const capsule = await capsuleContract.getCapsuleByID(id.toNumber()); //get capsule by id
          return { //format data into proper form 
            id: id.toString(),
            amount: ethers.utils.formatEther(capsule.amount),
            unlockTime: parseInt(capsule.unlockTime.toString()),
            withdrawn: capsule.withdrawn
          };
        })
        
        
      );
      setCapsules(fullCapsules); //set statefule capsules to fullCapsules

      } catch (err) {
        console.error('Error fetching capsules:', err); //catch error if any
      }

      

  }
    loadCapsules(); //call to load capsules












}, [authenticated,  capsuleContract]);

//   
const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

return(
  <>
  <PageSkeleton>
    <Wrapper>
      <span >
        <SectionTitle>My Capsules</SectionTitle>
        <Link href="/capsules/create" passHref>
        <CreateButton href="/capsules/create">+</CreateButton>
        </Link>
        </span>
      <CapsuleContainer>
        {
          //map through capsules and display them
          capsules.map((capsule) => (
            <CapsuleCard key={capsule.id}>
              <h3>Capsule ID: {capsule.id}</h3>
              <p>Amount: {capsule.amount} tBNB</p>
              <p>Unlock Time: {new Date(capsule.unlockTime * 1000).toLocaleString()}</p> 
              <p>Withdrawn: {capsule.withdrawn ? 'Yes' : 'No'}</p>
              {!capsule.withdrawn && capsule.unlockTime < currentTime &&
                <UnlockButton
                  onClick={() => handleWithdraw(capsule.id)}
                disabled={loading}
                >
                {loading ? 'Processing...' : 'Unlock'}
              </UnlockButton>
              
              }
              
            </CapsuleCard>
          ))


        }
        
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
  flex-direction: column;  
  width: 100%;
  max-height: 600px;       
  overflow-y: auto;        
  
`
const CapsuleCard = styled.div`
  font-family: 'Poppins', sans-serif;
  background-color: var(--color2);
  color: var(--color4);
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: 40%;
  height: 20%;
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

const UnlockButton = styled.button`
  background-color: var(--color3);
  color: var(--color1);
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  margin-top: 0.5rem;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: var(--color1);
    color: var(--color3);
    border: 1px solid var(--color3);
  }

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`


export default Dashboard