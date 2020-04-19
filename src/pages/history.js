import React from 'react';

import '../styles/booking.css';

import Login from '../components/login';
import Data from '../data/booking.json';
import HistoryItem from '../components/history_item';

const History = () => {
    const data = Data.map((item, index) => (
        <HistoryItem item={item} key={index}/>
    ))

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