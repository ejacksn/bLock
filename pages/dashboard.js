import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Navbar from '@/components/Dashboard/Navbar'
import { useStateContext } from '@/context/StateContext'
import { useRouter } from 'next/router'



import { getBoardsByUser, deleteBoard } from '@/backend/Database'
import Board from './boards/[board]'
import Create from './boards/create'


const Dashboard = () => {

  const { user } = useStateContext() ; 
  const [boards, setBoards] = useState([]); //list of boards to display
  const [isLoading, setIsLoading] = useState(true); //variable to use while boards are loadign

  const router = useRouter();

  const fetchBoards = async () => {

    if (user){
      setIsLoading(true); //set loading to true while fetching boards
      
      const userBoards = await getBoardsByUser(user.uid);
      console.log("user's boards retrieved")
      
      setBoards(userBoards); //set state variable for boards so can render
      setIsLoading(false); //set loading to false after boards are fetched
    }

  }

  const handleDelete = async (boardId) => {
    try{
      await deleteBoard(boardId);
      fetchBoards(); //refetch boards after deleting one to render the updated list
    }
    catch(error){
      console.error("Error deleting board", error);
    }
  }
    



  useEffect(() => { //useffect to check if user is logged in and fetch boards if so
    if(user===null){
      router.push('/')
    }else{
      fetchBoards()

    }
  }, user)






  return (
    <>
    <Navbar/>
    <Section>
      <TopHeader>
        Dashboard
      </TopHeader>
      <Link href="/boards/create">
        <NewBoardButton>Create Board</NewBoardButton>
      </Link> {/*link to create board*/}
      <UserBoards>
        {boards.map(board=>(
            <BoardCard key={board.id}>
            <BoardTitle>{board.data.title}</BoardTitle>
            <div>
            <ViewButton href={`/boards/${board.id}`}>View</ViewButton> {/*link to view board*/}
            <DeleteButton onClick={()=>handleDelete(board.id)}>Delete</DeleteButton> {/*button to delete board*/}
            </div>

            </BoardCard>






        )
        
        
        
        
        
        
        
        ) //end map
        }
      </UserBoards>

    </Section>
    </>
  )
}


//STYLED COMPONENTS
const Section = styled.section`
width: 100%;
height: 100vh;
display: flex;
flex-direction: column;
justify-content: flex-start;
background-color: var(--dark-primary);
align-items: left;
`



const TopHeader = styled.h1`
font-size: 4rem;
display: flex;
font-family: 'Poppins', sans-serif;
color: var(--light-primary);
margin-left: 20px;


`
const UserBoards = styled.div`
margin-left: 20px;
display: flex;
flex-direction: column;
white-space: nowrap;
overflow-x: none;
overflow-y: scroll;
height: 100%;
width: 70%;

`
const BoardCard = styled.div`
border: 2px solid var(--mid-secondary);
border-radius: 8px;
display: flex;
flex-direction: row;
justify-content: flex-start;

div{
  display: flex;
  margin-left: auto;
}

`
const BoardTitle = styled.h2`
color: var(--light-primary);
font-size: 2rem;
`
const ViewButton = styled.a`
width: 100px;
display: flex;
justify-content: center;
background-color: var(--light-primary);
color: var(--dark-primary);
padding: 5px;
text-decoration: none;
font-family: 'Poppins', sans-serif;
border-radius: 5px;

&:hover{
  background-color: var(--mid-secondary);
}
`
const DeleteButton = styled.button`
background-color: red;
justify-self: flex-end;
font-family: 'Poppins', sans-serif;
font-size: 1rem;
padding: 5px;
border-radius: 5px;
border-color: none;

&:hover{
  background-color: darkred;
}
`
const NewBoardButton = styled.button`
  margin-left: 1rem;
  margin-bottom: 1rem;
  padding: 10px 20px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  border-radius:7px;
  background-color: var(--mid-secondary);
  color: var(--dark-primary);
`


export default Dashboard