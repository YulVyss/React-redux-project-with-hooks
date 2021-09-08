import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Unsplash, { toJson } from 'unsplash-js';
import { unsplash } from './Authentication'
import Page from './Page'
import { getPhotos, selectPage, selectPhotos } from '../redux/photoReducer'

export default function Photos() {
  const [photos, setPhotos] = useState([])
  const access_token = window.location.search.split('code=')[1];
  if (!localStorage.getItem('token')) {
    localStorage.setItem('token', access_token);
  }
  const [button, setButton] = useState('LOAD PHOTOS')
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  // console.log(page)
  const photosArr = useSelector(selectPhotos);

  useEffect(() => {
    // unsplash.auth.setBearerToken(access_token);

    unsplash.search
      .photos('all', page, 5, { orientation: "portrait" })
      .then(toJson)
      .then(result => {
        setPhotos(result.results)
        setButton("LOAD MORE")
        dispatch(getPhotos(result.results))
        localStorage.setItem('photos', JSON.stringify(result.results));
      })
  }, [])


  let clickHandler = (event) => {
    event.preventDefault();
    let t = event.target;

    if (!t.classList.contains('add')) return true
    unsplash.search
      .photos('all', page, 3, { orientation: "portrait" })
      .then(toJson)
      .then(result => {
        setPhotos(result.results)
        setButton("LOAD MORE")
        dispatch(getPhotos(result.results))
        localStorage.setItem('photos', JSON.stringify(result.results));
      })

  }
  const container = useRef()


  if (photosArr.length > 0) {
    console.log("photosArr")
    console.log(photosArr)

    return (
      <div className="container" ref={container} onClick={clickHandler}>
        <div className="container__body">
          {/* <Page photo={photosArr} /> */}
          {photosArr.map((page, index) => <Page key={index} photo={page} />)}

        </div>
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
