import React from 'react'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { searchPhoto, selectSinglePhoto } from '../redux/photoReducer'

export default function Page({ photos }) {


  return (
    <div className="container__body">
      {photos.map(photo =>
        <div className="photo" key={photo.id}>
          <Link to={`/photo/${photo.id}`}>{photo.id}</Link>
          {/* <a href={`/photo/${photo.id}`} target="_blank">{photo.id}</a> */}
          <img className="img" src={photo.urls.small} alt={photo.user} />
          {/* <div className="text">
            <p>likes {photo.likes}</p>
            <p className="date">{photo.created_at}</p>
            <a
              href={photo.user.links.html}
              className="user__link"
              target="_blank"
              rel="noreferrer"
            >{photo.user.name}</a>
            <p>{photo.id}</p>
          </div> */}
        </div>
      )}

    </div >
  )
}
