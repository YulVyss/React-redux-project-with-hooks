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

function App() {
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
            <Route exact path="/photo/:id" component={SinglePhoto} />
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
    //POST /photos/:id/like

  );
}

export default App;
