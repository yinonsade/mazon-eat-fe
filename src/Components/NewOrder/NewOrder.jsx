import React, { Component } from 'react';
// import Moment from 'react-moment';
import './NewOrder.scss';
import SingleDay from './SingleDay';
import axios from 'axios';
import OrderModal from './OrderModal/OrderModal';

const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי'];

class NewOrder extends Component {


    state = {
        fullName: this.props.data.fullName,
        password: this.props.data.password,
        totalCost: '',
        showModal: false,
        order: null,
        ordersWithSum: [],
        totalSum: 0,
        isAvailable: true,
        notAvailableMsg: ''
    }


    componentDidMount() {
        this.getMenu()
    }


    // get the menu from the server
    getMenu = () => {
        axios.get('https://mzonit-rest.herokuapp.com/menu')
            .then(result => {
                const menu = result.data.menu;
                const order = [];
                if(result.data.succses) { ///data.succes
                    menu.forEach((menu, idx) => {
                        const orderObj = {}
                        orderObj.dateOfMenu = menu.dateOfMenu;
                        orderObj.sum = 0;
                        orderObj.dishes = []
    
                        menu.dishes.forEach(dish => {
                            const dishObj = dish;
                            dishObj.amount = 0;
                            dishObj.sumOfDish = 0;
                            orderObj.dishes.push(dishObj);
                        })
                        order.push(orderObj);
                        // order.push({
                        // })
                    })
    
                    this.setState({ order: menu, ordersWithSum: order, showModal: false })
                } else {
                    this.setState({isAvailable : false , notAvailableMsg : result.data.msg});
                }


            })
            .catch(err => {
                console.log(err);
            })
    }

    // sort the dishes by days of the week and pass to day component
    sortDayDishes = () => {
        let allDishes = this.props.data.dishes;
    }

    onSumChangeHandler(idx) {
        // let sum = this.state.totalSum;

        let sum = 0;
        this.state.ordersWithSum.forEach(order => {
            sum += order.sum;
        })
        // sum+= this.state.ordersWithSum[idx].sum;

        this.setState({ totalSum: sum })
    }

    onOrderBtnHandler() {
        this.setState({ showModal: true })
    }

    onCloseModal() {
        this.setState({ showModal: false })
    }


    render() {
        const { totalCost } = this.state;
        let btnOrderDisabeld = true;
        let order = null;
        let openModal = null;


        if (this.state.showModal) {
            openModal = <OrderModal order={this.state.ordersWithSum}
                sum={this.state.totalSum}
                user={this.props.user}
                closeModal={() => this.onCloseModal()}
                days={days} />
        }



        if (this.state.totalSum > 0) {
            btnOrderDisabeld = false;
        }



        if (this.state.order) {

            order = this.state.ordersWithSum.map((dayOrder, idx) => {
                return <SingleDay dayTitle={days[idx]}
                    key={idx + dayOrder}
                    order={dayOrder}
                    onSumChange={() => this.onSumChangeHandler(idx)}
                    onAdd={() => this.onAddDish(idx)} />
            })
        }

        let showOrderForm = null

        // not avalibele div
        let notAvailable = <div className="notAv">
            {this.state.notAvailableMsg}
            <span className="back" onClick={this.props.close}>
                חזרה לעמוד הבית
                 <i className="fas fa-arrow-left" ></i>
            </span>
        </div>

        // menu order form
        if (this.state.isAvailable) {
            showOrderForm = <div>
                <div className="title">
                 {/*<div className={this.state.totalSum > 0 ? "totalSum active" : "totalSum"}>
                        <i className="fas fa-shopping-basket"></i>
                        <span>{`${this.state.totalSum} ${this.state.totalSum > 0 ? '₪' : " "}`}</span>
                </div> */}
                    <h2>הזמנה חדשה</h2>
                    <span className="goHome" onClick={this.props.close}>
                    לעמוד הבית
                        <i className="fas fa-arrow-left"></i>
                    </span>
                </div>
                <div className="menu">
                    {order}
                </div>
                <button className="sendBtn"
                    disabled={btnOrderDisabeld}
                    onClick={() => this.onOrderBtnHandler()}>
                    {`שליחת הזמנה בסך ${this.state.totalSum} ₪`}
                </button>
            </div>

            notAvailable = null
        }


        return (
            <div className="NewOrder">
                {openModal}
                {showOrderForm}
                {notAvailable}
            </div>
        );
    }
}

export default NewOrder;
