import React, { Component } from 'react'
import './PastOrders.scss'
import axios from 'axios';
import SinglePast from './SinglePast';
import moment from 'moment'
import Loader from './../Loader/Loader';

export default class PastOrders extends Component {

    state = {
        data: null,
        pastOrderSelected : null,
        pastOrderOpen: false,
        accountNumber: this.props.user.password
    }

    componentDidMount = () => {
        this.getPastOrders()
    }

    getPastOrders = () => {
    const {accountNumber } = this.state;

        axios.get('https://mzonit-rest.herokuapp.com/order', { params: { accountNumber: accountNumber } })
        .then(result => {
            console.log(result)

            const data = result.data.orders
            this.setState({ data:data })
        })
        .catch(err => {
            console.log(err);
        })
    }

    openSinglePastOrder = (order)=> {
        this.setState ({ pastOrderSelected: order, pastOrderOpen: true })
    }

    closeModal = () => {
        this.setState ({ pastOrderOpen: false })
    }

    // translate day name from moment to hebrew
    translateDay = (day) => {
        switch (day) {
            case 'Sunday':
                return 'יום ראשון'
            case 'Monday':
                return 'יום שני'
            case 'Tuesday':
                return 'יום שלישי'
            case 'Wednesday':
                return 'יום רביעי'
            case 'Thursday':
                return 'יום חמישי'
            case 'Friday':
                return 'יום שישי'
            case 'Saturday':
                return 'יום שבת'
            default:
                break;
    }
}

    render() {

        let pastOrders = null;
        let loader = <Loader />

        if(this.state.data) {
            pastOrders = this.state.data.map((order) => {
                return (
                    <button className="orderBtn" key={order._id} 
                        onClick={()=>this.openSinglePastOrder(order)}
                    >
                    <span className="dayName">{this.translateDay(moment(order.date).format('dddd'))}</span>
                        <span>{moment(order.date).format('DD/MM/YYYY')}</span>
                        <span className="nameOf"> - {order.fullName}</span>
                    </button>
                )
            })
            loader = null
        }

        let pastOrderModal = null;
        if(this.state.pastOrderOpen) {
            pastOrderModal = <SinglePast 
                            data={this.state.pastOrderSelected}
                            close={this.closeModal}/>
        }


        return (
            <div className="past">
                <div className="title">
                    <h2>ההזמנות שלי</h2>
                    <span className="goHome" onClick={this.props.close}>
                    לעמוד הבית
                        <i className="fas fa-arrow-left"></i>
                    </span> 
                </div>

                <div className="content">
                    {loader}
                    {pastOrders}
                    {pastOrderModal}
                </div>
            </div>
        )
    }
}
