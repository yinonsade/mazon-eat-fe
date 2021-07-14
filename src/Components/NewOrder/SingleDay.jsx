import React, { Component } from 'react';
import './SingleDay.scss';
import Dish from './Dish/Dish'
import moment from 'moment'


class SingleDay extends Component {


    state = {
        order: null,
    }
    componentDidMount() {
        this.setState({ order: this.props.order })
    }



    onAddAmount(idx) {
        this.props.order.dishes[idx].amount++;
        this.props.order.sum += this.props.order.dishes[idx].price;
        this.setState({ order: this.props.order })
        this.props.onSumChange()

    }

    onSubAmount(idx) {

        if (this.props.order.dishes[idx].amount > 0) {
            this.props.order.dishes[idx].amount--;
            this.props.order.sum -= this.props.order.dishes[idx].price;
            this.setState({ order: this.props.order })
            this.props.onSumChange()
        }


    }

    render() {
        let dishes = null;
        let dayDate = null

        if (this.state.order) {
            dishes = this.state.order.dishes;
            dishes = dishes.map((dish, idx) => {
                return <Dish key={dish + idx}
                    dish={dish}
                    onAddAmount={() => this.onAddAmount(idx)}
                    onSubAmount={() => this.onSubAmount(idx)}
                />

            })
            dayDate = moment(this.state.order.dateOfMenu).format('DD/MM/YYYY');
        }



        return (
            <div className="SingleDay" >
                <div className="title">
                    <h3>{`יום ${this.props.dayTitle} - ${dayDate}`}</h3>
                    <span>{`סך ליום : ${this.props.order.sum} ₪`}</span>
                </div>

                <div className="content">
                    {dishes}
                </div>
            </div>
        );
    }
}

export default SingleDay;
