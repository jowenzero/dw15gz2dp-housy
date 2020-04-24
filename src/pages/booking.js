import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getBooking } from "../_actions/transaction";
import { getHouses } from "../_actions/house";
import { getUsers } from "../_actions/user";

import '../styles/booking.css';

import Login from '../components/login';
import BookingItem from '../components/booking_item';

const Booking = () => {
    const booking = useSelector(state => state.transaction.bookingData);
    const dispatch = useDispatch();

    const data = booking.map((item, index) => (
        <BookingItem item={item} key={index}/>
    ))

    useEffect(() => {
        dispatch(getBooking());
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

export default Booking;