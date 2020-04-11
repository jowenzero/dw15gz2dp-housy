import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormControl } from 'react-bootstrap';

import '../styles/filter.css';

import Calendar from '../icons/Calendar.svg';

class Filter extends Component {
    render() {
        return (
            <Container fluid>
                <br/>
                <h1 className="filter-bold-text">Type Of Rent</h1>
                <Row>
                    <Col xs={3}><Button variant="light" size="lg" className="home-button">Day</Button></Col>
                    <Col xs={3}><Button variant="light" size="lg" className="home-button">Month</Button></Col>
                    <Col xs={3}><Button variant="light" size="lg" className="home-button">Year</Button></Col>
                </Row>
                <br/>

                <h1 className="filter-bold-text">Date</h1>
                <Form inline className="home-date-rect">
                    <img src={Calendar} alt="" className="home-date-calendar"></img>
                    <div className="home-date-line"></div>
                    <Form.Group controlId="filterDate">
                        <Form.Control type="date" required/>
                    </Form.Group>
                </Form>
                <br/>

                <h1 className="filter-bold-text">Property Room</h1>
                <p className="filter-regular-text">Bedroom</p>
                <Row>
                    <Col xs={2}><Button variant="light" size="lg" className="home-small-button">1</Button></Col>
                    <Col xs={2}><Button variant="light" size="lg" className="home-small-button">2</Button></Col>
                    <Col xs={2}><Button variant="light" size="lg" className="home-small-button">3</Button></Col>
                    <Col xs={2}><Button variant="light" size="lg" className="home-small-button">4</Button></Col>
                    <Col xs={2}><Button variant="light" size="lg" className="home-small-button">5</Button></Col>
                </Row>
                <br/>
                <p className="filter-regular-text">Bathroom</p>
                <Row>
                    <Col xs={2}><Button variant="light" size="lg" className="home-small-button">1</Button></Col>
                    <Col xs={2}><Button variant="light" size="lg" className="home-small-button">2</Button></Col>
                    <Col xs={2}><Button variant="light" size="lg" className="home-small-button">3</Button></Col>
                    <Col xs={2}><Button variant="light" size="lg" className="home-small-button">4</Button></Col>
                    <Col xs={2}><Button variant="light" size="lg" className="home-small-button">5</Button></Col>
                </Row>
                <br/>

                <h1 className="filter-bold-text">Amenities</h1>
                <Form>
                    <div className="mb-3">
                        <Form.Group controlId="filterAmenities">
                            <Form.Check type="checkbox" className="filter-regular-text" label="Furnished" id="1"/>
                            <Form.Check type="checkbox" className="filter-regular-text" label="Pet Allowed" id="2"/>
                            <Form.Check type="checkbox" className="filter-regular-text" label="Shared Accomodation" id="3"/>
                        </Form.Group>
                    </div>
                </Form>
                <br/>

                <h1 className="filter-bold-text">Budget</h1>
                <Form inline>
                    <h1 className="filter-regular-text">Less than IDR.</h1>
                    <FormControl type="text" placeholder="Price" className="mr-sm-2 home-budget-text home-budget-rect"/>
                </Form>
                <br/><br/>

                <Row>
                    <Col xs={7}></Col>
                    <Col xs={5}><Button variant="primary" size="lg" href="/">APPLY</Button></Col>
                </Row>
                <br/><br/>
            </Container>
        );
    }
}

export default Filter;