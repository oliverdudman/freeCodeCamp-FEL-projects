import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class QuoteBox extends React.Component {
  render() {
    let text;
    let author;
    let tweetUrl;
    let style = this.props.visable ? {opacity: 1} : {opacity: 0};
    if (this.props.quote) {
      text = this.props.quote.text;
      if (this.props.quote.author) {
        author = `- ${this.props.quote.author}`;
      } else {
        author = "- Anon";
      }
      tweetUrl = encodeURI(`https://twitter.com/intent/tweet?text=${text} -${author}`);
    } else {
      text = "loading...";
      author = "";
      tweetUrl = "https://twitter.com/intent/tweet";
    }
    return (
      <div id="quote-box" style={style}>
        <FontAwesomeIcon icon="quote-left" size="2x" className="quotes"/>
        <div id="text"><p>{text}</p></div>
        <FontAwesomeIcon icon="quote-right" size="2x" className="quotes quotes--right"/>
        <div id="author"><p>{author}</p></div>
        <a id="tweet-quote" className="btn" href={tweetUrl} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={["fab", "twitter"]} /> Tweet</a>
        <button id="new-quote" className="btn" onClick={this.props.handleNewQuote}>New Quote</button>
      </div>
    );
  }
}

QuoteBox.propTypes = {
  handleNewQuote: PropTypes.func.isRequired,
  quote: PropTypes.object,
  visable: PropTypes.bool
};

export default QuoteBox;
