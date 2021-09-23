import React, { useEffect } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useDispatch } from 'react-redux'
import Unsplash, { toJson } from 'unsplash-js';
import Authentication from './components/Authentication';
import Photos from './components/Photos';
import SinglePhoto from './components/SinglePhoto';
import Error from './components/Error';
import { getPhotos, setToken } from './redux/photoReducer'

global.fetch = fetch

const accessKey = '5d139d49dd0559b26a263cc4ebc346f2005a4a761ee32e6890475b167c8d6bbc';


export const unsplash = new Unsplash({
  accessKey: accessKey,
  secret: "0417212b15c877ff348acba7c70d083fb805d8bd4bb99d3dfd195397a7a0e94d",
  callbackUrl: 'http://localhost:3000/photos', // manual, *follow, error
  response_type: 'code',
});

export const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "read_user",
  "write_likes",
])


function App() {
  let access_token = window.location.search.split('code=')[1]
  const dispatch = useDispatch();

  useEffect(() => {
    if (access_token) {

      try {
        unsplash.auth.userAuthentication(access_token)
          .then(toJson)
          .then(json => {
            dispatch(setToken(access_token))
            unsplash.auth.setBearerToken(json.access_token);
            localStorage.setItem('token', access_token);
            unsplash.search
              .photos('all', 1, 10, { orientation: "portrait" })
              .then(toJson)
              .then(result => {

                dispatch(getPhotos(result.results))
              })
          })
      } catch (err) {
        alert(err)
      }
    }

  }, [access_token])


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
