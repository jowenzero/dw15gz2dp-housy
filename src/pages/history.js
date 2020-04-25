import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../_actions/transaction";
import { getHouses } from "../_actions/house";
import { getUsers } from "../_actions/user";

import '../styles/booking.css';

import Login from '../components/login';
import HistoryItem from '../components/history_item';
import EmptyItem from '../components/empty_item';

const History = () => {
    const history = useSelector(state => state.transaction.historyData);
    const loading = useSelector(state => state.transaction.loading);
    const error = useSelector(state => state.transaction.error);
    const dispatch = useDispatch();

    const initFetch = useCallback(() => {
        dispatch(getHistory());
        dispatch(getHouses());
        dispatch(getUsers());
    }, [dispatch]);
    
    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const data = history.map((item, index) => (
        <HistoryItem item={item} key={index}/>
    ))

    return (
        <div>
            <Login/>
            <div className="booking-bg">
                <br/><br/>
                { data.length < 1 && <EmptyItem/>}
                { (!loading && !error) && data }
            </div>
        </div>
    )
}

export default History;