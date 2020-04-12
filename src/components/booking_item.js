import React from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';

import '../styles/booking.css';
import Logo from '../icons/Logo.svg';
import CircleInline from '../icons/CircleInline.svg';
import CircleOutline from '../icons/CircleOutline.svg';
import WaitPayment from '../icons/WaitPayment.svg';
import WaitApprove from '../icons/WaitApprove.svg';

const BookingItem = ({item}) => {
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
    const [isUploadOpen, setIsUploadOpen] = React.useState(false);

    const showPopup = () => {
        setIsPopupOpen(true);
    };

    const hidePopup = () => {
        setIsPopupOpen(false);
    };

    const showConfirm = () => {
        setIsConfirmOpen(true);
    };

    const toggleUpload =() => {
        if (isUploadOpen === false) {
            setIsUploadOpen(true);
        }
        else {
            setIsUploadOpen(false);
        }
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
                                <p/>
                                { isConfirmOpen === true &&
                                    <img src={WaitApprove} alt=""></img>
                                }
                                { isConfirmOpen !== true &&
                                    <img src={WaitPayment} alt=""></img>
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
                        <h3 className="booking-bold-title">BOOKING</h3>
                        <p className="booking-date">{item.bookDate}</p>
                        <div className="booking-pic-border">
                        <img src={ process.env.PUBLIC_URL + item.picture } alt="" className="booking-pic"></img>
                        </div>
                        <br/>    
                        <p className="booking-light-text booking-upload-text" onClick={toggleUpload}>upload payment proof</p>
                        { isUploadOpen === true &&
                            <form action="/booking" method="post" enctype="multipart/form-data">
                                <input type="file" name="avatar"/>
                            </form>
                        }
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
                    <Col xs={9}/>
                    <Col xs={3}>
                        { isConfirmOpen !== true &&
                            <Button variant="primary" size="lg" className="booking-button" onClick={showPopup}>PAY</Button>
                        }
                    </Col>
                </Row>
            </Container>

            
            <Modal show={isPopupOpen} onHide={hidePopup} onClick={() => {
                    hidePopup();
                    showConfirm();
                }} centered>
                <Modal.Body className="booking-popup">
                    <p className="booking-bold-text">Pembayaran anda akan di konfirmasi dalam 1 x 24 Jam </p>
                    <p className="booking-bold-text">Untuk melihat pesanan Klik Disini Terima Kasih</p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default BookingItem