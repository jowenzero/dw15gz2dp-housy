import React from 'react';
import { Container, Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../icons/Logo.svg'

import '../styles/header_login.css';

import SearchIcon from '../icons/SearchIcon.svg'

const Header = () => {
    return (
        <Container fluid>
            <Navbar bg="white" className="justify-content-between">
                <Navbar.Brand><Link to="/"><img src={Logo} alt=""></img></Link></Navbar.Brand>

                <Form inline className="home-rect">
                    <FormControl type="text" placeholder="Search location" className="mr-sm-2 home-search-text" />
                    <div className="home-search-line"/>
                    <img src={SearchIcon} alt=""></img>
                </Form>
                
                <Nav>
                    <Link to="/">
                        <Button variant="dark" size="lg">Profile</Button>
                    </Link>
                </Nav>
            </Navbar>
        </Container>
    );
}

export default Header;