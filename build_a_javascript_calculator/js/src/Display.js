import React from "react";
import Proptypes from "prop-types";

function Display(props) {
  return (
    <div id="display" className="calc__display">
      <span>{props.value}</span>
    </div>
  );
}

Display.propTypes = {
  value: Proptypes.string.isRequired,
};

export default Display;
