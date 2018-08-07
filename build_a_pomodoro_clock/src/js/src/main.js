import React from "react";
import ReactDOM from "react-dom";
import Session from "./Session";

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
    return (
      <div>
        <h2 id="break-label">Break Length</h2>
        <p id="break-length">{this.state.breakLength}</p>
        <button id="break-decrement" onClick={this.handleDecrementBreak}>Minus</button>
        <button id="break-increment" onClick={this.handleIncrementBreak}>Plus</button>
        <h2 id="session-label">Session Length</h2>
        <p id="session-length">{this.state.sessionLength}</p>
        <button id="session-decrement" onClick={this.handleDecrementSession}>Minus</button>
        <button id="session-increment" onClick={this.handleIncrementSession}>Plus</button>
        <Session time={clockTime} onBreak={this.state.onBreak}/>
        <button id="start_stop" onClick={this.handleToggleTimer}>Start/Stop</button>
        <button id="reset" onClick={this.handleResetTimer}>Reset</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
