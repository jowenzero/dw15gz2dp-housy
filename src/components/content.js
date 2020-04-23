import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getHouses } from "../_actions/house";

import '../styles/content.css';

import ContentItem from '../components/content_item';

const Content = () => {
    const house = useSelector(state => state.house.data);
    const dispatch = useDispatch();

    const data = house.map((item, index) => (
        <Link to={`/property/${item.id}`} style={{ textDecoration: 'none', color: 'black' }} key={index}>
            <ContentItem item={item} key={index}/>
        </Link>
    ))

    useEffect(() => {
        dispatch(getHouses())
    }, []);

    return (
        <Container fluid className="content-bg">
            <div className="flex-container">
                { data }
            </div>
        </Container>
    );
}

export default Content;