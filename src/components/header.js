import React from 'react';
import { Container, Navbar, Nav, Button, Form, FormControl, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdSearch } from "react-icons/md";
import { API } from "../config/api";

import '../styles/header.css';

import Logo from '../icons/Logo.svg'

const Header = () => {
    const [isSignInOpen, setIsSignInOpen] = React.useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = React.useState(false);

    const [userSignIn, setUserSignIn] = React.useState(null);
    const [passSignIn, setPassSignIn] = React.useState(null);

    const [fullName, setFullName] = React.useState(null);
    const [userSignUp, setUserSignUp] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [passSignUp, setPassSignUp] = React.useState(null);
    const [listAs, setListAs] = React.useState("Tenant");
    const [gender, setGender] = React.useState("Male");
    const [phone, setPhone] = React.useState(null);
    const [address, setAddress] = React.useState(null);

    const showSignIn = () => {
        setIsSignInOpen(true);
    };
    const hideSignIn = () => {
        setIsSignInOpen(false);
    };
    const showSignUp = () => {
        setIsSignUpOpen(true);
    };
    const hideSignUp = () => {
        setIsSignUpOpen(false);
    };

    const handleUserSignInChange = (event) => {
        setUserSignIn(event.target.value);
    };
    const handlePassSignInChange = (event) => {
        setPassSignIn(event.target.value);
    };

    
    const handleFullNameChange = (event) => {
        setFullName(event.target.value);
    };
    const handleUserSignUpChange = (event) => {
        setUserSignUp(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePassSignUpChange = (event) => {
        setPassSignUp(event.target.value);
    };
    const handleListChange = (event) => {
        setListAs(event.target.value);
    };
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const signIn = async () => {
        try {
            const user = await API.post("/signin", {
                username: userSignIn,
                password: passSignIn
            });
            const { data } = user.data;

            if (data.ListId === 1)
                localStorage.setItem('userListAs', 'Owner');
            else if (data.ListId === 2)
                localStorage.setItem('userListAs', 'Tenant');

            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userLogin', 'true');
            window.location.reload(true);
        } catch (error) {
            if (error.code === "ECONNABORTED") {
                console.log("Network Error!");
            } else {
                const { data, status } = error.response;
                console.log(data.message, status);
            }
            localStorage.setItem('userLogin', 'false');
        }
    };

    const signUp = async () => {
        try {
            let listNum = 2;
            if (listAs === "Owner")
                listNum = 1;
            else if (listAs === "Tenant")
                listNum = 2;

            const user = await API.post("/signup", {
                fullName: fullName,
                username: userSignUp,
                email: email,
                password: passSignUp,
                ListId: listNum,
                gender: gender,
                phone: phone,
                address: address
            });
            const { data } = user.data;

            if (listNum === 1)
                localStorage.setItem('userListAs', 'Owner');
            else if (listNum === 2)
                localStorage.setItem('userListAs', 'Tenant');

            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userLogin', 'true');
            window.location.reload(true);
        } catch (error) {
            if (error.code === "ECONNABORTED") {
                console.log("Network Error!");
            } else {
                const { data, status } = error.response;
                console.log(data.message, status);
            }
            localStorage.setItem('userLogin', 'false');
        }
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
                    <Button variant="white" size="lg" className="home-sign-in" onClick={showSignIn}>Sign In</Button>
                    <Button variant="dark" size="lg" onClick={showSignUp}>Sign Up</Button>
                </Nav>
            </Navbar>



            

            <Modal show={isSignInOpen} onHide={hideSignIn}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="signInUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={userSignIn} onChange={handleUserSignInChange} required/>
                        </Form.Group>

                        <Form.Group controlId="signInPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={passSignIn} onChange={handlePassSignInChange} required/>
                        </Form.Group>
                        <br/>
                        
                        <Button variant="primary" onClick={signIn} block>
                            Sign In
                        </Button>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <p onClick={() => {
                        hideSignIn();
                        showSignUp();
                    }}>Don't have an account? <b>Click Here!</b></p>
                </Modal.Footer>
            </Modal>





            <Modal show={isSignUpOpen} onHide={hideSignUp}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="signUpFullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" value={fullName} onChange={handleFullNameChange} required/>
                        </Form.Group>

                        <Form.Group controlId="signUpUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={userSignUp} onChange={handleUserSignUpChange} required/>
                        </Form.Group>

                        <Form.Group controlId="signUpEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={handleEmailChange} required/>
                        </Form.Group>

                        <Form.Group controlId="signUpPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={passSignUp} onChange={handlePassSignUpChange} required/>
                        </Form.Group>

                        <Form.Group controlId="signUpListAs">
                            <Form.Label>List As</Form.Label>
                            <Form.Control as="select" required
                                value={listAs}
                                onChange={handleListChange}
                            >
                                <option>Tenant</option>
                                <option>Owner</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="signUpGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" required
                                value={gender}
                                onChange={handleGenderChange}
                            >
                                <option>Male</option>
                                <option>Female</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="signUpPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="tel" value={phone} pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}" placeholder="Ex. 0812-3456-7890" onChange={handlePhoneChange} required/>
                        </Form.Group>

                        <Form.Group controlId="signUpAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control as="textarea" rows="3" value={address} onChange={handleAddressChange} required/>
                        </Form.Group>
                        <br/>
                        
                        <Button variant="primary" onClick={signUp} block>
                            Sign Up
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default Header;