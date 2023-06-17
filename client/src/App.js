import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios'
import AOS from 'aos'
import "aos/dist/aos.css";


import { AuthContext } from './helpers/AuthContext'
import AppNavbar from "./components/AppNavbar"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import AnswerPage from './pages/Answer';
import Profile from './pages/Profile';
import UserQuestions from './pages/UserQuestions';
import UserAnswers from './pages/UserAnswers';


function App() {

  const [authState, setAuthState] = useState()
  const [authUser, setAuthUser] = useState({})

  useEffect(() => {

    AOS.init({
      offset: -20,
      easing: 'ease-in-sine',
      delay: 100,
    });


    axios.get('http://localhost:3001/auth/user', {
      headers: {
        token: localStorage.getItem("token")
      }
    }).then(res => {
      if (res.data.error) {
        setAuthState(false)
        setAuthUser({})
      }
      else {
        setAuthState(true)
        setAuthUser(res.data.user_d)
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{ authState, setAuthState, authUser, setAuthUser }}>
      < Router >
        <>
          <AppNavbar />

          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/answer/:id" component={AnswerPage} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/userQuestions/" component={UserQuestions} />
            <Route exact path="/userAnswers/" component={UserAnswers} />
          </Switch>

        </>
      </Router >
    </AuthContext.Provider>
  );
}

export default App;
