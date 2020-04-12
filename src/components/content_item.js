import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/content_item.css';

const ContentItem = ({item}) => {
    return (
        <Link to="/property" style={{ textDecoration: 'none', color: 'black' }}>
            <div className="content-item">
                <div className="content-tag-rect">{ item.condition }</div>
                <img src={ process.env.PUBLIC_URL + item.picture } alt="" className="content-image"></img>
                <p className="content-info-1">{ item.price }</p>
                <p className="content-info-2">{ item.description }</p>
                <p className="content-info-3">{ item.location }</p>
            </div>
        </Link>
    )
}

export default ContentItem;