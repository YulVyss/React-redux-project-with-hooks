import React, { useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { connect, useSelector } from 'react-redux';
import Unsplash, { toJson } from 'unsplash-js';
import { unsplash } from './Authentication'
import { selectPhotos } from '../redux/photoReducer'
import { accessKey } from './unsplash'
let token = localStorage.getItem('token')

const unsplashS = new Unsplash({
  accessKey: accessKey,
  callbackUrl: 'http://localhost:3000/photos', // manual, *follow, error
  response_type: 'code',
  // scope: 'public',
  bearerToken: token
});


function SinglePhoto(params) {
  let { id } = useParams()

  let photos = useSelector(selectPhotos)
  const access_token = localStorage.getItem('token')
  const [likeBut, setLikeBut] = useState('full__likes')
  let like = useRef()
  let photo = photos.filter(photo => photo.id === id)[0]
  console.log(access_token)
  const handleLikes = () => {
    if (!like.current.classList.contains('active')) {
      setLikeBut('full__likes active')
      unsplashS.photos.likePhoto(id)
        .then(toJson)
        .then(result => {
          console.log(result)
        })
    } else {
      setLikeBut('full__likes')
    }

  }
  if (photo) {

    return (
      <div className="container">
        <Link to="/photos" className="link-to-back">&#706;&#706; Photos</Link>
        <div className="full__wrapper">
          <div className="full__photo">
            <button onClick={handleLikes} className={likeBut} ref={like}></button>
            <img className="full__img" src={photo.urls.full} alt={photo.user.username} />
          </div>
          <div className="full__description">
            <a href={photo.user.links.html}
              className="full__user-name"
              style={{ fontSize: 24 }, { fontWeight: 700 }}
              target="_blank"
              rel="noreferrer"
            >{photo.user.name}</a>
            <p>ID: {photo.id}</p>
            <p className='full__date'>Date: <b>{photo.created_at.substr(0, 10)}</b></p>
            <p >Description: <b>{photo.description}</b></p>
            <p>User location: <b>{photo.user.location}</b></p>
            <p>Likes: {photo.likes}</p>
          </div>
        </div>

      </div>
    )
  } else {
    return window.location.href = "http://localhost:3000/Error"
  }
}
export default connect()(SinglePhoto)
