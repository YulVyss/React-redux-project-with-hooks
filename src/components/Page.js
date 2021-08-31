import React from 'react'
import { Link } from "react-router-dom";

export default function Page({ photos }) {

  return (
    <div className="container__body">
      {photos.map(photo =>
        <div className="photo" key={photo.id}>
          <p><Link className="link_to_full" to={`/photo/${photo.id}`}>full</Link></p>
          <img className="img" src={photo.urls.small} alt={photo.user} />
          <div className="text">
            <p className='likes'>{photo.likes}</p>
            <a href={photo.user.links.html}
              className="user__link"
              target="_blank"
              rel="noreferrer"
            >{photo.user.name}</a>
            <p>Date: {photo.created_at.substr(0, 10)}</p>
          </div>

        </div>
      )}
    </div >
  )
}
