import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav , Form, FormControl, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdSearch } from "react-icons/md";
import { AiOutlineUser, AiOutlineHistory, AiOutlineCalendar, AiOutlineLogout, AiOutlineHome } from "react-icons/ai";
import { API, setAuthToken } from "../config/api";

import '../styles/header.css';

import Logo from '../icons/Logo.svg'

const HeaderLogin = ({role}) => {
    const [data, setData] = useState(null);
    const listAs = localStorage.getItem('userListAs');

    const logOut = () => {
        const data = 'false';
        const status = 'Tenant';
        const token = null;
        localStorage.setItem('userLogin', data);
        localStorage.setItem('userListAs', status);
        localStorage.setItem('userToken', token);
        window.location.reload(true);
    };

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('userToken');
            setAuthToken(token);
            const user = await API.get("/user");
            const { data } = user.data;
            setData(data);
        } catch (error) {
            if (error.code === "ECONNABORTED") {
                console.log("Network Error!");
            } else {
                const { data, status } = error.response;
                console.log(data.message, status);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                            <Dropdown.Item as={Link} to="/profile"><AiOutlineUser className="home-icons"/>Profile</Dropdown.Item>
                            { role === "Owner" &&
                                <Dropdown.Item as={Link} to="/add-property"><AiOutlineHome className="home-icons"/>Add Property</Dropdown.Item>
                            }
                            { role === "Tenant" &&
                                <Dropdown.Item as={Link} to="/booking"><AiOutlineCalendar className="home-icons"/>My Booking</Dropdown.Item>
                            }
                            <Dropdown.Item as={Link} to="/history"><AiOutlineHistory className="home-icons"/>History</Dropdown.Item>
                            <Dropdown.Divider/>
                            <Dropdown.Item onClick={ logOut } href="/"><AiOutlineLogout className="home-icons"/>Logout</Dropdown.Item>
                            { data && 
                                <p className="login-text">
                                    Signed In As: 
                                    <br/> 
                                    {data.username}
                                    <br/><p/>
                                    <p>List As: {listAs}</p>
                                </p> 
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Navbar>
        </Container>
    );
}

export default HeaderLogin;