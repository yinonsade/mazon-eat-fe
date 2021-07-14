import React, { Component } from 'react';
import './Messages.scss';
import axios from 'axios';

class Messages extends Component {

    state={
        loadder : false,
        msg : null,
    }

    componentDidMount() {

        axios.get('https://mzonit-rest.herokuapp.com/message')
        .then(result => {
            const msg = result.data.msg
            this.setState({msg:msg})
        })
        .catch(err => {
            console.log(err);
        })
        


    }

    render() {

        let msgBox = null;

        if (this.state.msg) {
        msgBox = [ <h1 key={'הודעות'}>הודעות</h1>,<p key={this.state.msg}>{this.state.msg}</p>]
        }
        
        return (
            <div className="Messages" onClick={this.props.onClose}>
                <div className="dialog" onClick={e=> {e.stopPropagation()}}>
                    {msgBox}
                    <button className="close" onClick={this.props.onClose}>
                    <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>
        );
    }
}

export default Messages;
