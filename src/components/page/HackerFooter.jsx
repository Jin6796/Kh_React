import React from 'react';
import { Navbar } from 'react-bootstrap';

const HackerFooter = () => {
  return (
    <>
      <Navbar className="navbar cavbar-expand-sm justify-content-center" fixed="bottom" bg="dark" style={{color: "white"}}>
        해커캠프 Copyright &copy; 2022
      </Navbar>
    </>
  );
}

export default HackerFooter;