import React from 'react';
import { Container, Navbar, Nav, Button, Form, FormControl, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdSearch } from "react-icons/md";

import '../styles/header.css';

import Logo from '../icons/Logo.svg'

const Header = () => {
    const [isSignInOpen, setIsSignInOpen] = React.useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = React.useState(false);

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

    const signIn = () => {
        const data = 'true';
        localStorage.setItem('userLogin', data);
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
                            <Form.Control type="text" required/>
                        </Form.Group>

                        <Form.Group controlId="signInPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required/>
                        </Form.Group>
                        <br/>
                        
                        <Button variant="primary" type="submit" onClick={signIn} block>
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
                            <Form.Control type="text" required/>
                        </Form.Group>

                        <Form.Group controlId="signUpUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" required/>
                        </Form.Group>

                        <Form.Group controlId="signUpEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required/>
                        </Form.Group>

                        <Form.Group controlId="signUpPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required/>
                        </Form.Group>

                        <Form.Group controlId="signUpListAs">
                            <Form.Label>List As</Form.Label>
                            <Form.Control as="select" required>
                                <option>Tenant</option>
                                <option>Owner</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="signUpGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" required>
                                <option>Male</option>
                                <option>Female</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="signUpPhone" required>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="tel" pattern="[0-9]{12}" placeholder="Ex. 081234567890"/>
                        </Form.Group>

                        <Form.Group controlId="signUpAddress" required>
                            <Form.Label>Address</Form.Label>
                            <Form.Control as="textarea" rows="3"/>
                        </Form.Group>
                        <br/>
                        
                        <Button variant="primary" type="submit" onClick={signIn} block>
                            Sign Up
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default Header;