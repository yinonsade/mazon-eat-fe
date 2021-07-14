import React, { Component } from 'react';
// import axios from 'axios';
import './UserLogin.scss';
import logo from '../../images/logo.png';

class UserLogin extends Component {

    state = {
        username: '',
        accountNumber: '',

        loader: false,
        success: false,
        fail: false,

        usernameError: '',
        accountNumberError: ''
    }

    // update state with input value
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // form validation
    validate = () => {
        let usernameError;
        let accountNumberError;
        let letters = /^[a-z\u0590-\u05fe]+$/i; //check for hebrew and english letters only

        if (this.state.username.length < 3 ) {
            usernameError = 'שם המשתמש חייב להכיל 3 תווים לפחות'
        }

        else if (!this.state.username.match(letters)) {
            usernameError = 'שם המשתמש צריך להיות מורכב מאותיות בלבד'
        }

        else if (this.state.accountNumber === '') {
            accountNumberError = 'חובה להקליד סיסמא'
        }

        else if (isNaN(this.state.accountNumber)) {
            accountNumberError = 'הסיסמא חייבת  להכיל מספרים בלבד'
        }

        if (usernameError || accountNumberError) {
            this.setState({ usernameError, accountNumberError })
            return false;
        }
        return true
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { username, accountNumber } = this.state;

        const isValid = this.validate()
        if (isValid) {
            this.setState({ usernameError: '', accountNumberError: '' })
            this.setState({ loader: true })
            this.setState({ loader: false, success: true })
            // console.log(res.data)
            this.props.data(username, accountNumber)
            this.props.onClose()

            // axios.post(`http://localhost:8080/admin/login`, { username, accountNumber  })
            // .then(res => {
            //     console.log(res);

            //     this.setState({ loader: false, success: true })
            //     console.log(res.data)
            //     this.props.data(username, accountNumber ,this.data)
            //     this.props.onClose()
            // })
            // .catch(error => {
            //     console.log(error)
            //     this.setState({ loader: false, fail: true })
            // })
        }
    }



    render() {
        return (
            <div className="login">
                <div className="overlay">
                    <div className="loginModal">
                        <img src={logo} alt="logo" />

                        <div className="wrapInput">
                            <input
                                className="myInput"
                                placeholder="שם המזמין (שם מלא)"
                                name="username"
                                onChange={this.handleChange}
                                value={this.state.username}
                            />
                            <span className="icon"><i className="fas fa-user"></i></span>
                        </div>
                        <span className={this.state.usernameError ? 'error' : ''}>
                            {this.state.usernameError}
                        </span>


                        <div className="wrapInput">
                            <input
                                className="myInput"
                                placeholder="מספר חשבון (לוקש)"
                                type="accountNumber"
                                name="accountNumber"
                                onChange={this.handleChange}
                                value={this.state.accountNumber}

                            />
                            <span className="icon"><i className="fas fa-lock"></i></span>
                        </div>
                        <span className={this.state.accountNumberError ? 'error' : ''}>
                            {this.state.accountNumberError}
                        </span>

                        <button className="btn-login" onClick={this.handleSubmit}>
                            {this.state.loader ?
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15" stroke="#F4F2FF" strokeWidth="2" strokeLinecap="round" /></svg>
                                :
                                'כניסה'
                            }
                        </button>
                        {this.state.fail ? <span className="fail">אופס! ישנה בעיה, אנא נסו שנית</span> : ''}
                    </div>
                </div>
            </div>
        );
    }
}

export default UserLogin;


