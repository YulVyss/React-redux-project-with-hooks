import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Authentication from './components/Authentication';
import Photos from './components/Photos';
import SinglePhoto from './components/SinglePhoto';
import Error from './components/Error';
import { unsplash } from './components/Authentication'
import { toJson } from 'unsplash-js';

let access_token = ''
localStorage.setItem('token', access_token);

function App() {
  access_token = window.location.search.split('code=')[1] ? window.location.search.split('code=')[1] : localStorage.getItem('token');
  if (access_token !== '') {
    localStorage.setItem('token', access_token);
  }

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
