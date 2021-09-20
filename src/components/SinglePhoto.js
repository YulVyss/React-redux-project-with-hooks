import React, { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { connect, useSelector, useDispatch } from 'react-redux'
import { toJson } from 'unsplash-js'
import { unsplash } from '../App'
import { selectPhotos, likePhoto, unLikePhoto } from '../redux/photoReducer'


function SinglePhoto(params) {
  let { id } = useParams()
  const dispatch = useDispatch()
  let photos = useSelector(selectPhotos)
  const access_token = localStorage.getItem('token')
  const [likeBut, setLikeBut] = useState('full__likes')
  let like = useRef()
  let photo = photos.filter(photo => photo.id === id)[0]
  useEffect(() => {
    if (photo.liked_by_user) {
      setLikeBut('full__likes active')
    } else {
      setLikeBut('full__likes')
    }
  }, [])

  const handleLikes = (id, access_token) => {
    if (!like.current.classList.contains('active')) {

      if (access_token) {
        try {
          unsplash.photos.likePhoto(id)
            .then(toJson)
            .then(result => {
              console.log(result)
              dispatch(likePhoto(id))
              setLikeBut('full__likes active')
            })
        } catch (err) {
          alert(err)
        }

      }
    } else {
      setLikeBut('full__likes')
      try {
        unsplash.photos.unlikePhoto(id)
          .then(toJson)
          .then(result => {
            console.log(result)
            dispatch(unLikePhoto(id))
          })
      } catch (err) {
        alert(err)
      }
    }
  }
  if (photo) {

    return (
      <div className="container">
        <Link to="/photos" className="link-to-back">&#706;&#706; Photos</Link>
        <div className="full__wrapper">
          <div className="full__photo">
            <button onClick={() => handleLikes(photo.id, access_token)} className={likeBut} ref={like}></button>
            <img className="full__img" src={photo.urls.full} alt={photo.user.username} />
          </div>
          <div className="full__description">
            <p><a href={photo.user.links.html}
              className="full__user-name"
              style={{ fontSize: 24 }, { fontWeight: 700 }}
              target="_blank"
              rel="noreferrer"
            >{photo.user.name}</a></p>
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
