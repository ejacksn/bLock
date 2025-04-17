import React from 'react';
import Link  from 'next/link';
import { CiHome } from 'react-icons/ci'; // Importing a home icon from react-icons
import styled from 'styled-components';

const Home = () => {
  return (
    <Square href="/dashboard">
      <CiHome />
    </Square>
  );
};

const Square = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px; // Adjust the size as needed
  height: 50px; // Adjust the size as needed
  background-color: none; // Adjust the background color as needed
  color: white;
  border-radius: 4px; // Adjust for square or rounded corners
  text-decoration: none;
  
  svg {
    width:30px; // Adjust icon size as needed
    height: 30px; // Adjust icon size as needed
  }

  &:hover {
    background-color: #aaae7f; // Adjust hover effect as needed
  }
`;

export default Home;
