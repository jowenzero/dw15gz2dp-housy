import React from 'react';

import '../styles/content_item.css';

const ContentItem = ({item}) => {
    return (
        <div className="content-item">
            <div className="content-tag-rect">{ item.condition }</div>
            <img src={ process.env.PUBLIC_URL + item.thumbnail } alt="" className="content-image"></img>
            <p className="content-info-1">{ item.price }</p>
            <p className="content-info-2">{ item.miniDescription }</p>
            <p className="content-info-3">{ item.miniLocation }</p>
        </div>
    )
}

export default ContentItem;