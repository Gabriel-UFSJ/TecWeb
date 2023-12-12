import React from 'react';
import { useNavigate } from 'react-router-dom';
import UniLogo from '../../assets/Logo.png';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export function Header() {

  const isAuthenticated = localStorage.getItem('token');

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <img
          src={UniLogo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="UniLogo"
        />
        <Navbar.Brand href="/">Uni-Eventos</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '200px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
          <div className='login'>
            {isAuthenticated ? (
              <div>
                <Button style={{ marginRight: '8px' }} variant="outline-success" onClick={logout}>Logout</Button>
                <Button style={{ marginLeft: '8px' }} className='ml-4' variant="outline-success" onClick={(e) => navigate('/EventRegister')}>Criar Evento</Button>
              </div>
            ) : (
              <Button className='ml-1' variant="outline-success" onClick={(e) => navigate('/login')}>Login</Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}