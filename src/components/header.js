import React, { Component } from 'react';
import { Container, Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../svg/Logo.svg'

import '../styles/header.css';

import SearchIcon from '../svg/SearchIcon.svg'

class Header extends Component {

    render() {
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
                        <Button variant="white" size="lg" className="home-sign-in">Sign In</Button>
                        <Button variant="light" size="lg">Sign Up</Button>
                    </Nav>
                </Navbar>
            </Container>
        );
    }
}

export default Header;