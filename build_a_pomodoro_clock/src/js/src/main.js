import React from "react";
import ReactDOM from "react-dom";
import Session from "./Session";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breakLength: 5,
      sessionLength: 25,
      sessionRemaining: 25*60
    };

    this.handleIncrementSession = this.handleIncrementSession.bind(this);
  }

  handleIncrementSession() {
    let length = this.state.sessionLength + 1;
    this.setState({sessionLength: length, sessionRemaining: length*60});
  }

  render() {
    return (
      <div>
        <h2 id="break-label">Break Length</h2>
        <p id="break-length">{this.state.breakLength}</p>
        <button id="break-decrement">Minus</button>
        <button id="break-increment">Plus</button>
        <h2 id="session-label">Session Length</h2>
        <p id="session-length">{this.state.sessionLength}</p>
        <button id="session-decrement">Minus</button>
        <button id="session-increment" onClick={this.handleIncrementSession}>Plus</button>
        <Session time={this.state.sessionRemaining}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
