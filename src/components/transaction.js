import React, { useEffect, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../_actions/transaction";
import { getHouses } from "../_actions/house";
import { getUsers } from "../_actions/user";

import '../styles/transaction.css';
import '../styles/transaction_item.css';

import TransactionItem from '../components/transaction_item';

const Transaction = () => {
    const transaction = useSelector(state => state.transaction.data);
    const loading = useSelector(state => state.transaction.loading);
    const error = useSelector(state => state.transaction.error);
    const userLoading = useSelector(state => state.user.loading);
    const userError = useSelector(state => state.user.error);
    const houseLoading = useSelector(state => state.house.loading);
    const houseError = useSelector(state => state.house.error);
    const dispatch = useDispatch();

    const initFetch = useCallback(() => {
        dispatch(getTransactions());
        dispatch(getHouses());
        dispatch(getUsers());
    }, [dispatch]);
    
    useEffect(() => {
        initFetch();
    }, [initFetch]);
    
    const data = transaction.map((item, index) => (
        <TransactionItem item={item} key={index}/>
    ))

    return (
        <div>
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
                    { (!loading && !error 
                        && !userLoading && !userError 
                        && !houseLoading && !houseError) 
                        && data }
                </div>
            </div>
        </div>
    )
}

export default Transaction;