import React from 'react';
import { Navbar } from '..' ;
import './Header.css';
import LibraryLogo from '../../../images/library.jpg'
import styled from 'styled-components';

function Header (props) {
  
  return (
    <StyledHeader>
    <section className="header">
      <section className="header-top">
        <section className="header-top__logo">
          <a href="/" className="header-logo">
          <img src={LibraryLogo} alt='logo' /></a>
        </section>
        <section className="header-top__navbar">
          <section className="header-top__navigation">
            <Navbar {...props}/>
          </section>
          <hr className="header-top__seperator" />
        </section>
      </section>
    </section>
    </StyledHeader>
  )
}

const StyledHeader = styled.div`
  img{
    width: 100px;
    height: 100px;
  }
`

export default Header;