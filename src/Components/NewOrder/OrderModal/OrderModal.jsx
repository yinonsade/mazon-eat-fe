import React, { Component } from 'react';
import axios from 'axios';
import './OrderModal.scss'


// const 

class OrderModal extends Component {

    state = {
        finish : false,
    }
    sendOrderToServer() {

        console.log(this.props)
        const order = this.props.order;

        console.log(order)
        const sum = this.props.sum;
        const user = this.props.user;
        // console.log(props);
        axios.post('https://mzonit-rest.herokuapp.com/order', { order: order, sum: sum, user: user })
            .then(respone => {
    
                console.log(respone);
                // this.props.closeModal();
                this.setState({finish:true})
    
            })
            .catch(err => {
                console.log(err);
            })
    }


    refreshPage = () => {
        window.location.reload(false);
    }

    render() {

        
    console.log(this.props)
    const days = this.props.days;
    let daysOrders = this.props.order.map((order, idx) => {
 
        
        let dishes = <span className="dayDeatilDish">לא נבחרו מנות</span>;
        if (order.sum !== 0) {
            dishes = order.dishes.map(dish => {
                if(dish.amount > 0) {
                    return <span className="dayDeatilDish"
                    // key={dish + 1}>{`${dish.name} : ${dish.price} ₪ * ${dish.amount} = ${dish.price * dish.amount} ₪`} 
                    key={dish + 1}>
                    {`${dish.name} ${dish.amount} - ${dish.price * dish.amount} ₪`}
                </span>
                }
            })

        }
        return <div className="dayDeatil" key={order + idx}>
            <span key={Date.now()} className="dayDeatilTitle">יום {days[idx]}</span>
            <div key={Date.now() + 2} className="dayDeatilDishes">
                {dishes}
            </div>

        </div>

    });

    let finishTitle = null
    let btns =  <div className="btns-row">
                <button className="send"
                    onClick={() => this.sendOrderToServer()} >
                    שליחת הזמנה
                </button>
                <button className="cancel"
                    onClick={() => this.props.closeModal()} >
                    חזרה לתפריט
                </button>
            </div>

    if (this.state.finish) {
        btns = <button className="successBtn" onClick={this.refreshPage}>סגור</button>;
        finishTitle = <div className="successMsg">ההזמנה נשלחה בהצלחה</div>
        daysOrders = null;
    }

    return (



        <div className="orderModal">
        
            <div className="orderModalPopUp">
                <h2>{`סיכום הזמנה: ₪${this.props.sum} `}</h2>
                <div className="deatilsDiv">
                    {daysOrders}
                    {finishTitle}
                </div>
            {btns}
            </div>

        </div>
    );
 }
}
export default OrderModal;