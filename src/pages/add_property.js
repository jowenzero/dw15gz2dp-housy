import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

import '../styles/add_property.css';

import Login from '../components/login';

class AddProperty extends Component {
    render() {
        return (
            <div>
                <Login/>
                <div className="add-prop-bg">
                    <h3 className="add-prop-title">Add Property</h3>
                    <Container fluid className="add-prop-area">
                        <Form>
                            <Form.Group controlId="addPropName">
                                <Form.Label className="add-prop-bold-text">Name Property</Form.Label>
                                <Form.Control type="text"/>
                            </Form.Group>

                            <Form.Group controlId="addPropCity">
                                <Form.Label className="add-prop-bold-text">City</Form.Label>
                                <Form.Control as="select">
                                    <option>Tangerang</option>
                                    <option>Jakarta</option>
                                    <option>Bandung</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="addPropAddress">
                                <Form.Label className="add-prop-bold-text">Address</Form.Label>
                                <Form.Control as="textarea" rows="3"/>
                            </Form.Group>

                            <Form.Group controlId="addPropPrice">
                                <Form.Label className="add-prop-bold-text">Price</Form.Label>
                                <Form.Control type="text"/>
                            </Form.Group>

                            <Form.Group controlId="addPropTypeOfRent">
                                <Form.Label className="add-prop-bold-text">Type Of Rent</Form.Label>
                                <Form.Control as="select">
                                    <option>Day</option>
                                    <option>Month</option>
                                    <option>Year</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="addPropAmenities">
                                <Form.Label className="add-prop-bold-text">Amenities</Form.Label>
                                <br/>
                                <Form.Check inline className="add-prop-text" label="Furnished" type="checkbox" id="1"/>
                                <Form.Check inline className="add-prop-text" label="Pet Allowed" type="checkbox" id="2"/>
                                <Form.Check inline className="add-prop-text" label="Shared Accomodation" type="checkbox" id="3"/>
                            </Form.Group>

                            <Form.Group controlId="addPropBedroom">
                                <Form.Label className="add-prop-bold-text">Bedroom</Form.Label>
                                <Form.Control as="select">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="addPropBathroom">
                                <Form.Label className="add-prop-bold-text">Bathroom</Form.Label>
                                <Form.Control as="select">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </Form.Group>
                            
                            <br/>
                            <Button variant="primary" type="submit" href="/" block>
                                Save
                            </Button>
                        </Form>
                    </Container>
                </div>
            </div>
        )
    }
}

export default AddProperty;