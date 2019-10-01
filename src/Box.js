import React, { Component } from 'react'
import './Box.css';

export default class Box extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false
        }
    }
    
    changeBg = () => {
        this.setState({
            isClicked: !this.state.isClicked
        });
    }
    render() {
        const {isClicked} = this.state
        return (
            <div className="box" style={{background: isClicked ? 'red' : '#e9ebee'}} onClick={this.changeBg}>
                <p className="para">{this.props.title}</p>
            </div>
        )
    }
}

