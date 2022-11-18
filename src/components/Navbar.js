import React, { useState, useEffect } from 'react'
import logo from './files/logo.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./styles.css"

function NavbarComp(){
    const [admin, setAdmin] = useState(false);
    const [id, setId] = useState("");

    useEffect(() => {
        let funcionario = localStorage.getItem("funcionario");
        setId(localStorage.getItem("codigo"));
        if (funcionario === "true") {
            setAdmin(true)
        }
    }, [admin])

    const handleLogout = () => {
        localStorage.removeItem("login")
        localStorage.removeItem("senha")
        localStorage.removeItem("codigo")
        localStorage.removeItem("funcionario")
    }

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
                        height="80" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ marginRight:'20px' }} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home"
                            style={{ fontSize: 'x-large', 
                                     color: 'black', 
                                     fontWeight: 'bolder',
                                     fontFamily: 'serif' }}>
                                        Home
                        </Nav.Link>
                        {admin && (
                            <Nav.Link href="/users"
                                style={{ fontSize: 'x-large', 
                                    color: 'black', 
                                    fontWeight: 'bolder',
                                    fontFamily: 'serif' }}>
                                Usuários
                            </Nav.Link>
                        )}
                        {!admin && (
                            <Nav.Link href={`/users/formulario/${id}`}
                                style={{ fontSize: 'x-large', 
                                    color: 'black', 
                                    fontWeight: 'bolder',
                                    fontFamily: 'serif' }}>
                                Dados Pessoais
                            </Nav.Link>
                        )}
                        <Nav.Link href="/" onClick={handleLogout}
                            style={{ fontSize: 'x-large', 
                                color: 'black', 
                                fontWeight: 'bolder',
                                fontFamily: 'serif' }}>
                            Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarComp
