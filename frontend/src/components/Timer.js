import React, { Component } from 'react';

class Timer extends Component {

    timerSetup = (total) => {
        let minutes = parseInt(total / 60000),
            seconds = minutes > 0 ? parseInt((total / 1000) / minutes) : parseInt(total / 1000);
        if (seconds > 59) {
            seconds -= 60;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        return minutes + ":" + seconds
    }
    render() {
        return (
            <React.Fragment>
                <h1>{this.timerSetup(Number(this.props.timer))}</h1>
            </React.Fragment>
        )
    }

}

export default Timer;