import React from 'react';
import "./css/app.css";
import LandingPage from "./components/LandingPage.js";
import ProfilePage from "./components/ProfilePage.js";
import SignupPage from "./components/SignupPage.js";
import NewUserPage from "./components/NewUserPage.js";
import { Switch, withRouter, Route } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const databaseUrl = process.env.NODE_ENV === 'production' ? process.env.BACKEND_APP_URL : 'http://localhost:3001'

class App extends React.Component {
  state = {
    email: '',
    password: '',
    checkPass: '',
    firstName: "",
    lastName: "",
    gender: "",
    genderPreference: "",
    birthDate: "",
    profilePictures: [],
    dates: [],
    chatrooms: [],
    bio: "",
    location: "",
    isLoggedIn: false,
    user: null,
    fail: ''
  }
  componentDidMount() {
    if (localStorage.token) {
      this.setState({
        isLoggedIn: true
      })
    } else {
      this.setState({
        isLoggedIn: false
      })
      this.props.history.push('/login')
    }
  }
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleLogIn = (e) => {
    e.preventDefault()
    let loginUser = {
      email: this.state.email,
      password: this.state.password
    }
    axios(
      {
        method: 'post',
        url: `${databaseUrl}/api/users/signIn`,
        data: loginUser
      })
      .then(response => {
        console.log(response)
        window.localStorage.setItem('token', response.data.token)
        window.localStorage.setItem('location', response.data.user.location)
        window.localStorage.setItem('firstName', response.data.user.firstName)
        window.localStorage.setItem('_id', response.data.user._id)
        if (response.data.user.genderPreference) {
          window.localStorage.setItem('genderPreference', response.data.user.genderPreference)
        }
        this.setState({
          isLoggedIn: true,
          user: response.data.user,
          email: '',
          password: ''
        })
        if (response.data.user.firstName) {
          const location = {
            pathname: '/profile',
            state: { fromDashboard: true }
          }
          this.props.history.replace(location)
        } else {
          const location = {
            pathname: '/newuser',
            state: { fromDashboard: true }
          }
          this.props.history.replace(location)
        }
      })
      .catch(err => console.log(err))
  }
  toSignupPage = (e) => {
    e.preventDefault()
    const location = {
      pathname: '/signup',
      state: { fromDashboard: true }
    }
    this.props.history.replace(location)
  }
  handleSignup = (e) => {
    e.preventDefault()
    if (this.state.password === this.state.checkPass) {
      let signupUser = {
        email: this.state.email,
        password: this.state.password
      }
      axios(
        {
          method: 'post',
          url: `${databaseUrl}/api/users/signup`,
          data: signupUser
        })
        .then(response => {
          console.log(response)
          const location = {
            pathname: '/login',
            state: { fromDashboard: true }
          }
          this.props.history.replace(location)
        })
        .catch(err => console.log(err))
    } else {
      this.setState({ fail: 'Error, Make sure your passwords match.' })
    }
  }
  handleLogOut = (e) => {
    e.preventDefault()
    window.localStorage.clear()
    this.setState({
      email: '',
      password: '',
      isLoggedIn: false
    })
    this.props.history.push('/login')
  }
  handleUserUpdate = (e) => {
    e.preventDefault()
    let updateUser = {
      _id: this.state.user._id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      bio: this.state.bio,
      location: this.state.location
    }
    // need to make image functionality, probably a separate handler to push
    axios(
      {
        method: 'put',
        url: `${databaseUrl}/api/users/updateInfo`,
        data: updateUser
      })
      .then(response => {
        console.log(response)
        const location = {
          pathname: '/profile',
          state: { fromDashboard: true }
        }
        this.props.history.replace(location)
      })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/newuser'
            render={(props) => {
              return (
                <NewUserPage isLoggedIn={this.state.isLoggedIn} handleInput={this.handleInput} handleUserUpdate={this.handleUserUpdate} />
              )
            }}
          />
          <Route path='/profile'
            render={(props) => {
              return (
                <ProfilePage isLoggedIn={this.state.isLoggedIn} handleLogOut={this.handleLogOut} />
              )
            }}
          />
          <Route path='/login'
            render={(props) => {
              return (
                <LandingPage isLoggedIn={this.state.isLoggedIn} handleInput={this.handleInput} handleLogIn={this.handleLogIn} toSignupPage={this.toSignupPage} />
              )
            }}
          />
          <Route path='/signup'
            render={(props) => {
              return (
                <SignupPage isLoggedIn={this.state.isLoggedIn} handleInput={this.handleInput} handleSignup={this.handleSignup} fail={this.state.fail} />
              )
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App)
