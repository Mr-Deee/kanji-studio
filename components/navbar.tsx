// src/components/NavBar.tsx
import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background-color: #333;
  color: white;
  padding: 1rem;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <div>Logo</div>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </NavbarContainer>
  );
};

export default Navbar;
