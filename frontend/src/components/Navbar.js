import React from 'react';
import { Link, useLocation } from "react-router-dom";
import '../App.css';
import styled from 'styled-components';
import logo from './Logo.png';

function Navbar() {
  let location = useLocation();
  if (location.pathname !== "/Login"){
    return (
      <Nav>
        <NavMenu>
          <NavLink to="/">
            <img src={logo} width={50} height={50} />
          </NavLink>
          <NavLink to="/">
            Home
          </NavLink>
          <NavLink to="/Clubs">
            Clubs
          </NavLink>
          <NavLink to="/Events">
            Events
          </NavLink>
          <NavLink to="/Calender">
            Calander
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/Login'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    )
  }
}


export default Navbar;

//  >>styles are written here<<

export const Nav = styled.nav`
  background: #000020;
  height: 70px;
  display: flex;
  justify-content: space-between;
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
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

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  align: right;
  margin-right: 24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
  
export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #40a0ff;
  padding: 10px 22px;
  color: #000000;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #e0e0e0;
    color: #2020ff;
  }
`;