import React, { Component } from 'react';

class InputBox extends Component {
    state = { inputBox: '' }

    liftMsg = (text) => {
        this.props.submitMessage(text);
    }

    submitText = (event) => {
        if (event.key === "Enter" && event.target.value !== '') {
            this.setState({ inputBox: '' })
            this.liftMsg(event.target.value);
        }
    }

    updateInput = (event) => {
        this.setState({ inputBox: event.target.value })
    }

    render() {
        return (
            <div id="inputBox">
                <input disabled={this.props.lock} placeholder={this.props.lock ? 'Chatting disabled until next turn' : 'Type your guess or chat'} onChange={this.updateInput} onKeyPress={this.submitText} value={this.state.inputBox}></input>
            </div>
        )
    }
}

export default InputBox;