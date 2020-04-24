import React from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { useSelector } from "react-redux";

import '../styles/transaction_item.css';

import Action from '../icons/Action.svg';
import TransactionAction from '../components/transaction_action';

const TransactionItem = ({item}) => {
    const users = useSelector(state => state.user.multiData);
    const houses = useSelector(state => state.house.data);

    const data = users[item.UserId - 1];
    const houseData = houses[item.HouseId - 1];

    const [isPopupOpen, setIsPopupOpen] = React.useState(false);

    const showPopup = () => {
        setIsPopupOpen(true);
    };

    const hidePopup = () => {
        setIsPopupOpen(false);
    };
    
    return (
        <>
            <Container fluid className="transaction-item-area">
                <Row>
                    <Col xs={2} className="transaction-item-text">{item.id}</Col>
                    <Col xs={2} className="transaction-item-text">{data.fullName}</Col>
                    <Col xs={2} className="transaction-item-text">{houseData.typeRent}</Col>
                    <Col xs={2} className="transaction-item-text">{item.attachment}</Col>
                    <Col xs={2} className="transaction-item-text color-orange">{item.status}</Col>
                    <Col xs={2} className="transaction-item-text">
                        <img src={Action} alt="" onClick={showPopup}></img>
                    </Col>
                </Row>
                <p className="transaction-item-line"/>
            </Container>

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