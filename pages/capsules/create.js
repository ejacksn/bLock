import React from 'react'
import PageSkeleton from '@/components/PageSkeleton'
import styled from 'styled-components'
import { ethers } from 'ethers'
import { useStateContext } from '@/context/StateContext'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useCapsuleContract } from '@/backend/useCapsuleContract'

function Create() {
  const { authenticated, setAuthenticated } = useStateContext(); //var to track if user logged in
  const { wallet, setWallet } = useStateContext(); //wallet address

  const router = useRouter() //import router for redirecting

  const [amount, setAmount] = useState('')
  const[unlockTime, setUnlockTime] = useState('')
  const [loading, setLoading] = useState(false) //loading state for button

  const capsuleContract = useCapsuleContract(); //import capsule contract from useCapsuleContract

    useEffect(() => { ////useffect to kick non logged out users 
      if(!authenticated){
        router.push('/')
      
    }}, [authenticated, router]);


    async function handleCreate(){
      if(!capsuleContract){
        alert('Capsule contract not found');
      }
      if (!unlockTime) { // Validate unlock time
        alert('Please select an unlock time.');
        return;
      }

      if(!amount || isNaN(amount) || amount <= 0){ // Validate amount
        alert('Please enter a valid amount');
        return;
      }

      const unixUnlockTime = Math.floor(new Date(unlockTime).getTime() / 1000); // Convert to Unix timestamp IN SECONDS FOR SOLIDITY
      const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

      if (unixUnlockTime <= currentTime) { // Check if unlock time is in the past
        alert('Unlock time should be in the future.');
        return;
      }

      try {
        setLoading(true); // Set loading state to true
        const call = await capsuleContract.createCapsule(unixUnlockTime, {
          value: ethers.utils.parseEther(amount),
        }); //call createCapsule function from capsule contract
        await call.wait();
        alert('Capsule created successfully!');
        setAmount('');
        setUnlockTime('');
      } catch (err) {
        console.error(err);
        alert('Transaction failed: ' + (err.reason || err.message));
      } finally {
        setLoading(false);
      }
    }


  return (
    <PageSkeleton>
      <ContentPanel>
        <FormBox>
          <FormHeader>Create a Capsule</FormHeader>

          <Label>Unlock Time</Label>
          <InputBox 
            type="datetime-local" 
            placeholder="Unlock Time" 
            onChange={(e) => setUnlockTime(e.target.value)}
          />

          <Label>Deposit Amount (tBNB)</Label>
          <InputBox 
            type="text" 
            placeholder="0.01" 
            onChange={(e) => setAmount(e.target.value)}
          />
          

          <SubmitButton onClick={handleCreate} disabled={loading}>
            {loading ? 'Creating...' : 'Create Capsule'}
          </SubmitButton>
        </FormBox>


      </ContentPanel>
    </PageSkeleton>
  )
}

const ContentPanel = styled.div`
  background-color: var(--color1);
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;

`
const FormBox = styled.div`
background-color: var(--color2);
padding: 2rem;
border-radius: 12px;
width: 400px;
display: flex;
flex-direction: column;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);

`
const FormHeader = styled.h1`
  color: var(--color4);
  font-family: 'Poppins', sans-serif;
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-align: center;
`;

const InputBox = styled.input`
  background-color: var(--color2);
  color: var(--color4);
  border: none;
  border-radius: 0.5rem;
  padding: 1rem;
  width: 100%;
  margin-bottom: 1rem;
`
const Label = styled.label`
  color: var(--color4);
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const SubmitButton = styled.button`
  background-color: var(--color3);
  color: var(--color1);
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color3);
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--color1);
    color: var(--color3);
    border: 1px solid var(--color3);
  }

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;
export default Create