import React from 'react';
import { Container, Navbar, Nav , Form, FormControl, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../styles/header.css';

import SearchIcon from '../icons/SearchIcon.svg'
import Logo from '../icons/Logo.svg'

const Header = () => {
    const logOut = () => {
        const data = 'false';
        localStorage.setItem('userLogin', data);
        window.location.reload(true);
    };

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
                    <Dropdown alignRight>
                        <Dropdown.Toggle variant="white" id="dropdown-basic" className="home-transparent">
                            <img src={ process.env.PUBLIC_URL + "../images/ProfPic.png" } alt=""></img>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="profile">Profile</Dropdown.Item>
                            <Dropdown.Item href="booking">My Booking</Dropdown.Item>
                            <Dropdown.Item href="history">History</Dropdown.Item>
                            <Dropdown.Divider/>
                            <Dropdown.Item onClick={ logOut } href="/">Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Navbar>
        </Container>
    );
}

export default Header;