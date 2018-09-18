import React from "react";
import Proptypes from "prop-types";

function Display(props) {
  return (
    <div className="calc__display">
      <div id="display" className="calc__display__content">
        {props.value}
      </div>
    </div>

  );
}

Display.propTypes = {
  value: Proptypes.string.isRequired,
};

export default Display;
