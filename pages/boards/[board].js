import React, { use } from 'react'
import Navbar from '@/components/Dashboard/Navbar'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { GlobalStyle } from '../_app'

import { getBoard } from '@/backend/Database'

import { updateViewCount } from '@/backend/viewCount'

function Board() {

    const [board, setBoard] = useState(null);
    const [isLoading, setIsLoading] = useState(true); //variable to use while board is loadign

    const router = useRouter()
    const boardId = router.query.board;//get id to use from url
    const [views, setViews] = useState(0); //state variable to hold view count


    const fetchBoard = async () => {
        
        const board = await getBoard(boardId);

        if (board){


        setBoard(board);

        // Call API to increment and get the updated view count
        const viewData = await updateViewCount(boardId);
        if (viewData) {
            setViews(viewData.VIEWCOUNT || 0); //set view variable to view count from api
        }

    }
        setIsLoading(false); //board is fettched so no longer loading
        
    }

    useEffect(() => {//fetch the board specifically based on the board id in the url
        if(!boardId){ //if there isn't a board id don't fetch anything
            return;
        }

        fetchBoard();
    },[boardId]);

    

  return (
    <>
        <Navbar/>
        <BoardPageContainer>
            {isLoading ? <h1>Loading...</h1> : null /*display loading message*/} 
            {(!board)? <h1>Board not found</h1> : ( /*display message if board is not found*/ 
            <>
            <BoardTitle>{board.title}</BoardTitle>
            <span>
                <h2>Author: {board.ownerName}</h2>
                <h3>Views: {views}</h3>
            </span>

            <BoardContent>
                {board.links.map((link, index) => (
                    <BoardItem key={index}>
                        <a href={link.url} target="_blank">{link.url}</a> {/* links open in neew tab*/}
                        <BoardDescription>{link.description}</BoardDescription>
                    </BoardItem>
                ))}
            </BoardContent>

            </>
            )}




        </BoardPageContainer>

        

        
    </>
  )
}

export default Board

const BoardPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #061003;
  width: 100vw;
  height: 100vh;
  margin: 0%;
  overflow: scroll;
  align-items: left;

    span{
        margin-left: 20px;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        align-items: center;
        font-family: 'Poppins', sans-serif;



    h2{
        color: var(--mid-secondary);
        font-size: 4 rem;

    }
    h3{
        margin-left: 20px;
        color: var(--mid-secondary);
        font-size: 3 rem;
    }
`

const BoardTitle = styled.h1`
    font-size: 7rem;
    font-family: 'Poppins', sans-serif;
    color: var(--light-primary);
    margin-left: .5rem;
    margin-bottom:0;
    padding:none;
    
`
const BoardContent = styled.ul`
    margin-left: 1.5rem;
    border: 2px var(--light-primary) solid;
    border-radius: 7px;
`
const BoardItem = styled.li`
border: 2px var(--mid-secondary) solid;
width: 80%;
margin: 1rem;
border-radius: 9px;

    a{
        color: var(--dark-primary);
        font-size: 1.5rem;
        
        display: block;
        padding: 1rem;
        background-color: var(--mid-secondary);
        border-radius: 7px 7px 0 0;
        font-family: 'Poppins', sans-serif;
    }


`
const BoardDescription = styled.p`
    background-color: var(--dark-primary);
    font-family: 'Poppins', sans-serif;
    color: var(--light-primary);
    padding: .7rem;
`