import React from "react";
import Proptypes from "prop-types";

function Button(props) {
  return (
    <button id={props.id}>{props.value}</button>
  );
}

Button.propTypes = {
  id: Proptypes.string.isRequired,
  value: Proptypes.string.isRequired
};

export default Button;
