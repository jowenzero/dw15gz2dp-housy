import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { API, setAuthToken } from "../config/api";

import '../styles/add_property.css';

import Login from '../components/login';

const AddProperty = () => {
    const [house, setHouse] = React.useState({});

    const handleChange = (event) => {
        const { data } = house;
        setHouse({
            data: { ...data, [event.target.name]: event.target.value },
        });
    };

    const handleCheckBoxChange = (event) => {
        const { data } = house;
        setHouse({
            data: { ...data, [event.target.name]: event.target.value },
        });
        const isChecked = event.target.checked;
        if (!isChecked)
            setHouse({
                data: { ...data, [event.target.name]: null },
            });
    };

    const addHouse = async (event) => {
        try {
            event.preventDefault();
            const token = localStorage.getItem('userToken');
            setAuthToken(token);
            const user = await API.get("/user");
            const auth = user.data.data;

            const { data } = house;
            let cityNum = 1;
            if (data.cityName === "Jakarta")
                cityNum = 1;
            else if (data.cityName === "Tangerang")
                cityNum = 2;
            else if (data.cityName === "Bandung")
                cityNum = 3;

            let bedNum = 1;
            if (data.bedRoom === "1")
                bedNum = 1;
            else if (data.bedRoom === "2")
                bedNum = 2;
            else if (data.bedRoom === "3")
                bedNum = 3;
            else if (data.bedRoom === "4")
                bedNum = 4;
            else if (data.bedRoom === "5")
                bedNum = 5;

            let bathNum = 1;
            if (data.bathRoom === "1")
                bathNum = 1;
            else if (data.bathRoom === "2")
                bathNum = 2;
            else if (data.bathRoom === "3")
                bathNum = 3;
            else if (data.bathRoom === "4")
                bathNum = 4;
            else if (data.bathRoom === "5")
                bathNum = 5;

            let amenities = new Array(0);
            if (data.amenities1) {
                amenities.push(data.amenities1); 
            }
            if (data.amenities2) {
                amenities.push(data.amenities2); 
            }
            if (data.amenities3) {
                amenities.push(data.amenities3); 
            }

            await API.post("/house", {
                name: data.name,
                CityId: cityNum,
                address: data.address,
                price: data.price,
                typeRent: data.typeRent,
                amenities: amenities,
                bedRoom: bedNum,
                bathRoom: bathNum,
                UserId: auth.id,
            });
            setHouse({});
            window.location.reload(true);
        } catch (error) {
            if (error.code === "ECONNABORTED") {
                console.log("Network Error!");
            } else {
                const { data, status } = error.response;
                console.log(data.message, status);
            }
        }
    };

    return (
        <div>
            <Login/>
            <div className="add-prop-bg">
                <h3 className="add-prop-title">Add Property</h3>
                <Container fluid className="add-prop-area">
                    <Form onSubmit={addHouse}>
                        <Form.Group controlId="addPropName">
                            <Form.Label className="add-prop-bold-text">Name Property</Form.Label>
                            <Form.Control type="text" required
                                name="name"
                                value={house.name && house.name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="addPropCity">
                            <Form.Label className="add-prop-bold-text">City</Form.Label>
                            <Form.Control as="select" required
                                name="cityName"
                                value={house.cityName && house.cityName}
                                onChange={handleChange}
                            >
                                <option>Jakarta</option>
                                <option>Tangerang</option>
                                <option>Bandung</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="addPropAddress">
                            <Form.Label className="add-prop-bold-text">Address</Form.Label>
                            <Form.Control as="textarea" rows="3" required
                                name="address"
                                value={house.address && house.address}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="addPropPrice">
                            <Form.Label className="add-prop-bold-text">Price</Form.Label>
                            <Form.Control type="number" required
                                name="price"
                                value={house.price && house.price}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="addPropTypeOfRent">
                            <Form.Label className="add-prop-bold-text">Type Of Rent</Form.Label>
                            <Form.Control as="select" required
                                name="typeRent"
                                value={house.typeRent && house.typeRent}
                                onChange={handleChange}
                            >
                                <option value="day">Day</option>
                                <option value="month">Month</option>
                                <option value="year">Year</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="addPropAmenities">
                            <Form.Label className="add-prop-bold-text">Amenities</Form.Label>
                            <br/>
                            <Form.Check inline type="checkbox" 
                                name="amenities1" 
                                value="Furnished"
                                className="add-prop-text" 
                                label="Furnished" 
                                id="1"
                                onChange={handleCheckBoxChange}
                            />
                            <Form.Check inline type="checkbox" 
                                name="amenities2" 
                                value="Pet Allowed"
                                className="add-prop-text" 
                                label="Pet Allowed" 
                                id="2"
                                onChange={handleCheckBoxChange}
                            />
                            <Form.Check inline type="checkbox" 
                                name="amenities3" 
                                value="Shared Accomodation"
                                className="add-prop-text" 
                                label="Shared Accomodation" 
                                id="3"
                                onChange={handleCheckBoxChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="addPropBedroom">
                            <Form.Label className="add-prop-bold-text">Bedroom</Form.Label>
                            <Form.Control as="select" required
                                name="bedRoom"
                                value={house.bedRoom && house.bedRoom}
                                onChange={handleChange}
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="addPropBathroom">
                            <Form.Label className="add-prop-bold-text">Bathroom</Form.Label>
                            <Form.Control as="select" required
                                name="bathRoom"
                                value={house.bathRoom && house.bathRoom}
                                onChange={handleChange}
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                        
                        <br/>
                        <Button variant="primary" type="submit" block>
                            Save
                        </Button>
                    </Form>
                </Container>
            </div>
        </div>
    )
}

export default AddProperty;