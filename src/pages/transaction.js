import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import '../styles/transaction.css';
import '../styles/transaction_item.css';

import Login from '../components/login';
import Data from '../data/transaction.json';
import TransactionItem from '../components/transaction_item';

const Transaction = () => {
    const data = Data.map((item, index) => (
        <TransactionItem item={item} key={index}/>
    ))

    return (
        <div>
            <Login/>
            <div className="transaction-bg">
                <h3 className="transaction-title">Incoming Transaction</h3>
                <div className="transaction-area">
                    <Container fluid className="transaction-item-area">
                        <Row>
                            <Col xs={2} className="transaction-text">No</Col>
                            <Col xs={2} className="transaction-text">Users</Col>
                            <Col xs={2} className="transaction-text">Type Of Rent</Col>
                            <Col xs={2} className="transaction-text">Bukti Transfer</Col>
                            <Col xs={2} className="transaction-text">Status Payment</Col>
                            <Col xs={2} className="transaction-text">Action</Col>
                        </Row>
                        <p className="transaction-item-line"/>
                    </Container>
                    { data }
                </div>
            </div>
        </div>
    )
}

export default Transaction;