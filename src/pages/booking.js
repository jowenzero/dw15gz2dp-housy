import React from 'react';

import '../styles/booking.css';

import Login from '../components/login';
import Data from '../data/booking.json';
import BookingItem from '../components/booking_item';

const Booking = () => {
    const data = Data.map((item, index) => (
        <BookingItem item={item} key={index}/>
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

export default Booking