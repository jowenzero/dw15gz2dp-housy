import React from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { useSelector } from "react-redux";

import '../styles/transaction_item.css';

import Action from '../icons/Action.svg';
import TransactionAction from '../components/transaction_action';

const TransactionItem = ({item}) => {
    const users = useSelector(state => state.user.multiData);
    const houses = useSelector(state => state.house.data);

    const data = users[item.userId - 1];
    const houseData = houses[item.houseId - 1];

    const [isPopupOpen, setIsPopupOpen] = React.useState(false);

    const showPopup = () => {
        setIsPopupOpen(true);
    };

    const hidePopup = () => {
        setIsPopupOpen(false);
    };
    
    return (
        <>
            {(data && houseData) &&
                <Container fluid className="transaction-item-area">
                    <Row>
                        <Col xs={2} className="transaction-item-text">{item.id}</Col>
                        <Col xs={2} className="transaction-item-text">{data.fullName}</Col>
                        <Col xs={2} className="transaction-item-text">{houseData.typeRent}</Col>
                        <Col xs={2} className="transaction-item-text">{item.attachment}</Col>
                        { item.status === "Waiting Payment" &&
                            <Col xs={2} className="transaction-item-text color-red">{item.status}</Col>
                        }
                        { item.status === "Pending" &&
                            <Col xs={2} className="transaction-item-text color-orange">{item.status}</Col>
                        }
                        { item.status === "Approve" &&
                            <Col xs={2} className="transaction-item-text color-green">{item.status}</Col>
                        }
                        { item.status === "Cancel" &&
                            <Col xs={2} className="transaction-item-text color-red">{item.status}</Col>
                        }
                        <Col xs={2} className="transaction-item-text">
                            <img src={Action} alt="" onClick={showPopup}></img>
                        </Col>
                    </Row>
                    <p className="transaction-item-line"/>
                </Container>               
            }
        

            <Modal show={isPopupOpen} onHide={hidePopup} centered>
                <Modal.Body className="action-area">
                    <br/>
                    <TransactionAction item={item} key={item.id}/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default TransactionItem;