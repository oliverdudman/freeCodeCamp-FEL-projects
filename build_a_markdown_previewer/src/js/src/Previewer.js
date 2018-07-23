import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";

class Previewer extends React.Component {
  render() {
    const fullScreen = this.props.display === "previewer";
    if (this.props.display === "previewer" || this.props.display === "all") {
      return (
        <div className="display-box test-fs">
          <Header text="Previewer" fullScreen={fullScreen} handleClick={this.props.handleFullScreen}/>
          <div id="preview" dangerouslySetInnerHTML={{__html: window.marked(this.props.text)}}></div>
        </div>
      );
    } else {
      return null;
    }
  }
}

Previewer.propTypes = {
  text: PropTypes.string.isRequired,
  display: PropTypes.string.isRequired,
  handleFullScreen: PropTypes.func.isRequired
};


export default Previewer;
