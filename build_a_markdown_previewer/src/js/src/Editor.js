import React from "react";
import PropTypes from "prop-types";
import Header from "./header";

class Editor extends React.Component {
  render() {
    const fullScreen = this.props.display === "editor";
    if (this.props.display === "all" || this.props.display === "editor") {
      return (
        <div className={"display-box display-box--editor " + (fullScreen ? "active" : "")}>
          <Header text="Editor" fullScreen={fullScreen} handleClick={this.props.handleFullScreen}/>
          <textarea id= "editor" className="display-box__content" type="type" value={this.props.text} onChange={this.props.handleChange}/>
        </div>
      );
    } else {
      return null;
    }

  }
}

Editor.propTypes = {
  text: PropTypes.string.isRequired,
  display: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleFullScreen: PropTypes.func.isRequired
};

export default Editor;
