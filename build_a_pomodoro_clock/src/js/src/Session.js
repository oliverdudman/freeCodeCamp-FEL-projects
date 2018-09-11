import React from "react";
import PropTypes from "prop-types";

class Session extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let time = `${Math.floor(this.props.time/60).toString().padStart(2, "0")}:` +
               `${(this.props.time % 60).toString().padStart(2, "0")}`;
    let text = this.props.onBreak ? "Break" : "Session";
    let color = this.props.onBreak ? "green" : "blue";
    return (
      <div className="session" style={{backgroundColor: color}}>
        <h2 className="session__label" id="timer-label">{text}</h2>
        <div className="session__time" id="time-left">{time}</div>
      </div>
    );
  }
}

Session.propTypes = {
  time: PropTypes.number.isRequired,
  onBreak: PropTypes.bool.isRequired
};

export default Session;
