import React from "react";
import Proptypes from "prop-types";

function Grid(props) {
  return (


        props.buttons.map((btn) => {
          let classes;
          let func;

          if (btn.size === "2w") {
            classes = "calc__btn calc__btn--2w";
          } else if (btn.size === "2h") {
            classes = "calc__btn calc__btn--2h";
          } else {
            classes = "calc__btn";
          }

          if (typeof(btn.value) === "number" || btn.value === ".") {
            func = props.handleNumClick;
          } else {
            func = props.handleClick;
          }
          return <button id={btn.id} className={classes} onClick={func} key={btn.id}>{btn.value}</button>;
        })



  );
}

Grid.propTypes = {
  buttons: Proptypes.array.isRequired,
  handleClick: Proptypes.func.isRequired,
  handleNumClick: Proptypes.func.isRequired
};

export default Grid;
