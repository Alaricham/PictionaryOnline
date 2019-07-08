import React, { Component } from 'react';
import ChannelBox from './ChannelBox'
import Canvas from "./Canvas";
import Timer from './Timer';
import User from './User';
import InputBox from './InputBox';
import ChatBox from './ChatBox';
import { ChromePicker } from 'react-color';
import Slider from 'rc-slider';
import io from 'socket.io-client';
import '../stylesheets/root.css';
import '../stylesheets/App.css';
import '../stylesheets/UserInput.css';
import '../stylesheets/Menu.css'
import 'rc-slider/assets/index.css'

const socket = io.connect('/');

class App extends Component {
    constructor() {
        super();
        this.state = {
            awaiting: true,
            message: '',
            log: [],
            drawData: {},
            user: {},
            channel: null,
            word: false,
            timer: 120000,
            round: 1,
            atCanvas: false,
            points: 0,
            clear: false,
            winnerDisplay: { name: 'none', val: false },
            users: [],
            color: 'black',
            strokeSize: 1,
            lock: false,
            interval: null,
            pallette: { val: false },
            sliderTog: { val: false }
        }
    }

    disconnect = () => {
        this.setState({ channel: null, users: [] });
        console.log('her')
        socket.disconnect()
    }

    displayWinner = () => {
        if (this.state.winnerDisplay.val) {
            return (<div id='winner'>
                <h1>Winner {this.state.winnerDisplay.name}!</h1>
            </div>)
        }
    }

    awaitingPlayers = () => {
        if (this.state.awaiting) {
            return (<div id='awaitingPlayers'>
                <h1>Awaiting Players...</h1>
            </div>)
        }
    }

    submitMessage = (text) => {
        this.setState({ message: text });
        socket.emit('message', text);
    }

    componentDidMount() {
        socket.on('new message', (data) => {
            this.setState({ log: this.state.log.concat(data) })
        })

        socket.on('new drawing', (data) => {
            this.setState({ drawData: data.drawData })
        })
        socket.on('wordGuess', (data) => {
            this.setState({ word: data, lock: true })
        })

        socket.on('timer', (data) => {
            this.setState({ timer: data })
        })

        socket.on('noCanvas', () => {
            this.setState({ atCanvas: false })
        })

        socket.on('userAtCanvas', () => {
            this.setState({ atCanvas: true, lock: true })
        })

        socket.on('round', (data) => {
            this.setState({ round: data, lock: false })
        })

        socket.on('guess', (data) => {
            this.setState({ points: data, lock: true })
        })

        socket.on('correctGuess', (data) => {
            this.setState({ log: this.state.log.concat(data) })
        })

        socket.on('restart', () => {
            this.setState({ points: 0, log: [], clear: true, awaiting: false })
        })

        socket.on('winner', data => {
            let winAnim = setInterval(this.clearWin, 6000);
            this.setState({ interval: winAnim, winnerDisplay: { name: data, val: true } })
        })

        socket.on('userList', data => {
            this.setState({ users: data })
        })
        socket.on('clear', () => {
            this.setState({ clear: true })
        })

        socket.on('awaiting', () => {
            this.setState({ awaiting: true })
        })

    }

    clearWin = () => {
        this.setState({ winnerDisplay: { name: 'none', val: false } });
        console.log(this.state.interval)
        clearInterval(this.state.interval)
    }


    clearLift = () => {
        this.setState({ clear: false });
    }

    togglePallette = (event) => {
        if (!this.state.pallette.val) {
            this.setState({ pallette: { val: true } })
        } else {
            this.setState({ pallette: { val: false } })
        }
    }

    toggleSlider = (event) => {
        if (!this.state.sliderTog.val && this.state.atCanvas) {
            this.setState({ sliderTog: { val: true } })
        } else {
            this.setState({ sliderTog: { val: false } })
        }
    }

    emitClear = () => {
        socket.emit('clear');
    }

    sendDrawData = (data) => {
        socket.emit('drawing', data);
    }

    inputName = (event) => {
        if (event.key === 'Enter') {
            this.setState({ user: { name: event.target.value } })
        }
    }

    setColor = (color, event) => {
        if (this.state.atCanvas) {
            this.setState({ color: color.hex })
        }
    }

    strokeSize = (value) => {
        this.setState({ strokeSize: value });
    }

    renderChannel = () => {
        const { user, channel } = this.state;
        if (user && channel) {
            return (
                <div id="layout">
                    <div className="row">
                        <div className="col box1">
                            <div className='row'>
                                <div className="col set">
                                    <Canvas clearLift={this.clearLift} strokeSize={this.state.strokeSize} clear={this.state.clear} atCanvas={this.state.atCanvas} sendDrawData={this.sendDrawData} drawData={this.state.drawData} color={this.state.color} />
                                    <div id="sideMenu">
                                        {this.state.sliderTog.val && <div id='slider' onMouseLeave={() => this.setState({ sliderTog: { val: false } })}>
                                            <Slider vertical={true} onChange={this.strokeSize} min={1} max={100} value={this.state.strokeSize} />
                                        </div>}
                                        <div id="color" onClick={this.togglePallette}>
                                            <i className="fas fa-palette"></i>
                                            <div id='chromePicker' onMouseLeave={() => this.setState({ pallette: { val: false } })} >
                                                {this.state.pallette.val && <ChromePicker
                                                    onChangeComplete={this.setColor}
                                                    color={this.state.color}
                                                />}
                                            </div>
                                        </div>
                                        <div id="stroke" onClick={this.toggleSlider}>
                                            <i className="fas fa-sort-numeric-up"></i>
                                            <i className="fas fa-paint-brush"></i>
                                        </div>
                                        <div id="clear" onClick={this.emitClear} disabled={!this.state.lock}>
                                            <i className="fas fa-trash-alt"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div id="timerBox">
                                        <Timer timer={this.state.timer} />
                                        <h2>Round {this.state.round}</h2>
                                    </div>
                                    {this.state.atCanvas &&
                                        <div id="wordInfo">
                                            <h1>{this.state.word}</h1>
                                        </div>
                                    }
                                </div>
                            </div>
                            <InputBox submitMessage={this.submitMessage} lock={this.state.lock} />
                        </div>
                        {this.displayWinner()}
                        {this.awaitingPlayers()};
                        <div className="col box2">
                            <div id='userInfo'>
                                <h2>{this.state.user.name}</h2>
                                <h3>Score: {this.state.points}</h3>
                                <button className="btn" onClick={this.disconnect}>Disconnect</button>
                            </div>
                            <div id="userList">
                                {this.displayUsers(this.state.users)}
                            </div>
                            <ChatBox log={this.state.log} />
                        </div>

                    </div>
                </div>

            )
        }
    }

    renderUserInput = () => {
        if (!this.state.user.name) {
            return <User inputName={this.inputName} user={this.state.user} />
        }
    }

    renderChannelBox = () => {
        if (!this.state.channel && this.state.user.name) {
            socket.connect()
            return <ChannelBox socket={socket} user={this.state.user} inChannel={this.inChannel} users={this.state.users} displayUsers={this.displayUsers} />
        }
    }

    inChannel = (channel) => {
        this.setState({ channel: channel })
    }

    displayUsers = (users) => {
        if (users) {
            let mappedUsers = users.map((user, index) => {
                return (<li key={index}>{user}</li>)
            })
            return (<ul>{mappedUsers}</ul>)
        }
    }

    render() {
        return (
            <div className="App">
                {this.renderUserInput()}
                {this.renderChannelBox()}
                {this.renderChannel()}
            </div>
        );
    }
}


export default App;
