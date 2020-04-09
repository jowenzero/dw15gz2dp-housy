import React from 'react';
import { Container } from 'react-bootstrap';

import ContentItem from '../components/content_item';
import '../styles/content.css';

const Content = (props) => {
    const data = props.data.map((item, index) => (
        <ContentItem item={item} key={index}/>
    ))

    return (
        <Container fluid>
            <div className="home-content">
                <div className="flex-container">
                    { data }
                </div>
            </div>
        </Container>
    );
}

export default Content;