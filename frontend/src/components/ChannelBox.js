import React, { Component } from "react";

class ChannelBox extends Component {

  state = {
    language: null, channel: null, users: [], channels: []
  }


  componentDidMount() {
    this.props.socket.on('channelList', data => {
      this.setState({ channels: data })
    })

  }

  toggle = (event, value) => {
    if (!value && event.target.tagName === 'LI') {
      event.target.classList.toggle('clicked')
    } else if (event.target.className === 'clicked' && value) {
      return
    } else {
      let parent = event.target.parentNode;
      parent.querySelectorAll('li').forEach(li => {
        if (li.className === 'clicked') {
          li.classList.toggle('clicked')
        }
      });
      if (event.target.tagName === 'LI') {
        event.target.classList.toggle('clicked')
      }
    }
  }


  selectLanguage = (event) => {
    this.setState({ language: event.target.textContent });
    this.props.socket.emit('channelList', event.target.textContent);

  }

  languageBoxes = () => {
    let languages = ['english', 'french', 'spanish', 'japanese'],
      mappedLanguages = languages.map((language, index) => {
        return (<li key={index}>{language}</li>)
      })
    return (<ul>{mappedLanguages}</ul>)
  }

  channelBoxes = () => {
    if (this.state.channels) {
      let mappedChannels = this.state.channels.map((channel, index) => {
        return (<li key={index}>{channel}</li>)
      })
      return (<ul>{mappedChannels}</ul>)
    }
  }

  selectChannel = (event) => {
    this.setState({ channel: event.target.textContent });
    this.props.socket.emit('userList', { channel: event.target.textContent, language: this.state.language });

  }

  addUser = () => {
    let { channel, language } = this.state,
      { name } = this.props.user;
    this.props.socket.emit('addUser', {
      name: name,
      channel: channel,
      language: language
    });
    this.props.inChannel(channel)
  }

  renderUserList = () => {
    let value = null;
    if (this.props.users.length && this.state.channel) {
      value = this.props.displayUsers(this.props.users)
    } else if (this.state.channel) {
      value = <p>Empty</p>;
    }
    return (value)
  }


  render() {
    return (
      <div className="special">
        <div className="row">
          <div className="col  ">
            <div onClick={(event) => { this.selectLanguage(event); this.toggle(event, this.state.language) }} id="Languages">
              {this.languageBoxes()}
            </div>
          </div>
          <div className="col " onClick={(event) => { this.selectChannel(event); this.toggle(event, this.state.channel) }}>
            <div id="Channels">
              {this.channelBoxes()}
            </div>
          </div>
          <div className="col">
            <div id="Users">
              {this.renderUserList()}
            </div>
            <button id="join" className='btn btn-primary' onClick={this.addUser}>Join</button>
          </div>
        </div >
      </div >
    )

  }
}

export default ChannelBox;
