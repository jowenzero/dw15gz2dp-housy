import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormControl } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import '../styles/filter.css';

import Calendar from '../svg/Calendar.svg'

class Filter extends Component {
    state = {
        startDate: new Date()
    };
     
    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    render() {
        return (
            <Container fluid>
                <br/>
                <h1 className="filter-bold-text">Type Of Rent</h1>
                
                <Row>
                    <Col xs={4}><Button variant="light" size="lg">Day</Button></Col>
                    <Col xs={4}><Button variant="light" size="lg">Month</Button></Col>
                    <Col xs={4}><Button variant="light" size="lg">Year</Button></Col>
                </Row>
                <br/>

                <h1 className="filter-bold-text">Date</h1>
                <Form inline className="home-date-rect">
                    <img src={Calendar} alt="" className="home-date-calendar"></img>
                    <div className="home-date-line"></div>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                    />
                </Form>
                <br/>

                <h1 className="filter-bold-text">Property Room</h1>
                <p className="filter-regular-text">Bedroom</p>
                <Row>
                    <Col xs={2}><Button variant="light" size="lg">1</Button></Col>
                    <Col xs={2}><Button variant="light" size="lg">2</Button></Col>
                    <Col xs={2}><Button variant="light" size="lg">3</Button></Col>
                    <Col xs={2}><Button variant="light" size="lg">4</Button></Col>
                    <Col xs={2}><Button variant="light" size="lg">5</Button></Col>
                </Row>
                <br/>
                <p className="filter-regular-text">Bathroom</p>
                <Row>
                    <Col xs={2}><Button variant="light" size="lg">1</Button></Col>
                    <Col xs={2}><Button variant="light" size="lg">2</Button></Col>
                    <Col xs={2}><Button variant="light" size="lg">3</Button></Col>
                    <Col xs={2}><Button variant="light" size="lg">4</Button></Col>
                    <Col xs={2}><Button variant="light" size="lg">5</Button></Col>
                </Row>
                <br/>

                <h1 className="filter-bold-text">Amenities</h1>
                <Form.Check type="checkbox" className="filter-regular-text" label="Furnished" />
                <Form.Check type="checkbox" className="filter-regular-text" label="Pet Allowed" />
                <Form.Check type="checkbox" className="filter-regular-text" label="Shared Accomodation" />
                <br/>

                <h1 className="filter-bold-text">Budget</h1>
                <Form inline>
                    <h1 className="filter-regular-text">Less than IDR.</h1>
                    <FormControl type="text" placeholder="Price" className="mr-sm-2 home-budget-text home-budget-rect"/>
                </Form>
                <br/><br/>

                <Row>
                    <Col xs={8}></Col>
                    <Col xs={4}><Button variant="primary" size="lg">APPLY</Button></Col>
                </Row>
                <br/><br/>
            </Container>
        );
    }
}

export default Filter;