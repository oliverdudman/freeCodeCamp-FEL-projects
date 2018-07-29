import React from "react";
import PropTypes from "prop-types";

class Controls extends React.Component {
  render() {
    return (
      <div className="controls">
        <div id="display">{this.props.soundText}</div>
        <input type="range" min={0} max={1} step={0.1}></input>
      </div>
    );
  }
}

Controls.propTypes = {
  soundText: PropTypes.string,
};

export default Controls;
