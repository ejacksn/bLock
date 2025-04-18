import React from 'react'
import styled from 'styled-components'
import Navbar from '@/components/Dashboard/Navbar'

function PageSkeleton({children}) {
  return (
     <StructureDiv>
        <Navbar/>
        {children}
     </StructureDiv>
  )
}

export default PageSkeleton

const StructureDiv = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;

`;



