import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { connect, useSelector, useDispatch } from 'react-redux';
import { selectPhotos, selectPage } from '../redux/photoReducer'
import { unsplash } from './unsplash'

function SinglePhoto(params) {
  let { id } = useParams()
  let photos = useSelector(selectPhotos)
  let page = useSelector(selectPage)
  const [likeBut, setLikeBut] = useState('full__likes')
  console.log(page)
  let photo = photos.filter(photo => photo.id === id)[0]
  console.log(localStorage.getItem('photos'));

  const handleLikes = () => {

    // unsplash.photos.like(id)
    //   .then(result => {
    //     console.log(result)
    //   })
    setLikeBut('full__likes active')
  }

  return (
    <div className="container">
      <Link to="/photos" className="llink-to-back">&#706;&#706; Photos</Link>
      <div className="full__wrapper">
        <div className="full__photo">
          <button onClick={handleLikes} className={likeBut}></button>
          <img className="img" src={photo.urls.full} alt={photo.user.username} />
        </div>
        <div className="full__description">
          <p className="full__user-name" style={{ fontSize: 24 }}><b>{photo.user.name}</b></p>
          <p>ID: {photo.id}</p>
          <p className='full__date'>Date: <b>{photo.created_at}</b></p>
          <p className=''>Description: <b>{photo.description}</b></p>
          <p>User location: <b>{photo.user.location}</b></p>
          <p>Likes: {photo.likes}</p>
        </div>
      </div>

    </div>
  )
}
export default connect()(SinglePhoto)
