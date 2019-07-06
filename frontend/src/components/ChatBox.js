import React, { Component } from 'react';

class ChatBox extends Component {

    render() {
        const list = this.props.log.map((message, i) => { return (<p key={i}><span key={i} className="userTags">{message.user}: </span>{message.text}</p>) })
        return (
            <div ref={this.chatRef} id="chatBox" >
                {list}

            </div>
        )
    }
}

export default ChatBox;