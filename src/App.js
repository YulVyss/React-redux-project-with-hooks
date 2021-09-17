import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react'
import Authentication from './components/Authentication';
import Photos from './components/Photos';
import SinglePhoto from './components/SinglePhoto';
import Error from './components/Error';
import { unsplash } from './components/Authentication'
import { toJson } from 'unsplash-js';
import { useSelector, useDispatch } from 'react-redux';
import { selectPhotos, selectToken, setToken } from './redux/photoReducer'

let access_token = ''


function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {

    if (window.location.search.split('code=')[1]) {
      access_token = window.location.search.split('code=')[1]
      localStorage.setItem('token', access_token);
      console.log('access_token')
      unsplash.auth.userAuthentication(access_token)
        .then(toJson)
        .then(json => {
          unsplash.auth.setBearerToken(json.access_token);
          dispatch(setToken(access_token))
        })
    } else if (token === '' && localStorage.getItem('token') && !window.location.search.split('code=')[1]) {
      access_token = localStorage.getItem('token')
      console.log('localStorage ' + localStorage.getItem('token'))

      // unsplash.auth.userAuthentication(access_token)
      //   .then(toJson)
      //   .then(json => {
      //     unsplash.auth.setBearerToken(json.access_token);
      //     dispatch(setToken(access_token))
      //   })

    }
  }, [])




  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="container header__body">
            <img src='/img/icons/stack-of-photos.png' className="App-logo" alt="logo" />
            <h1 className='title'>PhotoCollection</h1>
          </div>
        </header>
        <main className="main">
          <Switch>
            <Route exact path="/" component={Authentication} />
            <Route exact path="/photos" component={Photos} />
            <Route exact path="/photos/:id" component={SinglePhoto} />
            <Route component={Error} />
          </Switch>
        </main>
        <footer className="App-footer">
          <div className="container">
            <p>Made by: <a className="footer__link" href="http://юлиявыс.рф" target="_blank" rel="noreferrer">юлиявыс.рф</a></p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
