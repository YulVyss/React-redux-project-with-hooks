import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toJson } from 'unsplash-js';
import { unsplash } from '../App'
import Page from './Page'
import { getPhotos, selectPage, selectPhotos } from '../redux/photoReducer'



export default function Photos() {

  const [button, setButton] = useState('LOAD PHOTOS')
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const photosArr = useSelector(selectPhotos);


  let clickHandler = (event) => {
    event.preventDefault();
    let t = event.target;

    if (!t.classList.contains('add')) return true
    try {
      unsplash.search
        .photos('all', page, 10, { orientation: "portrait" })
        .then(toJson)
        .then(result => {
          setButton("LOAD MORE")
          dispatch(getPhotos(result.results))
          localStorage.setItem('photos', JSON.stringify(result.results));
        })
    } catch (err) {
      alert(err)
    }

  }

  const container = useRef()

  if (photosArr.length > 0) {

    return (
      <div className="container" ref={container} onClick={clickHandler}>
        <div className="container__body">
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
