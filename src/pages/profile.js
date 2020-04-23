import React from 'react';
import { Container, Row, Col, Button, Modal, Form, DropdownButton } from 'react-bootstrap';
import { AiOutlineUser, AiOutlineMail, AiOutlineLock, AiOutlinePhone, AiOutlineHome } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { IoIosTransgender } from "react-icons/io";
import { API, setAuthToken } from "../config/api";

import '../styles/profile.css';

import Login from '../components/login';
import Data from '../data/profile.json';

const Profile = () => {
    const [isPasswordOpen, setIsPasswordOpen] = React.useState(false);
    const [oldPass, setOldPass] = React.useState(null);
    const [confirmPass, setConfirmPass] = React.useState(null);
    const [newPass, setNewPass] = React.useState(null);
    const [passFail, setPassFail] = React.useState(false);

    const showPassword = () => {
        setIsPasswordOpen(true);
    };
    const hidePassword = () => {
        setOldPass(null);
        setConfirmPass(null);
        setNewPass(null);
        setIsPasswordOpen(false);
    };
    const showPassFail = () => {
        setPassFail(true);
    };
    const hidePassFail = () => {
        setPassFail(false);
    };

    const handleOldPassChange = (event) => {
        setOldPass(event.target.value);
        console.log(oldPass, confirmPass, newPass)
    };
    const handleConfirmPassChange = (event) => {
        setConfirmPass(event.target.value);
    };
    const handleNewPassChange = (event) => {
        setNewPass(event.target.value);
    };

    const changePass = async (event) => {
        try {
            event.preventDefault();
            const token = localStorage.getItem('userToken');
            setAuthToken(token);
            await API.post("/password", {
                oldPass: oldPass,
                confirmPass: confirmPass,
                newPass: newPass
            });
            hidePassFail();
            hidePassword();
        } catch (error) {
            if (error.code === "ECONNABORTED") {
                console.log("Network Error!");
            } else {
                const { data, status } = error.response;
                console.log(data.message, status);
            }
            showPassFail();
        }
    };

    return (
        Data.map(item => (
            <div>
                <Login/>
                <div className="profile-bg">
                    <br/><br/>
                    <Container fluid className="profile-area">
                        <br/>
                        <h3 className="profile-info">Personal Info</h3>
                        <Row>
                            <Col xs={1}>
                                <AiOutlineUser className="profile-icons"/>
                                <AiOutlineMail className="profile-icons"/>
                                <AiOutlineLock className="profile-icons"/>
                                <AiOutlineHome className="profile-icons"/>
                                <IoIosTransgender className="profile-icons"/>
                                <AiOutlinePhone className="profile-icons"/>
                                <GoLocation className="profile-icons"/>
                            </Col>
                            <Col xs={6}>
                                <p className="profile-name">{ item.name }</p>
                                <p className="profile-desc">Full Name</p>
                                <p className="profile-name">{ item.email }</p>
                                <p className="profile-desc">Email</p>
                                <p className="profile-name profile-link" onClick={showPassword}>Change Password</p>
                                <p className="profile-desc">Password</p>
                                <p className="profile-name">{ item.status }</p>
                                <p className="profile-desc">Status</p>
                                <p className="profile-name">{ item.gender }</p>
                                <p className="profile-desc">Gender</p>
                                <p className="profile-name">{ item.phone }</p>
                                <p className="profile-desc">Mobile Phone</p>
                                <p className="profile-name">{ item.address }</p>
                                <p className="profile-desc">Address</p>
                            </Col>
                            <Col xs={4}>
                                <img src={ process.env.PUBLIC_URL + item.picture } alt=""></img>
                                <br/><br/>
                                <DropdownButton id="dropdown-basic-button" title="Change Photo Profile">
                                    <form action="/profile" method="post" enctype="multipart/form-data">
                                        <input type="file" name="avatar"/>
                                    </form>
                                </DropdownButton>
                            </Col>
                        </Row>
                        <br/>
                    </Container>
                    <br/><br/><br/><br/><br/><br/>
                </div>



                <Modal show={isPasswordOpen} onHide={hidePassword}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={changePass}>
                            <Form.Group controlId="passOld">
                                <Form.Label>Old Password</Form.Label>
                                <Form.Control type="password" required
                                    value={oldPass}
                                    onChange={handleOldPassChange} 
                                />
                            </Form.Group>

                            <Form.Group controlId="passConfirm">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" required
                                    value={confirmPass}
                                    onChange={handleConfirmPassChange} 
                                />
                            </Form.Group>

                            <Form.Group controlId="passNew">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password" required
                                    value={newPass}
                                    onChange={handleNewPassChange} 
                                />
                            </Form.Group>

                            { passFail === true &&
                                <p style={{ color: 'red' }}>Password change failed</p>
                            }

                            <Button variant="primary" type="submit" block>
                                Save
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        ))
    )
}

export default Profile;