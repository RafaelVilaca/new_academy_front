import React from 'react'
import logo from './files/logo.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./styles.css"

function NavbarComp(){
    return (
        <Navbar style={{
            position: 'fixed',
            left: '0px',
            right: '0px',
            width: '100%',
            top: '0px',
            zIndex: '10'
        }} expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <img src={logo}
                        alt="Logo"
                        width="100"
                        height="80"
                        href="/" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ marginRight:'20px' }} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/"
                            style={{ fontSize: 'x-large', 
                                     color: 'black', 
                                     fontWeight: 'bolder',
                                     fontFamily: 'serif' }}>
                                        Home
                        </Nav.Link>
                        <Nav.Link href="/users"
                            style={{ fontSize: 'x-large', 
                                     color: 'black', 
                                     fontWeight: 'bolder',
                                     fontFamily: 'serif' }}>
                                        Usuários
                        </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarComp
