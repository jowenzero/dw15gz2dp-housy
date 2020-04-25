import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { API, setAuthToken } from "../config/api";

import '../styles/booking.css';

import Logo from '../icons/Logo.svg';
import CircleInline from '../icons/CircleInline.svg';
import CircleOutline from '../icons/CircleOutline.svg';
import WaitPayment from '../icons/WaitPayment.svg';
import WaitApprove from '../icons/WaitApprove.svg';
import Approved from '../icons/Approved.svg';

const TransactionAction = ({item}) => { 
    const users = useSelector(state => state.user.multiData);
    const houses = useSelector(state => state.house.data);

    const data = users[item.UserId - 1];
    const houseData = houses[item.HouseId - 1];

    function formatDate(string){
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }
    const createDate = formatDate(houseData.createdAt)
    const checkIn = formatDate(item.checkin)
    const checkOut = formatDate(item.checkout)

    const patchTransaction = async (status) => {
        try {
            const token = localStorage.getItem('userToken');
            setAuthToken(token);
            await API.patch("/transaction/" + item.id, {
                status: status
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
                                <h3 className="booking-house-name">{houseData.name}</h3>
                                <p/>
                                <p className="booking-location">{houseData.address}</p>
                                { item.status === "Waiting Payment" &&
                                    <img src={WaitPayment} alt=""></img>
                                }
                                { item.status === "Pending" &&
                                    <img src={WaitApprove} alt=""></img>
                                }
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
                    { item.status === "Approve" &&
                        <Col><p className="booking-bold-text booking-text-green">Rp. {item.total}</p></Col>
                    }
                    { item.status === "Cancel" &&
                        <Col><p className="booking-bold-text booking-text-red">Rp. {item.total}</p></Col>
                    }
                </Row>
            </Container>
            <br/>
            { item.status === "Pending" &&
                <Container className="booking-area-borderless">
                    <Row>
                        <Col xs={8}/>
                        <Col xs={2}>
                            <Button variant="danger" size="lg" className="booking-small-button" onClick={() => patchTransaction("Cancel")}>Cancel</Button>
                        </Col>
                        <Col xs={2}>
                            <Button variant="success" size="lg" className="booking-small-button" onClick={() => patchTransaction("Approve")}>Approve</Button>
                        </Col>
                    </Row>
                </Container>
            }
        </>
    )
}

export default TransactionAction;