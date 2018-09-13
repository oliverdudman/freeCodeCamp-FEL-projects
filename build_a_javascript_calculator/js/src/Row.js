import React from "react";
import Proptypes from "prop-types";

function Row(props) {
  return (
    <div>
      {
        props.buttons.map((btn) => {
          return <button id={btn.id} key={btn.id}>{btn.value}</button>;
        })
      }
    </div>

  );
}

Row.propTypes = {
  buttons: Proptypes.array.isRequired,
};

export default Row;
