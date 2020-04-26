import React from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { API, setAuthToken } from "../config/api";

import '../styles/booking.css';

import Logo from '../icons/Logo.svg';
import CircleInline from '../icons/CircleInline.svg';
import CircleOutline from '../icons/CircleOutline.svg';
import WaitPayment from '../icons/WaitPayment.svg';
import WaitApprove from '../icons/WaitApprove.svg';

const BookingItem = ({item}) => {
    const users = useSelector(state => state.user.multiData);
    const houses = useSelector(state => state.house.data);

    const data = users[item.UserId - 1];
    const houseData = houses[item.HouseId - 1];

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

    const patchHistory = async () => {
        try {
            const token = localStorage.getItem('userToken');
            setAuthToken(token);
            await API.patch("/transaction/" + item.id, {
                status: "Pending"
            });
            window.location.reload(true);
        } catch (error) {
            if (error.code === "ECONNABORTED") {
                console.log("Network Error!");
            } else {
                const { data, status } = error.response;
                console.log(data.message, status);
            }
        }
    };

    function formatDate(string){
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }
    let createDate;
    let checkIn;
    let checkOut;

    if (data && houseData) {
        createDate = formatDate(item.createdAt)
        checkIn = formatDate(item.checkin)
        checkOut = formatDate(item.checkout)
    }
    
    return (
        <>
            <Container fluid className="booking-area">
                <p/>
                { (data && houseData) &&
                    <>
                        <Row>
                            <Col xs={9}>
                                <img src={Logo} alt=""></img>
                                <br/><br/>
                                
                                <Row>
                                    <Col xs={5}>
                                        <h3 className="booking-house-name">{houseData.name}</h3>
                                        <p/>
                                        <p className="booking-location">{houseData.address}</p>
                                        <p/>
                                        { item.status === "Waiting Payment" &&
                                            <img src={WaitPayment} alt=""></img>
                                        }
                                        { item.status === "Pending" &&
                                            <img src={WaitApprove} alt=""></img>
                                        }
                                    </Col>
                                    <Col xs={1}>
                                        <img src={CircleOutline} alt="" className="booking-circle-outline"></img>
                                        <div className="booking-line"/>
                                        <img src={CircleInline} alt="" className="booking-circle-inline"></img>
                                    </Col>
                                    <Col xs={3}>
                                        <p className="booking-bold-text">Check-in</p>
                                        <p className="booking-light-text">{checkIn}</p>
                                        <br/>
                                        <p className="booking-bold-text">Check-out</p>
                                        <p className="booking-light-text">{checkOut}</p>
                                    </Col>
                                    <Col xs={3}>
                                        <p className="booking-bold-text">Amenities</p>
                                        <div className="booking-amenities-area">
                                            { houseData.amenities[0] &&
                                                <p className="booking-amenities">{houseData.amenities[0]}</p>
                                            }
                                            { houseData.amenities[1] &&
                                                <p className="booking-amenities-2">{houseData.amenities[1]}</p>
                                            }
                                            { houseData.amenities[2] &&
                                                <p className="booking-amenities-3">{houseData.amenities[2]}</p>
                                            }
                                        </div>
                                        <br/>
                                        <p className="booking-bold-text">Type of Rent</p>
                                        <p className="booking-light-text">{houseData.typeRent}</p>
                                    </Col>
                                </Row>
                            </Col>

                            <Col xs={3}>
                            <h3 className="booking-bold-title">BOOKING</h3>
                                <p className="booking-date">{createDate}</p>
                                <div className="booking-pic-border">
                                <img src={ process.env.PUBLIC_URL + "../images/Receipt.png" } alt="" className="booking-pic"></img>
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
                            <Col xs={1}><p className="booking-bold-text">Gender</p></Col>
                            <Col xs={3}>
                                <Row>
                                    <Col xs={2}/>
                                    <Col xs={10}><p className="booking-bold-text">Phone</p></Col>
                                </Row>
                            </Col>
                        </Row>
                        <div className="booking-rect-line"/>

                        <Row>
                            <Col xs={1}><p className="booking-light-text2">{item.id}</p></Col>
                            <Col xs={3}><p className="booking-light-text2">{data.fullName}</p></Col>
                            <Col xs={1}><p className="booking-light-text2">{data.gender}</p></Col>
                            <Col xs={3}>
                                <Row>
                                    <Col xs={2}/>
                                    <Col xs={10}><p className="booking-light-text2">{data.phone}</p></Col>
                                </Row>
                            </Col>
                            <Col xs={2}><p className="booking-bold-text">Long time rent:</p></Col>
                            <Col><p className="booking-bold-text">{item.duration} {houseData.typeRent}</p></Col>
                        </Row>
                        <div className="booking-rect-line"/>

                        <Row>
                            <Col xs={8}/>
                            <Col xs={2}><p className="booking-bold-text">Total:</p></Col>
                            { item.status === "Waiting Payment" &&
                                <Col><p className="booking-bold-text booking-text-red">Rp. {item.total}</p></Col>
                            }
                            { item.status === "Pending" &&
                                <Col><p className="booking-bold-text booking-text-orange">Rp. {item.total}</p></Col>
                            }
                        </Row>
                    </>
                }
            </Container>
            <br/>
            <Container className="booking-area-borderless">
                <Row>
                    <Col xs={9}/>
                    <Col xs={3}>
                        { item.status === "Waiting Payment" && isConfirmOpen !== true &&
                            <Button variant="primary" size="lg" className="booking-button" onClick={showPopup}>PAY</Button>
                        }
                    </Col>
                </Row>
            </Container>

            
            <Modal show={isPopupOpen} onHide={hidePopup} onClick={() => {
                    hidePopup();
                    showConfirm();
                    patchHistory();
                }} centered>
                <Modal.Body className="booking-popup">
                    <p className="booking-bold-text">Pembayaran anda akan di konfirmasi dalam 1 x 24 Jam </p>
                    <p className="booking-bold-text">Untuk melihat pesanan Klik Disini Terima Kasih</p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default BookingItem;