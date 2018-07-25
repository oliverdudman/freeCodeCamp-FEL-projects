import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";

const marked = window.marked;
const renderer = new marked.Renderer();

marked.setOptions({
  sanitise: true,
  breaks: true,
  gfm: true
});

renderer.link = function(href, title, text) {
  return `<a href="${href}" target="_blank" title="${title}">${text}</a>`;
};


class Previewer extends React.Component {
  render() {
    const text = marked(this.props.text, {renderer: renderer});
    const fullScreen = this.props.display === "previewer";
    if (this.props.display === "previewer" || this.props.display === "all") {
      return (
        <div className={"display-box display-box--previewer " + (fullScreen ? "active" : "")}>
          <Header text="Previewer" fullScreen={fullScreen} handleClick={this.props.handleFullScreen}/>
          <div id="preview" className="display-box__content" dangerouslySetInnerHTML={{__html: text}}></div>
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
