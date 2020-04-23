import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import '../styles/content_item.css';

const ContentItem = ({item}) => {
    return (
        <div className="content-item">
            <Container fluid className="content-tag-pos">
                <Row>
                    <Col xs={3}>
                        <div className="content-tag-rect-1">Furnished</div>
                    </Col>
                    <Col xs={3}>
                        <div className="content-tag-rect-2">Pet Allowed</div>
                    </Col>
                    <Col xs={6}>
                        <div className="content-tag-rect-3">Shared Accomodation</div>
                    </Col>
                </Row>
            </Container>
            <img src={ process.env.PUBLIC_URL + item.thumbnail } alt="" className="content-image"></img>
            <p className="content-info-1">{ item.price }</p>
            <p className="content-info-2">{ item.miniDescription }</p>
            <p className="content-info-3">{ item.miniLocation }</p>
        </div>
    )
}

export default ContentItem;