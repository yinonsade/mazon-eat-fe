import React from 'react';
import './Dish.scss'


function Dish(props) {


    return (
        <div className="dishInMenu">
            <div className="dish">
                <div className="dish-title">
                    <span className="name">{props.dish.name}</span>
                    <span className="price">{props.dish.price} ₪</span>
                </div>
                <div className="dish-info">
                    <span className="info">{props.dish.info}</span>
                    <span className="type">{props.dish.typeOfDish}</span>
                </div>
            </div>

            <div className="dishInMenuBtns">
                <button onClick={props.onAddAmount}>+</button>
                <span className="sum">{props.dish.amount}</span>
                <button onClick={props.onSubAmount}>-</button>
                {/*<span>{`סכום : ${props.dish.amount * props.dish.price}  ₪`}</span> */}

            </div>



        </div>
    );
}

export default Dish;