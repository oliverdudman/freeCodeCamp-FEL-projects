import React from "react";
import PropTypes from "prop-types";
import SwitchInput from "./Switch";

class Controls extends React.Component {
  render() {
    return (
      <div className="controls">
        <SwitchInput handleClick={this.props.handlePowerChange} />
        <div id="display">{this.props.displayText}</div>
        <input type="range" min={0} max={1} step={0.01} value={this.props.volume} onChange={this.props.handleVolumeChange}></input>
        <SwitchInput handleClick={this.props.handleBankChange}/>
      </div>
    );
  }
}

Controls.propTypes = {
  displayText: PropTypes.string.isRequired,
  handleVolumeChange: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired,
  handlePowerChange: PropTypes.func.isRequired,
  handleBankChange: PropTypes.func.isRequired
};

export default Controls;
