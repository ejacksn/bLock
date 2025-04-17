import React, { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import Navbar from '@/components/Dashboard/Navbar'
import { useRouter } from 'next/router'


import { useStateContext } from '@/context/StateContext'
import { GlobalStyle } from '../_app'

import { createBoard } from '@/backend/Database'




//creation page for boards
export default function Create() {
    const { user } = useStateContext() //import user from global context
    const [title, setTitle] = useState("") //stateful title of new board
    const [links, setLinks] = useState([{url:"", description:""}]) //stateful list of links with descriptions
    const [publishError, setPublishError] = useState("") //stateful error message for publishing a board

    const router = useRouter() //import router for redirecting


    //add blank link (plus button function)
    const addLink = ()=>{ 
      setLinks([...links, {url: "", description: ""}]);
    }

    //function to remove a link at index provided by map
    const removeLink = (index) => {
      setLinks(links.filter((_, i)=>(i !== index))); //disregarding actual item, removes link at index by filtering out that index from list
    }

    //function to publish board
    const handlePublish = async () => {
      if(!title || links.length==0){ //dont publish if no title or links
        setPublishError("Title and links are required");
        return;
      }
      try {
        
        const boardId = await createBoard(title, links, user); //get id of created board
        console.log("Board created successfully");
        router.push(`/boards/${boardId}`); //redirect to dashboard after creation

      } catch (error) {
        console.error("Error creating board", error);
        setPublishError("Error creating board"); //set error message
      }
    }

    useEffect(() => {
      if (user===null) {
        router.push('/auth/login');
      }
    }, [user]) //redirect to login if no user on page load or user change (logout probably)

  return (
    <>
    <Navbar/>
    <CreatePageContainer>
      <TitleInput 
      type="text" 
      placeholder="Board Title" 
      value={title} 
      onChange={(e) => {setTitle(e.target.value);console.log(title)}}
      /> 
      <LinkArea>
      {links.map((link, index) => (
        <LinkBox key={index}>
          <UrlInput 
          type="url" 
          placeholder="Link URL" 
          value={link.url} 
          onChange={(e) => {link.url = e.target.value; setLinks([...links])}} //set link url as it changes
          />
          <DescriptionInput
          type="text" 
          placeholder="Link Description" 
          value={link.description} 
          onChange={(e) => {link.description = e.target.value; setLinks([...links])}} //set text description as it changes
          />
          <RemoveLinkButton onClick={()=>removeLink(index)}>x</RemoveLinkButton>
        </LinkBox>
      ))}
      <AddLinkButton onClick={addLink}>➕Add Link</AddLinkButton>
      </LinkArea>
      <PublishButton onClick={handlePublish}>Publish Board</PublishButton>
      {publishError ? <ErrorDiv>{publishError}</ErrorDiv>: null}
      
   
   
    <p>Ensure links begin with http:// or https://</p>
    </CreatePageContainer>
    
    </>
  )
}

const CreatePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #061003;
  width: 100vw;
  height: 100vh;
  margin: 0%;
  overflow: scroll;
  align-items: left;
`
const TitleInput = styled.input`
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  border-radius:7px;;
  
  border: 2px #061003 solid;
  height: 40px;
  margin: 1rem .5rem;
  padding-left: 7px;
  width: 80%;

`

const LinkArea = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 80%;
  padding: 0;
  margin: 0;
  border: 2px var(--light-primary) solid;
  border-radius: 7px;
  list-style-type: none;
  margin-left: 2rem;
`
const LinkBox = styled.li`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 80%;
  padding: 1rem;
  margin: 2rem;
  background-color:var(--dark-primary);
  border-radius: 7px;
  
  border: 2px var(--mid-secondary) solid;
  

  
`
const UrlInput = styled.input`
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    border-radius:7px;
    
    border: 2px #061003 solid;
    height: 40px;
    margin: 1rem .5rem;
    padding-left: 7px;


`
const DescriptionInput = styled.textarea`
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    border-radius:7px;;
    
    border: 2px #061003 solid;
    height: 300px;
    justify-self: flex-end;
    
    margin: 1rem .5rem;
    padding-left: 7px;
    
`

const AddLinkButton = styled.button`
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  border-radius:7px;;
  
  text-align: left;
  padding-left: 7px;
  width: 120px;
  height: 40px;
  margin: 1rem .5rem;
  
  background-color: var(--mid-secondary);

`
const RemoveLinkButton = styled.button`
  background-color:rgb(187, 63, 63);
  color: var(--light-primary);
  padding: 1px;
  font-family: Poppins, sans-serif;
  font-size:20px;
`

const PublishButton = styled.button`
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  border-radius:7px;;
  
  text-align: left;
  padding-left: 7px;
  width: 120px;
  height: 40px;
  margin: 1rem .5rem;
  
  background-color: var(--mid-secondary);

`
const ErrorDiv = styled.div`
  border: red solid 2px;
  border-radius: 8px;
  font-size: 12px;
  margin-top: 10px;
  text-align: center;
  color: red;
`;

