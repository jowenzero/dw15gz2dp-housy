import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import '../styles/booking.css';

const EmptyItem = () => {
    return (
        <>
            <Container fluid className="booking-area">
                <br/><br/><br/><br/><br/>
                <Row>
                    <Col xs={4}/>
                    <Col xs={8}>
                        <h3 className="booking-bold-title color-grey">/ / / / / / / / / / / / / / / /</h3>
                        <h3 className="booking-bold-title color-grey"> - DATA IS EMPTY! - </h3>
                        <h3 className="booking-bold-title color-grey">/ / / / / / / / / / / / / / / /</h3>
                    </Col>
                </Row>
            </Container>
            <br/><br/>
        </>
    )
}

export default EmptyItem;