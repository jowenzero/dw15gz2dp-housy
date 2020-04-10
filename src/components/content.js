import React from 'react';
import { Container } from 'react-bootstrap';

import ContentItem from '../components/content_item';
import '../styles/content.css';

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