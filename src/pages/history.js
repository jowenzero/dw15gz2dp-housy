import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../_actions/transaction";
import { getHouses } from "../_actions/house";
import { getUsers } from "../_actions/user";

import '../styles/booking.css';

import Login from '../components/login';
import HistoryItem from '../components/history_item';

const History = () => {
    const history = useSelector(state => state.transaction.historyData);
    const dispatch = useDispatch();

    const data = history.map((item, index) => (
        <HistoryItem item={item} key={index}/>
    ))

    useEffect(() => {
        dispatch(getHistory());
        dispatch(getHouses());
        dispatch(getUsers());
    }, []);

    return (
        <div>
            <Login/>
            <div className="booking-bg">
                <br/><br/>
                { data }
            </div>
        </div>
    )
}

export default History;