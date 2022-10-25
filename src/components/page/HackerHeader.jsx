import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logout2 } from '../service/authLogic';
import { useSelector } from "react-redux";

// 헤더에는 구글 인증(유지)을 위해 authLogic이 필요할 것

const HackerHeader = ({userId, onLogout}) => {
  const auth = useSelector((store) => store.auth)
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
              <Link to="/board" className="nav-link">DB게시판</Link>
              <Link to="/notice" className="nav-link">공지사항</Link>
              <Link to="/hackernews/:userId" className="nav-link">해커뉴스</Link>
              <Link to="/dept" className="nav-link">부서관리</Link>
              <Link to="/youtube" className="nav-link">유튜브</Link>
            </Nav>
            {onLogout && (<Button variant="primary" onClick={()=>{logout2(auth); window.location.reload();}}>Logout</Button>)}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default HackerHeader;