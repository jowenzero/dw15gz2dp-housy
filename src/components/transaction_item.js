import React from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';

import '../styles/transaction_item.css';

import Action from '../icons/Action.svg';
import TransactionAction from '../components/transaction_action';

const TransactionItem = ({item}) => {
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);

    const showPopup = () => {
        setIsPopupOpen(true);
    };

    const hidePopup = () => {
        setIsPopupOpen(false);
    };
    
    return (
        <>
            { item.id % 2 === 0 && 
                <Container fluid className="transaction-item-area">
                    <Row>
                        <Col xs={2} className="transaction-item-text">{item.id}</Col>
                        <Col xs={2} className="transaction-item-text">{item.name}</Col>
                        <Col xs={2} className="transaction-item-text">{item.typeOfRent}</Col>
                        <Col xs={2} className="transaction-item-text">{item.transferProof}</Col>
                        { item.status === "Approve" &&
                            <>
                                <Col xs={2} className="transaction-item-text color-green">{item.status}</Col>
                                <Col xs={2} className="transaction-item-text">
                                    <img src={Action} alt=""></img>
                                </Col>
                            </>
                        }
                        { item.status === "Pending" &&
                            <>
                                <Col xs={2} className="transaction-item-text color-orange">{item.status}</Col>
                                <Col xs={2} className="transaction-item-text">
                                    <img src={Action} alt="" onClick={showPopup}></img>
                                </Col>
                            </>
                        }
                        { item.status === "Cancel" &&
                            <>
                                <Col xs={2} className="transaction-item-text color-red">{item.status}</Col>
                                <Col xs={2} className="transaction-item-text">
                                    <img src={Action} alt=""></img>
                                </Col>
                            </>
                        }
                    </Row>
                    <p className="transaction-item-line"/>
                </Container>
            }
            { item.id % 2 === 1 &&
                <Container fluid className="transaction-item-area-grey">
                    <Row>
                        <Col xs={2} className="transaction-item-text">{item.id}</Col>
                        <Col xs={2} className="transaction-item-text">{item.name}</Col>
                        <Col xs={2} className="transaction-item-text">{item.typeOfRent}</Col>
                        <Col xs={2} className="transaction-item-text">{item.transferProof}</Col>
                        { item.status === "Approve" &&
                            <>
                                <Col xs={2} className="transaction-item-text color-green">{item.status}</Col>
                                <Col xs={2} className="transaction-item-text">
                                    <img src={Action} alt=""></img>
                                </Col>
                            </>
                        }
                        { item.status === "Pending" &&
                            <>
                                <Col xs={2} className="transaction-item-text color-orange">{item.status}</Col>
                                <Col xs={2} className="transaction-item-text">
                                    <img src={Action} alt="" onClick={showPopup}></img>
                                </Col>
                            </>
                        }
                        { item.status === "Cancel" &&
                            <>
                                <Col xs={2} className="transaction-item-text color-red">{item.status}</Col>
                                <Col xs={2} className="transaction-item-text">
                                    <img src={Action} alt=""></img>
                                </Col>
                            </>
                        }
                    </Row>
                    <p className="transaction-item-line"/>
                </Container>
            }

            <Modal show={isPopupOpen} onHide={hidePopup} centered>
                <Modal.Body className="action-area">
                    <p/>
                    <TransactionAction item={item} key={item.id}/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default TransactionItem;