import React from "react";
import PropTypes from "prop-types";

class Session extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let time = `${Math.floor(this.props.time/60)}:${(this.props.time % 60).toString().padStart(2, "0")}`;
    let text = this.props.onBreak ? "Break" : "Session";
    return (
      <div>
        <h2 id="timer-label">{text}</h2>
        <div id="time-left">{time}</div>
      </div>
    );
  }
}

Session.propTypes = {
  time: PropTypes.number.isRequired,
  onBreak: PropTypes.bool.isRequired
};

export default Session;
