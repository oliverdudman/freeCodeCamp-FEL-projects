import React from "react";
import Proptypes from "prop-types";

function Grid(props) {
  return (


        props.buttons.map((btn) => {
          let classes;

          if (btn.size === "2w") {
            classes = "calc__btn calc__btn--2w";
          } else if (btn.size === "2h") {
            classes = "calc__btn calc__btn--2h";
          } else {
            classes = "calc__btn";
          }
          return <button id={btn.id} className={classes} key={btn.id}>{btn.value}</button>;
        })



  );
}

Grid.propTypes = {
  buttons: Proptypes.array.isRequired,
};

export default Grid;
