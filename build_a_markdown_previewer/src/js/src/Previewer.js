import React from "react";
import PropTypes from "prop-types";

class Previewer extends React.Component {
  render() {
    return (
      <p id="preview" dangerouslySetInnerHTML={{__html: window.marked(this.props.text)}}></p>
    );
  }
}

Previewer.propTypes = {
  text: PropTypes.string.isRequired
};


export default Previewer;
