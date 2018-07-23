import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header(props) {
  const icon = props.fullScreen ? "minus" : "plus";
  return (
    <div id={props.text} className="display-box__header" onClick={() => props.handleClick(props.text)}>
      <h2>{props.text}</h2>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
}

Header.propTypes = {
  text: PropTypes.string.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  handleClick:PropTypes.func.isRequired
};

export default Header;
