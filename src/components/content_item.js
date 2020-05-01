import React from 'react';
import { Container } from 'react-bootstrap';

import '../styles/content_item.css';

const ContentItem = ({item}) => {
    let cityName = "Jakarta";
    if (item.cityId === 1)
        cityName = "Jakarta";
    else if (item.cityId === 2)
        cityName = "Tangerang";
    else if (item.cityId === 3)
        cityName = "Bandung";  

    const rand = (item.price % 9) + 1;

    const formatNumber = (num) => {
        return Intl.NumberFormat('de-DE').format(num);
    }

    const labels = item.amenities.map((item, index) => (
        <div key={index} className="content-tag-rect">{item}</div>
    ))

    return (
        <div className="content-item">
            <Container fluid className="content-tag-pos">
                {labels}
            </Container>
            <img src={ process.env.PUBLIC_URL + `../images/House${rand}.png` } alt="" className="content-image"></img>
            <p className="content-info-1">Rp. { formatNumber(item.price) } / { item.typeRent }</p>
            <p className="content-info-2">{ item.bedRoom } Bed, { item.bathRoom } Baths, { formatNumber(item.area) } sqft</p>
            <p className="content-info-3">{ cityName }</p>
        </div>
    )
}

export default ContentItem;