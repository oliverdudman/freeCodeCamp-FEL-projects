import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons/faAngleUp";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";

function Control(props) {
  return (
    <div style={{textTransform: "capitalize"}}>
      <h2 id={props.type + "-label"}>{props.type} Length</h2>
      <p id={props.type + "-length"}>{props.value}</p>
      <button id={props.type + "-decrement"} onClick={props.handleDecrement}><FontAwesomeIcon icon={faAngleDown} size="2x" /></button>
      <button id={props.type + "-increment"} onClick={props.handleIncrement}><FontAwesomeIcon icon={faAngleUp} size="2x"/></button>
    </div>
  );
}

Control.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  handleDecrement: PropTypes.func.isRequired,
  handleIncrement: PropTypes.func.isRequired
};

export default Control;
