import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toJson } from 'unsplash-js';
import { unsplash } from './Authentication'
import Page from './Page'
import { getPhotos, selectPage, selectPhotos } from '../redux/photoReducer'

export default function Photos() {
  const [photos, setPhotos] = useState([])

  let access_token = window.location.search.split('code=')[1] ? window.location.search.split('code=')[1] : localStorage.getItem('token');

  if (!localStorage.getItem('token')) {
    localStorage.setItem('token', access_token);
  }
  console.log(access_token)
  const [button, setButton] = useState('LOAD PHOTOS')
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const photosArr = useSelector(selectPhotos);

  useEffect(() => {
    if (access_token) {
      unsplash.auth.userAuthentication(access_token)
        .then(toJson)
        .then(json => {
          unsplash.auth.setBearerToken(json.access_token);
        });

      unsplash.search
        .photos('all', page, 10, { orientation: "portrait" })
        .then(toJson)
        .then(result => {
          setPhotos(result.results)
          setButton("LOAD MORE")
          dispatch(getPhotos(result.results))
          localStorage.setItem('photos', JSON.stringify(result.results));
        })
    } else {
      return window.location.href = "http://localhost:3000"
    }
  }, [])


  let clickHandler = (event) => {
    event.preventDefault();
    let t = event.target;

    if (!t.classList.contains('add')) return true
    unsplash.search
      .photos('all', page, 10, { orientation: "portrait" })
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
