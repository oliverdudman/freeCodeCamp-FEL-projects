import React from "react";
import PropTypes from "prop-types";

function SwitchInput(props) {
  let classes = "controls__switch controls__switch__" + (props.active ? "on" : "off");
  return (
    <div className="controls__item">
      <button onClick={props.handleClick} className={classes}></button>
      <div>{props.text}</div>
    </div>
  );
}

SwitchInput.propTypes = {
  active: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default SwitchInput;
