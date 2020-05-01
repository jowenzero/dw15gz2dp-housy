import React, { useEffect, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getHouses } from "../_actions/house";

import '../styles/content.css';

import ContentItem from '../components/content_item';

const Content = () => {
    const house = useSelector(state => state.house.data);
    const loading = useSelector(state => state.house.loading);
    const error = useSelector(state => state.house.error);
    const dispatch = useDispatch();

    const initFetch = useCallback(() => {
        dispatch(getHouses());
    }, [dispatch]);
    
    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const data = house.map((item, index) => (
        <Link to={`/property/${item.id}`} style={{ textDecoration: 'none', color: 'black' }} key={index}>
            <ContentItem item={item} key={index}/>
        </Link>
    ))

    return (
        <Container fluid className="content-bg">
            <div className="flex-container">
                { (!loading && !error) && data }
            </div>
            <br/>
        </Container>
    );
}

export default Content;