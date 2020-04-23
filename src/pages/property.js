import React from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoIosBed } from 'react-icons/io';
import { FaBath } from 'react-icons/fa';
import { API } from "../config/api";

import '../styles/property.css';

import Login from '../components/login';
import Data from '../data/property.json';

const Property = (props) => {
    const { match } = props;
    let {id} = match.params;
    const property = Data[id - 1];

    const [isBookOpen, setIsBookOpen] = React.useState(false);

    const showBook = () => {
        setIsBookOpen(true);
    };
    const hideBook = () => {
        setIsBookOpen(false);
    };

    const [isSignInOpen, setIsSignInOpen] = React.useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = React.useState(false);
    const [loginFail, setLoginFail] = React.useState(false);

    const [userSignIn, setUserSignIn] = React.useState(null);
    const [passSignIn, setPassSignIn] = React.useState(null);
    const [user, setUser] = React.useState({});

    const showSignIn = () => {
        setIsSignInOpen(true);
    };
    const hideSignIn = () => {
        setUserSignIn(null);
        setPassSignIn(null);
        setIsSignInOpen(false);
    };
    const showSignUp = () => {
        setIsSignUpOpen(true);
    };
    const hideSignUp = () => {
        setUser({});
        setIsSignUpOpen(false);
    };
    const showLoginFail = () => {
        setLoginFail(true);
    };
    const hideLoginFail = () => {
        setLoginFail(false);
    };

    const handleUserSignInChange = (event) => {
        setUserSignIn(event.target.value);
    };
    const handlePassSignInChange = (event) => {
        setPassSignIn(event.target.value);
    };

    const handleUserChange = (event) => {
        const { data } = user;
        setUser({
            data: { ...data, [event.target.name]: event.target.value },
        });
    };

    const signIn = async (event) => {
        try {
            event.preventDefault();
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
            hideLoginFail();
            window.location.reload(true);
        } catch (error) {
            if (error.code === "ECONNABORTED") {
                console.log("Network Error!");
            } else {
                const { data, status } = error.response;
                console.log(data.message, status);
            }
            localStorage.setItem('userLogin', 'false');
            showLoginFail();
        }
    };

    const signUp = async (event) => {
        try {
            event.preventDefault();
            const { data } = user;
            let listNum = 2;
            if (data.listAs === "Owner")
                listNum = 1;
            else if (data.listAs === "Tenant")
                listNum = 2;

            const newUser = await API.post("/signup", {
                fullName: data.fullName,
                username: data.username,
                email: data.email,
                password: data.password,
                ListId: listNum,
                gender: data.gender,
                phone: data.phone,
                address: data.address
            });
            const newData = newUser.data.data;

            if (listNum === 1)
                localStorage.setItem('userListAs', 'Owner');
            else if (listNum === 2)
                localStorage.setItem('userListAs', 'Tenant');

            localStorage.setItem('userToken', newData.token);
            localStorage.setItem('userLogin', 'true');
            setUser({});
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

    const verifyLogin = () => {
        if (localStorage.getItem('userLogin') === 'true') {
            showBook();
        }
        else {
            showSignIn();
        }
    }

    return (
        <div>
            <Login/>
            <div className="property-bg">
                <Container fluid className="property-area">
                    <br/>
                    <Row>
                        <Col><img src={ process.env.PUBLIC_URL + property.picture1 } alt=""></img></Col>
                    </Row>
                    <p/>
                    <Row>
                        <Col xs={4}><img src={ process.env.PUBLIC_URL + property.picture2 } alt=""></img></Col>
                        <Col xs={4}><img src={ process.env.PUBLIC_URL + property.picture3 } alt="" className="property-pic"></img></Col>
                        <Col xs={4}><img src={ process.env.PUBLIC_URL + property.picture4 } alt="" className="property-pic2"></img></Col>
                    </Row>
                    <br/>
                    <h3 className="property-name">{ property.name }</h3>
                    <Row>
                        <Col xs={8}>
                            <p className="property-price">{ property.price }</p>
                            <p className="property-location">{ property.location }</p>
                        </Col>
                        <Col xs={4}>
                            <Row>
                                <Col xs={4}>
                                    <p className="property-location property-bold">Bedrooms</p>
                                    <p className="property-bold-number">{ property.bedrooms } <IoIosBed/></p>
                                </Col>
                                <Col xs={4}>
                                    <p className="property-location property-bold">Bathrooms</p>
                                    <p className="property-bold-number">{ property.bathrooms } <FaBath/></p>
                                </Col>
                                <Col xs={4}>
                                    <p className="property-location property-bold">Area</p>
                                    <p className="property-bold-number">{ property.area } </p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <br/>
                    <h3 className="property-desc-title">Description</h3>
                    <p className="property-description">{ property.description }</p>
                    <br/>
                    { (localStorage.getItem('userListAs') === 'Tenant' || localStorage.getItem('userLogin') === 'false') &&
                        <Button variant="primary" size="lg" onClick={verifyLogin}>BOOK NOW</Button>
                    }
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
                    
                        <Button variant="primary" type="submit" as={Link} to="/booking" block>
                            Order
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>




            <Modal show={isSignInOpen} onHide={() => {
                        hideSignIn();
                        hideLoginFail();
                    }}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={signIn}>
                        <Form.Group controlId="signInUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" required
                                value={userSignIn} 
                                onChange={handleUserSignInChange} 
                            />
                        </Form.Group>

                        <Form.Group controlId="signInPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required
                                value={passSignIn} 
                                onChange={handlePassSignInChange} 
                            />
                        </Form.Group>

                        { loginFail === true &&
                            <p style={{ color: 'red' }}>Login Failed</p>
                        }
                        { loginFail === false &&
                            <br/>
                        }
                        
                        <Button variant="primary" type="submit" block>
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
                    <Form onSubmit={signUp}>
                        <Form.Group controlId="signUpFullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" required
                                name="fullName" 
                                value={ user.fullName && user.fullName } 
                                onChange={handleUserChange} 
                            />
                        </Form.Group>

                        <Form.Group controlId="signUpUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" required
                                name="username" 
                                value={ user.username && user.username } 
                                onChange={handleUserChange} 
                            />
                        </Form.Group>

                        <Form.Group controlId="signUpEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required
                                name="email" 
                                value={ user.email && user.email } 
                                onChange={handleUserChange} 
                            />
                        </Form.Group>

                        <Form.Group controlId="signUpPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required
                                name="password" 
                                value={ user.password && user.password } 
                                onChange={handleUserChange} 
                            />
                        </Form.Group>

                        <Form.Group controlId="signUpListAs">
                            <Form.Label>List As</Form.Label>
                            <Form.Control as="select" required
                                name="listAs" 
                                value={ user.listAs } 
                                onChange={handleUserChange}
                            >
                                <option>Tenant</option>
                                <option>Owner</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="signUpGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" required
                                name="gender" 
                                value={ user.gender } 
                                onChange={handleUserChange}
                            >
                                <option>Male</option>
                                <option>Female</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="signUpPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="tel" required
                                name="phone" 
                                value={ user.phone && user.phone }  
                                pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}" 
                                placeholder="Ex. 0812-3456-7890" 
                                onChange={handleUserChange} 
                            />
                        </Form.Group>

                        <Form.Group controlId="signUpAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control  as="textarea" required
                                name="address"
                                rows="3" 
                                value={ user.address && user.address } 
                                onChange={handleUserChange} 
                            />
                        </Form.Group>
                        <br/>
                        
                        <Button variant="primary" type="submit" block>
                            Sign Up
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Property;