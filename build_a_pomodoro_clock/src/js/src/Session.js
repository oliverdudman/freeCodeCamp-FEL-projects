import React from "react";

class Session extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let time = `${Math.floor(this.props.time/60)}:${(this.props.time % 60).toString().padStart(2, "0")}`;
    return (
      <div>
        <h2 id="timer-label">Session</h2>
        <p id="time-left">{time}</p>
      </div>
    );
  }
}

export default Session;
