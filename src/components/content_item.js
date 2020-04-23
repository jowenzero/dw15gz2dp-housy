import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import '../styles/content_item.css';

const ContentItem = ({item}) => {
    let cityName = "Jakarta";
    if (item.CityId === 1)
        cityName = "Jakarta";
    else if (item.CityId === 2)
        cityName = "Tangerang";
    else if (item.CityId === 3)
        cityName = "Bandung";  

    return (
        <div className="content-item">
            <Container fluid className="content-tag-pos">
                <Row>
                    <Col xs={3}>
                        { (item.amenities[0] === "Furnished" || item.amenities[1] === "Furnished" || item.amenities[2] === "Furnished") &&
                            <div className="content-tag-rect-1">Furnished</div>
                        }
                    </Col>
                    <Col xs={3}>
                        { (item.amenities[0] === "Pet Allowed" || item.amenities[1] === "Pet Allowed" || item.amenities[2] === "Pet Allowed") &&
                            <div className="content-tag-rect-2">Pet Allowed</div>
                        }
                    </Col>
                    <Col xs={6}>
                        { (item.amenities[0] === "Shared Accomodation" || item.amenities[1] === "Shared Accomodation" || item.amenities[2] === "Shared Accomodation") &&
                            <div className="content-tag-rect-3">Shared Accomodation</div>
                        }
                    </Col>
                </Row>
            </Container>
            <img src={ process.env.PUBLIC_URL + "../images/House1.png" } alt="" className="content-image"></img>
            <p className="content-info-1">Rp. { item.price } / { item.typeRent }</p>
            <p className="content-info-2">{ item.bedRoom } Bed, { item.bathRoom } Baths, { item.area } sqft</p>
            <p className="content-info-3">{ cityName }</p>
        </div>
    )
}

export default ContentItem;