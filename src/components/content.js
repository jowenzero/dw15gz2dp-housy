import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../styles/content.css';

import ContentItem from '../components/content_item';

const Content = (props) => {
    const data = props.data.map((item, index) => (
        <Link to={`/property/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <ContentItem item={item} key={index}/>
        </Link>
    ))

    return (
        <Container fluid className="content-bg">
            <div className="flex-container">
                { data }
            </div>
        </Container>
    );
}

export default Content;