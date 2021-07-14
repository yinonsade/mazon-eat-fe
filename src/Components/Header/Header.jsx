import React, { Component } from 'react';
import './Header.scss';
import Logo from '../../images/evron_logo.png';

export default class Header extends Component {


     greetingUser = () => {
        const date = new Date();
        const hour = date.getHours()
        let greetingMessage;

        if (hour < 12) {
            greetingMessage = 'בוקר טוב';

        } else if (hour < 18) {
            greetingMessage = 'צהריים טובים';

        } else {
            greetingMessage = 'ערב טוב';
        }
        return (
            <div className="user">
                <p>{`${greetingMessage} ${this.props.user}`} </p>
            </div>
        )
    }


    render() {
        return (
            <div className="header">
                    {this.greetingUser()}

                <div className="logo">
                    <img src={Logo} alt="logo" />
                </div>
            </div>
        )
    }
}
