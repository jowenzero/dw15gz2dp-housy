import React from 'react';
import { Container } from 'react-bootstrap';

import '../styles/content.css';

import ContentItem from '../components/content_item';

const Content = (props) => {
    const data = props.data.map((item, index) => (
        <ContentItem item={item} key={index}/>
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