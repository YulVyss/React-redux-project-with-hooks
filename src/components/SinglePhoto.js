import React, { useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { connect, useSelector, useDispatch } from 'react-redux';
import { selectPhotos, selectPage } from '../redux/photoReducer'
import { unsplash } from './unsplash'

function SinglePhoto(params) {
  let { id } = useParams()
  let photos = useSelector(selectPhotos)
  let page = useSelector(selectPage)
  const [likeBut, setLikeBut] = useState('full__likes')
  let like = useRef()
  let photo = photos.filter(photo => photo.id === id)[0]

  const handleLikes = () => {
    if (!like.current.classList.contains('active')) {
      setLikeBut('full__likes active')
      unsplash.photos.likePhoto('R0ddJ4emqLo')
        .then(result => result.json())
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
            <img className="img" src={photo.urls.full} alt={photo.user.username} />
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
            <p className=''>Description: <b>{photo.description}</b></p>
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
