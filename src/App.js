import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup'
import Alert from './components/Alert';
import { useState, useEffect } from 'react'
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  useEffect(() => {
    // Check if the token is present in localStorage
    if (localStorage.getItem('token')) {
      // Remove the token if it exists
      localStorage.removeItem('token');
      console.log("app.js is called")
    }
  }, []);

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className='container'>
            <Switch>
              <Route exact path="/">
                <Home showAlert={showAlert} />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login showAlert={showAlert} />
              </Route>
              <Route exact path="/signup">
                <Signup showAlert={showAlert} />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
