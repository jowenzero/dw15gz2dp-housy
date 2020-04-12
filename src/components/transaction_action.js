import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import '../styles/booking.css';
import Logo from '../icons/Logo.svg';
import CircleInline from '../icons/CircleInline.svg';
import CircleOutline from '../icons/CircleOutline.svg';

const TransactionAction = ({item}) => { 
    const buttonPressed = () => {
        window.location.reload(true);
    };

    return (
        <>
            <Container fluid className="booking-area">
                <p/>
                <Row>
                    <Col xs={9}>
                        <img src={Logo} alt=""></img>
                        <br/><br/>
                        
                        <Row>
                            <Col xs={5}>
                                <h3 className="booking-house-name">{item.houseName}</h3>
                                <p/>
                                <p className="booking-location">{item.location}</p>
                            </Col>
                            <Col xs={1}>
                                <img src={CircleOutline} alt="" className="booking-circle-outline"></img>
                                <div className="booking-line"/>
                                <img src={CircleInline} alt="" className="booking-circle-inline"></img>
                            </Col>
                            <Col xs={3}>
                                <p className="booking-bold-text">Check-in</p>
                                <p className="booking-light-text">{item.checkIn}</p>
                                <br/>
                                <p className="booking-bold-text">Check-out</p>
                                <p className="booking-light-text">{item.checkOut}</p>
                            </Col>
                            <Col xs={3}>
                                <p className="booking-bold-text">Amenities</p>
                                <p className="booking-light-text">{item.amenities}</p>
                                <br/>
                                <p className="booking-bold-text">Type of Rent</p>
                                <p className="booking-light-text">{item.typeOfRent}</p>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs={3}>
                        <h3 className="booking-bold-title">BOOKING</h3>
                        <p className="booking-date">{item.bookDate}</p>
                        <div className="booking-pic-border">
                        <img src={ process.env.PUBLIC_URL + item.picture } alt="" className="booking-pic"></img>
                        </div>
                        <br/>
                    </Col>
                </Row>

                <Row>
                    <Col xs={1}><p className="booking-bold-text">No</p></Col>
                    <Col xs={3}><p className="booking-bold-text">Full Name</p></Col>
                    <Col xs={2}><p className="booking-bold-text">Gender</p></Col>
                    <Col xs={2}><p className="booking-bold-text">Phone</p></Col>
                </Row>
                <div className="booking-rect-line"/>

                <Row>
                    <Col xs={1}><p className="booking-light-text2">{item.id}</p></Col>
                    <Col xs={3}><p className="booking-light-text2">{item.name}</p></Col>
                    <Col xs={2}><p className="booking-light-text2">{item.gender}</p></Col>
                    <Col xs={2}><p className="booking-light-text2">{item.phone}</p></Col>
                    <Col xs={2}><p className="booking-bold-text">Long time rent:</p></Col>
                    <Col><p className="booking-bold-text">{item.rentTime}</p></Col>
                </Row>
                <div className="booking-rect-line"/>

                <Row>
                    <Col xs={8}/>
                    <Col xs={2}><p className="booking-bold-text">Total:</p></Col>
                    <Col><p className="booking-bold-text booking-text-red">{item.total}</p></Col>
                </Row>
            </Container>
            <br/>
            <Container className="booking-area-borderless">
                <Row>
                    <Col xs={8}/>
                    <Col xs={2}>
                        <Button variant="danger" size="lg" className="booking-small-button" onClick={buttonPressed}>Cancel</Button>
                    </Col>
                    <Col xs={2}>
                        <Button variant="success" size="lg" className="booking-small-button" onClick={buttonPressed}>Approve</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default TransactionAction