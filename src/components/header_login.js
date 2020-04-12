import React from 'react';
import { Container, Navbar, Nav , Form, FormControl, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdSearch } from "react-icons/md";
import { AiOutlineUser, AiOutlineHistory, AiOutlineCalendar, AiOutlineLogout, AiOutlineHome } from "react-icons/ai";

import '../styles/header.css';

import Logo from '../icons/Logo.svg'

const HeaderLogin = ({role}) => {
    const logOut = () => {
        const data = 'false';
        const status = 'Tenant';
        localStorage.setItem('userLogin', data);
        localStorage.setItem('userListAs', status);
        window.location.reload(true);
    };

    return (
        <Container fluid className="padding">
            <Navbar bg="white" className="justify-content-between" fixed="top">
                <Navbar.Brand><Link to="/"><img src={Logo} alt=""></img></Link></Navbar.Brand>

                <Form inline className="home-rect">
                    <FormControl type="text" placeholder="Search location" className="mr-sm-2 home-search-text" />
                    <div className="home-search-line"/>
                    <MdSearch className="home-icons"/>
                </Form>
                
                <Nav>
                    <Dropdown alignRight>
                        <Dropdown.Toggle variant="white" id="dropdown-basic" className="home-transparent">
                            <img src={ process.env.PUBLIC_URL + "../images/ProfPic.png" } alt=""></img>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="profile"><AiOutlineUser className="home-icons"/>Profile</Dropdown.Item>
                            { role === "Owner" &&
                                <Dropdown.Item href="add-property"><AiOutlineHome className="home-icons"/>Add Property</Dropdown.Item>
                            }
                            { role === "Tenant" &&
                                <Dropdown.Item href="booking"><AiOutlineCalendar className="home-icons"/>My Booking</Dropdown.Item>
                            }
                            <Dropdown.Item href="history"><AiOutlineHistory className="home-icons"/>History</Dropdown.Item>
                            <Dropdown.Divider/>
                            <Dropdown.Item onClick={ logOut } href="/"><AiOutlineLogout className="home-icons"/>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Navbar>
        </Container>
    );
}

export default HeaderLogin;