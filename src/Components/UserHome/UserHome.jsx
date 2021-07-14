import React, { Component } from 'react';
import './UserHome.scss';
import Instructions from './../Instructions/Instructions';
import Messages from './../Messages/Messages';
import NewOrder from './../NewOrder/NewOrder';
import PastOrders from './../PastOrders/PastOrders';
import Header from './../Header/Header';
import axios from 'axios';

class UserHome extends Component {

    state = {
        fullName: '',
        password: '',
        messages: '',
        dishes: '',
        msg: '',

        greetingMessage: '',
        instructionOpen: false,
        messagesOpen: false,
        activeLayout: 'home',
    }

    layout = {
        home: 'home',
        order: 'order',
        past: 'past',
    }


    // greeting user -----------------
    componentDidMount() {

        this.getMessages();

        this.setState({
            fullName: this.props.data.fullName,
            password: this.props.data.password,
            // messages: this.props.data.requestData.messages,
            // dishes: this.props.data.requestData.dishes
        })
    }


    getMessages = () => {
        axios.get('https://mzonit-rest.herokuapp.com/message')
            .then(result => {
                console.log(result)
                const msg = result.data.msg
                this.setState({ msg: msg })
            })
            .catch(err => {
                console.log(err);
            })
    }

    // greetingUser = () => {
    //     const date = new Date();
    //     const hour = date.getHours()
    //     let greetingMessage;

    //     if (hour < 12) {
    //         greetingMessage = 'בוקר טוב';

    //     } else if (hour < 18) {
    //         greetingMessage = 'צהריים טובים';

    //     } else {
    //         greetingMessage = 'ערב טוב';
    //     }
    //     return (
    //         <div className="greetings">
    //             <h1>{`${greetingMessage} ${this.state.fullName} :)`} </h1>
    //         </div>
    //     )
    // }

    // ------------------get year for the footer
    currentyear = () => {
        let year = new Date();
        return year.getFullYear();
    }

    // --------- open or close instruction modal
    openInstructions = () => {
        let { instructionOpen } = this.state;
        this.setState({ instructionOpen: !instructionOpen })
    }

    // --------- open or close instruction modal
    openMessages = () => {
        let { messagesOpen } = this.state;
        this.setState({ messagesOpen: !messagesOpen })
    }

    openOrderScreen = () => {
        this.setState({ activeLayout: this.layout.order })
    }

    openPastScreen = () => {
        this.setState({ activeLayout: this.layout.past })
    }

    // --------- back to home page
    backHome = () => {
        this.setState({ activeLayout: this.layout.home })
    }

    // --------- log out user
    logOut = () => {
        window.location.reload(false);
    }

    // switch between home components
    handleHomeActive = () => {
        let state = { ...this.state }
        const fullName = this.props.data.fullName;
        const password = this.props.data.password;

        const user = { fullName, password };

        switch (state.activeLayout) {
            case this.layout.order:
                return <NewOrder user={user} data={this.state} close={this.backHome} />

            case this.layout.past:
                return <PastOrders user={user} data={this.state} close={this.backHome} />

            default:
                return this.showHomeScreen()
        }
    }

    showHomeScreen = () => {

        let msg = null;
        if (this.state.msg) {
            msg = <div className="massgae">
                <span>הודעות מצוות חדר האוכל</span>
                <p>"{this.state.msg}"</p>
            </div>
        }

        return (
            <div className="home-main">
                {/*this.greetingUser()*/}

                {msg}

                <div className="links">
                    <button className="btn full" onClick={this.openOrderScreen}>
                        הזמנה חדשה<i className="fas fa-utensils" onClick={this.openOrder}></i>
                    </button>
                    <button className="btn outline" onClick={this.openPastScreen}> ההזמנות שלי</button>

                    {/*<button className="btn outline" onClick={this.openMessages}> הודעות מצוות חדר האוכל</button>*/}
                </div>
            </div>
        )
    }



    render() {

        return (
            <div className="userHome">
                <Header user={this.state.fullName}/>

                {this.handleHomeActive()}

                {this.state.messagesOpen ?
                    <Messages content={this.state.messages} onClose={() => this.openMessages()} /> : null}

                {this.state.instructionOpen ?
                    <Instructions onClose={() => this.openInstructions()} /> : null}



                <div className="footer">
                    <div className="links">
                        <button className="link" onClick={this.openInstructions}>
                            <span>הוראות שימוש</span>
                        </button>
                        <button className="link" onClick={this.logOut}>
                            <span>התנתק</span>
                        </button>
                    </div>
                    &copy; כל הזכויות שמורות למזונית {this.currentyear()}
                </div>
            </div>
        );
    }
}

export default UserHome;
