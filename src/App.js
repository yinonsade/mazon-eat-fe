import React, { Component } from 'react';
import './App.scss';
import UserLogin from './Components/UserLogin/UserLogin';
import UserHome from './Components/UserHome/UserHome';
import axios from 'axios';

class App extends Component {

  state = {
    loginOpen: true,
    fullName: '',
    password: '',
    serverRunning: false
  }

  componentDidMount = () => {
    axios.get('https://mzonit-rest.herokuapp.com/')
      .then(result => {
        if (result) {
          this.runApp()
        }
        // this.setState({ msg: msg })
      })
      .catch(err => {
        console.log(err);
      })
  }

  runApp = () => {
    setTimeout(() => {
      this.setState({ serverRunning: true })
    }, 2000);
  }


  // close modal after login
  closeLogin = () => {
    this.setState({ loginOpen: false })
  }

  // update state with user info
  handleData = (fullName, password) => {
    this.setState({
      fullName: fullName,
      password: password,
      // requestData: data
    })
  }

  render() {

    let loader = <div className="initLoader">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" /></svg>
    </div>

    if (this.state.serverRunning) {
      loader = null
    }

    let home = <UserHome data={this.state} />;
    let login = null;
    if (this.state.loginOpen) {
      login = <UserLogin onClose={() => this.closeLogin()} data={this.handleData} />;
      home = null;
    }

    return (
      <div className="App">

        {login}
        {home}
        {loader}

      </div>
    );
  }
}

export default App;
