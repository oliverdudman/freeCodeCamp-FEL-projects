import React from "react";
import ReactDOM from "react-dom";
import Control from "./Control";
import Session from "./Session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause } from "@fortawesome/free-solid-svg-icons/faPause";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { faSync } from "@fortawesome/free-solid-svg-icons/faSync";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.DEFAULTS = {
      breakLength: 5,
      sessionLength: 25
    };

    this.state = {
      breakLength: this.DEFAULTS.breakLength,
      sessionLength: this.DEFAULTS.sessionLength,
      sessionRemaining: null,
      paused: true,
      onBreak: false,
    };

    this.handleDecrementBreak = this.handleDecrementBreak.bind(this);
    this.handleIncrementBreak = this.handleIncrementBreak.bind(this);
    this.handleIncrementSession = this.handleIncrementSession.bind(this);
    this.handleDecrementSession = this.handleDecrementSession.bind(this);
    this.handleToggleTimer = this.handleToggleTimer.bind(this);
    this.handleResetTimer = this.handleResetTimer.bind(this);

    this.beepRef = React.createRef();
  }

  handleIncrementBreak() {
    if (this.state.breakLength < 60) {
      let t = this.state.breakLength + 1;
      this.setState({breakLength: t});
    }
  }

  handleDecrementBreak() {
    if (this.state.breakLength > 1) {
      let t = this.state.breakLength - 1;
      this.setState({breakLength: t});
    }

  }

  handleIncrementSession() {
    if (this.state.sessionLength < 60) {
      let length = this.state.sessionLength + 1;
      this.setState({sessionLength: length});
    }
  }

  handleDecrementSession() {
    if (this.state.sessionLength > 1) {
      let t = this.state.sessionLength - 1;
      this.setState({sessionLength: t});
    }
  }

  handleToggleTimer() {
    if (!this.timer) {
      // if no current timer
      let t = this.state.sessionLength * 60;
      this.setState({sessionRemaining: t});
    }

    clearInterval(this.timer);

    if (this.state.paused) {
      this.setState({paused: false});

      this.timer = setInterval(() => {
        let t = this.state.sessionRemaining - 1;
        if (t < 0) {
          let audio = this.beepRef.current;
          audio.play();
          if (!this.state.onBreak) {
            this.setState({onBreak: true});
            t = this.state.breakLength * 60;

          } else {
            this.setState({onBreak: false});
            t = this.state.sessionLength * 60;
          }
        }
        this.setState({sessionRemaining: t});
      }, 1000);
    } else {
      this.setState({paused: true});
    }
  }

  handleResetTimer() {
    clearInterval(this.timer);
    this.timer = null;
    let audio = this.beepRef.current;
    audio.pause();
    audio.currentTime = 0;
    this.setState({
      breakLength: this.DEFAULTS.breakLength,
      sessionLength: this.DEFAULTS.sessionLength,
      sessionRemaining: null,
      paused: true,
      onBreak: false
    });
  }

  render() {
    let sR = this.state.sessionRemaining;
    let clockTime = Number.isInteger(sR) ? sR : this.state.sessionLength * 60;
    let startStop = this.state.paused ? faPlay : faPause;
    return (
      <div className="container">
        <h1 className="title">Pomodoro Clock</h1>
        <div className="clock">
          <div className="length-container">
            <Control
              type="break"
              value={this.state.breakLength}
              handleDecrement={this.handleDecrementBreak}
              handleIncrement={this.handleIncrementBreak}
            />
            <Control
              type="Session"
              value={this.state.sessionLength}
              handleDecrement={this.handleDecrementSession}
              handleIncrement={this.handleIncrementSession}
            />
          </div>
          <Session time={clockTime} onBreak={this.state.onBreak}/>
          <div className="time-control">
            <button className="time-control__btn" id="start_stop" onClick={this.handleToggleTimer}><FontAwesomeIcon icon={startStop} size="2x"/></button>
            <button className="time-control__btn" id="reset" onClick={this.handleResetTimer}><FontAwesomeIcon icon={faSync} size="2x" /></button>
          </div>
          <audio id="beep" ref={this.beepRef} src="../audio/beep.mp3"></audio>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
