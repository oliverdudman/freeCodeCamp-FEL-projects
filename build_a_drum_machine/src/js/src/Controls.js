import React from "react";
import PropTypes from "prop-types";
import SwitchInput from "./Switch";

class Controls extends React.Component {
  render() {
    return (
      <div className="controls">
        <div className="controls__item">
          <input className="controls__slider" type="range" min={0} max={1} step={0.01} value={this.props.volume} onChange={this.props.handleVolumeChange}></input>
          <div>Volume</div>
        </div>
        <SwitchInput handleClick={this.props.handleBankChange} active={Boolean(this.props.bank)} text="Bank"/>
        <SwitchInput handleClick={this.props.handlePowerChange} active={this.props.power} text="Power"/>
      </div>
    );
  }
}

Controls.propTypes = {
  handleVolumeChange: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired,
  handlePowerChange: PropTypes.func.isRequired,
  handleBankChange: PropTypes.func.isRequired,
  power: PropTypes.bool.isRequired,
  bank: PropTypes.number.isRequired
};

export default Controls;
