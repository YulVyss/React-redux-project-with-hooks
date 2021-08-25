import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { connect, useSelector, useDispatch } from 'react-redux';
import { selectPhotos } from '../redux/photoReducer'


function SinglePhoto(params) {
  let { id } = useParams()
  let photos = useSelector(selectPhotos)
  let photo = photos.filter(photo => photo.id === id)[0]


  return (
    <div>
      <Link to="/photos" >Photos</Link>
      <div >
        <p className=''>{photo.id}</p>
        <img className="img" src={photo.urls.full} alt={photo.user.username} />
        <p>{photo.user.username}</p>
        <p className='date'>{photo.created_at}</p>
      </div>
    </div >
  )
}
export default connect()(SinglePhoto)
