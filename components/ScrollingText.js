import React from 'react'
import styled from 'styled-components'

//scrolling text component that scrolls from right to left infinitely
export default function ScrollingText() {
  return (
    <ScrollDiv>
        <ul>
            <li>
                <span>bLock</span>
            </li>
            <li>
                <span>bLock</span>
            </li>
            <li>
                <span>bLock</span>
            </li>
            <li>
                <span>bLock</span>
            </li>
            
        </ul>
    </ScrollDiv>

  )
}

const ScrollDiv = styled.div`

    @keyframes scroll {
        
        
        100%{transform: translateX(-75%)};
        
    
        
    }
    font-size: 15rem;
    font-weight: 500;
    font-family: poppins;
    color: #D0D6B3;
    padding-block: 8px;
    border-block
    display: flex;
    overflow: hidden;
    user-select: none;
    white-space: nowrap;
    width: 100%;

    ul {
        list-style: none;
        display: flex;
        justify-content: space-between;
        gap: 2rem;
        flex-shrink: 0;
        min-width: 100%;
        animation: scroll 10s alternate infinite;
        overflow: visible; 

    }
`
