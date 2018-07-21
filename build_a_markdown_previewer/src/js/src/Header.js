import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header(props) {
  const icon = props.fullScreen ? "minus" : "plus";
  return (
    <div className="display-box__header">
      <h2>{props.text}</h2>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
}

Header.propTypes = {
  text: PropTypes.string.isRequired,
  fullScreen: PropTypes.bool.isRequired
};

export default Header;
