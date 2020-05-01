import React, { useEffect, useCallback } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { IoIosBed } from 'react-icons/io';
import { FaBath } from 'react-icons/fa';
import { API, setAuthToken } from "../config/api";
import { useDispatch, useSelector } from "react-redux";
import { getHouses } from "../_actions/house";
import Markdown from 'markdown-to-jsx';

import '../styles/property.css';

import Login from '../components/login';

const Property = (props) => {
    const users = useSelector(state => state.user.data);
    const houses = useSelector(state => state.house.data);
    const loading = useSelector(state => state.house.loading);
    const error = useSelector(state => state.house.error);
    const dispatch = useDispatch();

    const initFetch = useCallback(() => {
        dispatch(getHouses());
    }, [dispatch]);
    
    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const { match } = props;
    let {id} = match.params;
    const property = houses[id - 1];

    const [isBookOpen, setIsBookOpen] = React.useState(false);
    const [isBookOpen2, setIsBookOpen2] = React.useState(false);
    const [isBookOpen3, setIsBookOpen3] = React.useState(false);
    const [isBookPost, setIsBookPost] = React.useState(false);

    const showBook = () => {
        setIsBookOpen(true);
    };
    const hideBook = () => {
        setIsBookOpen(false);
    };
    const showBook2 = () => {
        setIsBookOpen2(true);
    };
    const hideBook2 = () => {
        setIsBookOpen2(false);
    };
    const showBook3 = () => {
        setIsBookOpen3(true);
    };
    const hideBook3 = () => {
        setIsBookOpen3(false);
    };
    const showBookPost = () => {
        setIsBookPost(true);
    };

    const [isSignInOpen, setIsSignInOpen] = React.useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = React.useState(false);
    const [loginFail, setLoginFail] = React.useState(false);

    const [userSignIn, setUserSignIn] = React.useState(null);
    const [passSignIn, setPassSignIn] = React.useState(null);
    const [user, setUser] = React.useState({});

    const [checkIn, setCheckIn] = React.useState(null);
    const [checkOut, setCheckOut] = React.useState(null);
    const [amountMonth, setAmountMonth] = React.useState(1);
    const [amountYear, setAmountYear] = React.useState(1);
    const [attachment, setAttachment] = React.useState("bca.id");
    const [bookFail, setBookFail] = React.useState(false);

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
    const showBookFail = () => {
        setBookFail(true);
    };
    const hideBookFail = () => {
        setBookFail(false);
    };


    const handleUserSignInChange = (event) => {
        setUserSignIn(event.target.value);
    };
    const handlePassSignInChange = (event) => {
        setPassSignIn(event.target.value);
    };

    const handleCheckInChange = (event) => {
        setCheckIn(event.target.value);
    };
    const handleCheckOutChange = (event) => {
        setCheckOut(event.target.value);
    };
    const handleAmountMonthChange = (event) => {
        setAmountMonth(event.target.value);
    };
    const handleAmountYearChange = (event) => {
        setAmountYear(event.target.value);
    };
    const handleAttachmentChange = (event) => {
        setAttachment(event.target.value);
    };

    const handleUserChange = (event) => {
        const { data } = user;
        setUser({
            data: { ...data, [event.target.name]: event.target.value },
        });
    };

    const formatNumber = (num) => {
        return Intl.NumberFormat('de-DE').format(num);
    }

    const signIn = async (event) => {
        try {
            event.preventDefault();
            const user = await API.post("/signin", {
                username: userSignIn,
                password: passSignIn
            });
            const { data } = user.data;

            if (data.listId === 1)
                localStorage.setItem('userListAs', 'Owner');
            else if (data.listId === 2)
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
                listId: listNum,
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

    const postBooking = async (event) => {
        try {
            event.preventDefault();
            const token = localStorage.getItem('userToken');
            setAuthToken(token);
            const oneDay = 1000 * 60 * 60 * 24;
            const currentDate = new Date();
            let checkInDate;
            let checkOutDate;
            let diff;
            let total;

            if (property.typeRent === "Day") {
                checkInDate = new Date(checkIn);
                checkOutDate = new Date(checkOut);
                diff = Math.ceil(checkOutDate.getTime() - checkInDate.getTime()) / (oneDay);
                total = property.price * diff;
            }
            else if (property.typeRent === "Month") {
                checkInDate = new Date(checkIn);
                checkOutDate = new Date(checkIn);
                checkOutDate.setDate(checkOutDate.getDate() + (amountMonth * 31));
                diff = amountMonth;
                total = property.price * amountMonth;
            }
            else if (property.typeRent === "Year") {
                checkInDate = new Date(checkIn);
                checkOutDate = new Date(checkIn);
                checkOutDate.setDate(checkOutDate.getDate() + (amountYear * 365));
                diff = amountYear;
                total = property.price * amountYear;
            }

            const todayDiff = Math.ceil(checkInDate.getTime() - currentDate.getTime()) / (oneDay);

            if (diff >= 1 && todayDiff >= -1) {
                await API.post("/transaction", {
                    checkin: checkInDate,
                    checkout: checkOutDate,
                    houseId: property.id,
                    total: total,
                    status: "Waiting Payment",
                    attachment: attachment,
                    duration: diff,
                    userId: users.id,
                    ownerId: property.userId,
                });
                hideBookFail();
                showBookPost();
            }
            else 
            {
                showBookFail();
            }
        } catch (error) {
            if (error.code === "ECONNABORTED") {
                console.log("Network Error!");
            } else {
                const { data, status } = error.response;
                console.log(data.message, status);
            }
        }
    };

    const verifyLogin = () => {
        if (localStorage.getItem('userLogin') === 'true') {
            if (property.typeRent === "Day")
                showBook();
            else if (property.typeRent === "Month")
                showBook2();
            else if (property.typeRent === "Year")
                showBook3();
        }
        else {
            showSignIn();
        }
    }

    return (
        <div>
            <Login/>
            { localStorage.getItem("userListAs") === "Owner"&&
                <Redirect to="/"/>
            }

            { isBookPost &&
                <Redirect to="/booking"/>
            }

            { (!loading && !error && property) &&
                <div className="property-bg">
                    <Container fluid className="property-area">
                        <br/>
                        <Row>
                            <Col><img src={ process.env.PUBLIC_URL + "../images/Property1.png" } alt=""></img></Col>
                        </Row>
                        <p/>
                        <Row>
                            <Col xs={4}><img src={ process.env.PUBLIC_URL + "../images/Property2.png" } alt=""></img></Col>
                            <Col xs={4}><img src={ process.env.PUBLIC_URL + "../images/Property3.png" } alt="" className="property-pic"></img></Col>
                            <Col xs={4}><img src={ process.env.PUBLIC_URL + "../images/Property4.png" } alt="" className="property-pic2"></img></Col>
                        </Row>
                        <br/>
                        <h3 className="property-name">{ property.name }</h3>
                        <Row>
                            <Col xs={8}>
                                <p className="property-price">Rp. { formatNumber(property.price) } / { property.typeRent }</p>
                                <p className="property-location">{ property.address }</p>
                            </Col>
                            <Col xs={4}>
                                <Row>
                                    <Col xs={4}>
                                        <p className="property-location property-bold">Bedrooms</p>
                                        <p className="property-bold-number">{ property.bedRoom } <IoIosBed/></p>
                                    </Col>
                                    <Col xs={4}>
                                        <p className="property-location property-bold">Bathrooms</p>
                                        <p className="property-bold-number">{ property.bathRoom } <FaBath/></p>
                                    </Col>
                                    <Col xs={4}>
                                        <p className="property-location property-bold">Area</p>
                                        <p className="property-bold-number">{ formatNumber(property.area) } ft</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <br/>
                        <h3 className="property-desc-title">Description</h3>
                        <p className="property-description">
                            <Markdown options={{ forceBlock: true }}>
                                { property.description }
                            </Markdown>
                        </p>
                        <br/>
                        { (localStorage.getItem('userListAs') === 'Tenant' || localStorage.getItem('userLogin') === 'false') &&
                            <Button variant="primary" size="lg" onClick={verifyLogin}>BOOK NOW</Button>
                        }
                        <br/><br/><br/><br/>
                    </Container>
                </div>
            }

            <Modal show={isBookOpen} onHide={hideBook}>
                <Modal.Header closeButton>
                    <Modal.Title>How long will you stay</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={postBooking}>
                        <Form.Group controlId="bookCheckIn">
                            <Form.Label>Check-in</Form.Label>
                            <Form.Control type="date" onChange={handleCheckInChange} required/>
                        </Form.Group>

                        <Form.Group controlId="bookCheckOut">
                            <Form.Label>Check-out</Form.Label>
                            <Form.Control type="date" onChange={handleCheckOutChange} required/>
                        </Form.Group>

                        <Form.Group controlId="bookTransfer">
                            <Form.Label>Transfer via</Form.Label>
                            <Form.Control as="select" required
                                value={ attachment } 
                                onChange={handleAttachmentChange}
                            >
                                <option value="bca.id">BCA</option>
                                <option value="bni.id">BNI</option>
                                <option value="permata.id">Permata</option>
                                <option value="mandiri.id">Mandiri</option>
                                <option value="citibank.id">Citibank</option>
                            </Form.Control>
                        </Form.Group>

                        { bookFail === true &&
                            <p style={{ color: 'red' }}>Book Date Invalid!</p>
                        }
                    
                        <Button variant="primary" type="submit" block>
                            Order
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={isBookOpen2} onHide={hideBook2}>
                <Modal.Header closeButton>
                    <Modal.Title>How long will you stay</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={postBooking}>
                        <Form.Group controlId="bookCheckIn">
                            <Form.Label>Check-in</Form.Label>
                            <Form.Control type="date" onChange={handleCheckInChange} required/>
                        </Form.Group>

                        <Form.Group controlId="bookCheckOut">
                            <Form.Label>Amount of Month(s)</Form.Label>
                            <Form.Control type="number" value={ amountMonth } onChange={handleAmountMonthChange} required/>
                        </Form.Group>

                        <Form.Group controlId="bookTransfer">
                            <Form.Label>Transfer via</Form.Label>
                            <Form.Control as="select" required
                                value={ attachment } 
                                onChange={handleAttachmentChange}
                            >
                                <option value="bca.id">BCA</option>
                                <option value="bni.id">BNI</option>
                                <option value="permata.id">Permata</option>
                                <option value="mandiri.id">Mandiri</option>
                                <option value="citibank.id">Citibank</option>
                            </Form.Control>
                        </Form.Group>

                        { bookFail === true &&
                            <p style={{ color: 'red' }}>Book Date Invalid!</p>
                        }
                    
                        <Button variant="primary" type="submit" block>
                            Order
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={isBookOpen3} onHide={hideBook3}>
                <Modal.Header closeButton>
                    <Modal.Title>How long will you stay</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={postBooking}>
                        <Form.Group controlId="bookCheckIn">
                            <Form.Label>Check-in</Form.Label>
                            <Form.Control type="date" onChange={handleCheckInChange} required/>
                        </Form.Group>

                        <Form.Group controlId="bookCheckOut">
                            <Form.Label>Amount of Year(s)</Form.Label>
                            <Form.Control type="number" value={ amountYear } onChange={handleAmountYearChange} required/>
                        </Form.Group>

                        <Form.Group controlId="bookTransfer">
                            <Form.Label>Transfer via</Form.Label>
                            <Form.Control as="select" required
                                value={ attachment } 
                                onChange={handleAttachmentChange}
                            >
                                <option value="bca.id">BCA</option>
                                <option value="bni.id">BNI</option>
                                <option value="permata.id">Permata</option>
                                <option value="mandiri.id">Mandiri</option>
                                <option value="citibank.id">Citibank</option>
                            </Form.Control>
                        </Form.Group>

                        { bookFail === true &&
                            <p style={{ color: 'red' }}>Book Date Invalid!</p>
                        }
                    
                        <Button variant="primary" type="submit" block>
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