import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import HeaderLogin from '../components/header_login'
import Filter from '../components/filter'
import Content from '../components/content'
import '../styles/home.css';
import Data from '../data.json';


class HomeLogin extends Component {
    constructor() {
        super()

        this.state = {
            data: Data
        }
    }

    render() {
        const state = this.state;

        return (
            <Container fluid>
                <HeaderLogin/>
                <Row>
                    <Col xs={4}><Filter/></Col>
                    <Col xs={8}><Content data={state.data}/></Col>
                </Row>
            </Container>
        );
    }z
}

export default HomeLogin;