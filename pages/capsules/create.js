import React from 'react'
import PageSkeleton from '@/components/PageSkeleton'
import styled from 'styled-components'

function Create() {
  return (
    <PageSkeleton>
      <ContentPanel>
        <FormBox>

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
const InputBox = styled.input`
  background-color: var(--color2);
  color: var(--color4);
  border: none;
  border-radius: 0.5rem;
  padding: 1rem;
  width: 100%;
  margin-bottom: 1rem;
`
export default Create