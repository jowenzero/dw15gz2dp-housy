import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import '../styles/booking.css';

import Logo from '../icons/Logo.svg';
import CircleInline from '../icons/CircleInline.svg';
import CircleOutline from '../icons/CircleOutline.svg';
import Approved from '../icons/Approved.svg';

const HistoryItem = ({item}) => {
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
                                <p/>
                                { item.status === "Approve" &&
                                    <img src={Approved} alt=""></img>
                                }
                                { item.status === "Cancel" &&
                                    <>
                                        <p className="booking-cancel-text">Cancel</p>
                                        <div className="booking-cancel-rect"/>
                                    </>
                                }
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
                        <h3 className="booking-bold-title">INVOICE</h3>
                        <p className="booking-date">{item.bookDate}</p>
                        <img src={ process.env.PUBLIC_URL + item.barcode } alt="" className="booking-barcode"></img>
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
                    { item.status === "Approve" &&
                        <Col><p className="booking-bold-text booking-text-green">{item.total}</p></Col>
                    }
                    { item.status === "Cancel" &&
                       <Col><p className="booking-bold-text booking-text-red">{item.total}</p></Col>
                    }
                </Row>
            </Container>
            <br/><br/>
        </>
    )
}

export default HistoryItem;