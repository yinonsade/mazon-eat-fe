import React, { Component } from 'react'
import './SinglePast.scss';
import moment from 'moment';

export default class SinglePast extends Component {

    state = {
        data: this.props.data
    }
    render() {
        const { data } = this.state;
        return (
            <div className="background" onClick={this.props.close}>
                <div className="dialog" onClick={e => { e.stopPropagation() }}>
                    <button className="close" onClick={this.props.close}>
                        <i className="fas fa-times"></i>
                    </button>


                    <div className="title">
                        <h3>פירוט הזמנה לתאריך
                            <span>{moment(data.date).format('DD/MM/YYYY')}</span>
                        </h3>
                    </div>

                    {data.dishes.map((order) => {
                        return (
                            <div key={Math.random()} className="details">
                                <span>{order.name}</span>
                                <span>X</span>
                                <span>{order.amount}</span>
                            </div>
                        )
                    })}
                    <div className="sum">
                        <h3>{`סך הזמנה:  ₪${data.sum}`}</h3>
                    </div>
                </div>
            </div>
        )
    }
}
