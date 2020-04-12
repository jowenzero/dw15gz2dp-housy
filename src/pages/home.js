import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Login from '../components/login';
import Filter from '../components/filter';
import Content from '../components/content';
import Data from '../data/data.json';
import Transaction from '../components/transaction';

class Home extends Component {
    constructor() {
        super()

        this.state = {
            data: Data
        }
    }

    render() {
        const state = this.state;

        return (
            <div>
                <Login/>
                { localStorage.getItem('userListAs') === 'Tenant' &&
                    <Container fluid>
                        <Row>
                            <Col xs={4}><Filter/></Col>
                            <Col xs={8}><Content data={state.data}/></Col>
                        </Row>
                    </Container>
                } 
                { localStorage.getItem('userListAs') === 'Owner' &&
                    <Transaction/>
                }
            </div>
        );
    }
}

export default Home;