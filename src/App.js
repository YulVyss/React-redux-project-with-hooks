import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Authentication from './components/Authentication';
import Photos from './components/Photos';
import SinglePhoto from './components/SinglePhoto';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src='/img/icons/stack-of-photos.png' className="App-logo" alt="logo" />
          <h1 className='title'>PhotoCollection</h1>
        </header>
        <main className="main">
          <Switch>
            <Route exact path="/" component={Authentication} />
            <Route exact path="/photos" component={Photos} />
            <Route exact path="/photo/:id" component={SinglePhoto} />
          </Switch>
        </main>
        <footer className="App-footer"></footer>
      </div>
    </Router>

  );
}

export default App;
