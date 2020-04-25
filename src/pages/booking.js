import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getBooking } from "../_actions/transaction";
import { getHouses } from "../_actions/house";
import { getUsers } from "../_actions/user";

import '../styles/booking.css';

import Login from '../components/login';
import BookingItem from '../components/booking_item';
import EmptyItem from '../components/empty_item';

const Booking = () => {
    const booking = useSelector(state => state.transaction.bookingData);
    const loading = useSelector(state => state.transaction.loading);
    const error = useSelector(state => state.transaction.error);
    const userLoading = useSelector(state => state.user.loading);
    const userError = useSelector(state => state.user.error);
    const houseLoading = useSelector(state => state.house.loading);
    const houseError = useSelector(state => state.house.error);
    const dispatch = useDispatch();

    const initFetch = useCallback(() => {
        dispatch(getBooking());
        dispatch(getHouses());
        dispatch(getUsers());
    }, [dispatch]);
    
    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const data = booking.map((item, index) => (
        <BookingItem item={item} key={index}/>
    ))

    return (
        <div>
            <Login/>
            <div className="booking-bg">
                <br/><br/>
                { data.length < 1 && <EmptyItem/>}
                { (!loading && !error 
                    && !userLoading && !userError 
                    && !houseLoading && !houseError)  && data }
            </div>
        </div>
    )
}

export default Booking;