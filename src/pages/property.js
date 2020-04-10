import React from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';

import '../styles/property.css';

import Login from '../components/login'
import Data from '../data/property.json';

const Property = () => {
    const [isBookOpen, setIsBookOpen] = React.useState(false);
    const [isSignInOpen, setIsSignInOpen] = React.useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = React.useState(false);

    const showBook = () => {
        setIsBookOpen(true);
    };

    const hideBook = () => {
        setIsBookOpen(false);
    };

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

    const verifyLogin = () => {
        if (localStorage.getItem('userLogin') === 'true') {
            showBook();
        }
        else {
            showSignIn();
        }
    }

    return (
        Data.map(item => (
            <div>
                <Login/>
                <div className="property-bg">
                    <Container fluid className="property-area">
                        <br/>
                        <Row>
                            <Col><img src={ process.env.PUBLIC_URL + item.picture1 } alt=""></img></Col>
                        </Row>
                        <Row>
                            <Col xs={4}><img src={ process.env.PUBLIC_URL + item.picture2 } alt=""></img></Col>
                            <Col xs={4}><img src={ process.env.PUBLIC_URL + item.picture3 } alt=""></img></Col>
                            <Col xs={4}><img src={ process.env.PUBLIC_URL + item.picture4 } alt=""></img></Col>
                        </Row>
                        <br/>
                        <h3 className="property-name">{ item.name }</h3>
                        <p className="property-price">{ item.price }</p>
                        <p className="property-location">{ item.location }</p>
                        <br/>
                        <p className="property-price">{ item.bedrooms }, { item.bathrooms }, { item.area }</p>
                        <br/>
                        <h3 className="property-desc-title">Description</h3>
                        <p className="property-description">{ item.description }</p>
                        <br/>
                        <Button variant="primary" size="lg" onClick={verifyLogin}>BOOK NOW</Button>
                        <br/><br/><br/><br/>
                    </Container>
                </div>




                <Modal show={isBookOpen} onHide={hideBook}>
                    <Modal.Header closeButton>
                        <Modal.Title>How long will you stay</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="bookCheckIn">
                                <Form.Label>Check-in</Form.Label>
                                <Form.Control type="date" required/>
                            </Form.Group>

                            <Form.Group controlId="bookCheckOut">
                                <Form.Label>Check-out</Form.Label>
                                <Form.Control type="date" required/>
                            </Form.Group>

                            <Button variant="primary" type="submit" block>
                                Order
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>




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
            </div>
        ))
    )
}

export default Property