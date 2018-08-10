import React from "react";
import PropTypes from "prop-types";

function Control(props) {
  return (
    <div style={{textTransform: "capitalize"}}>
      <h2 id={props.type + "-label"}>{props.type} Length</h2>
      <p id={props.type + "-length"}>{props.value}</p>
      <button id={props.type + "-decrement"} onClick={props.handleDecrement}>Minus</button>
      <button id={props.type + "-increment"} onClick={props.handleIncrement}>Plus</button>
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
