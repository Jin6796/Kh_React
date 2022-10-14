import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// 헤더에는 구글 인증(유지)을 위해 authLogic이 필요할 것

const HackerHeader = ({userId, onLogout}) => {
// const HackerHeader = (props) => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">해커캠프</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/hackernews" className="nav-link">해커뉴스</Link>
              <Link to="/dept" className="nav-link">부서관리</Link>
              <Link to="/youtube" className="nav-link">유튜브</Link>
            </Nav>
            {onLogout && (<Button variant="primary" onClick={onLogout}>Logout</Button>)}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default HackerHeader;