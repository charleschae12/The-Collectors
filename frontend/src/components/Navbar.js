import React from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import styled from 'styled-components';

function Navbar() {
  return (
    <Nav>
      <NavMenu>
        <NavLink to="/">
          Home
        </NavLink>
        <NavLink to="/Clubs">
          Clubs
        </NavLink>
      </NavMenu>
    </Nav>
  )
}


export default Navbar

export const Nav = styled.nav`
  background: #000000;
  height: 70px;
  display: flex;
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  };
`;

export const NavLink = styled(Link)`
  color: #f0f0f0;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #000000;
  }
`;