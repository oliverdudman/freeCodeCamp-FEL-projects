import React from "react";
import PropTypes from "prop-types";

class Editor extends React.Component {
  render() {
    return (
      <textarea id= "editor" type="type" value={this.props.text} onChange={this.props.handleChange}/>
    );
  }
}

Editor.propTypes = {
  text: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Editor;
