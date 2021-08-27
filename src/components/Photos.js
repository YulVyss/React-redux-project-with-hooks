import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { unsplash } from './unsplash'
import Page from './Page'
import { getPhotos, selectPage, selectPhotos } from '../redux/photoReducer'

export default function Photos() {
  const [photos, setPhotos] = useState([])
  const code = window.location.search.split('code=')[1];
  localStorage.setItem('token', code);
  const [button, setButton] = useState('LOAD PHOTOS')
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  // console.log(page)
  const photosArr = useSelector(selectPhotos);
  console.log(photosArr)


  let clickHandler = (event) => {
    event.preventDefault();
    let t = event.target;

    if (!t.classList.contains('add')) return true
    unsplash.search
      .getPhotos({
        query: 'all',
        page: page,
        perPage: 3,
        orientation: 'portrait',
      })
      .then(result => {
        setPhotos(result.response.results)
        setButton("LOAD MORE")
        dispatch(getPhotos(result.response.results))
        localStorage.setItem('photos', JSON.stringify(result.response.results));
      })
  }

  if (photosArr.length > 0) {
    return (
      <div className="container" onClick={clickHandler}>
        <Page photos={photosArr} />
        {/* {photosArr.map((page, index) => <Page key={index} photos={page} />)} */}
        <button className="add">{button}</button>
      </div>
    )
  } else {
    return (
      <div className="container" onClick={clickHandler}>
        <button className="add">{button}</button>
      </div>
    )
  }
}
