/* eslint-disable no-console */

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class QuoteBox extends React.Component {
  render() {
    let text;
    let author;
    let tweetUrl;
    if (this.props.quote) {
      text = this.props.quote.text;
      author = `- ${this.props.quote.author}`;
      tweetUrl = encodeURI(`https://twitter.com/intent/tweet?text=${text} -${author}`);
    } else {
      text = "loading...";
      author = "";
      tweetUrl = "https://twitter.com/intent/tweet";
    }
    return (
      <div id="quote-box">
        <div id="text"><p>{text}</p></div>
        <div id="author"><p>{author}</p></div>
        <a id="tweet-quote" onClick={this.props.handleTweet} href={tweetUrl} target="_blank" rel="noopener noreferrer">Tweet</a>
        <button id="new-quote" onClick={this.props.handleNewQuote}>New Quote</button>
      </div>
    );
  }
}

QuoteBox.propTypes = {
  handleNewQuote: PropTypes.func.isRequired,
  handleTweet: PropTypes.func.isRequired,
  quote: PropTypes.object
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: null,
    };

    this.handleNewQuote = this.handleNewQuote.bind(this);
    this.handleTweet = this.handleTweet.bind(this);
    this.getNewQuote = this.getNewQuote.bind(this);
  }

  componentDidMount() {
    this.getNewQuote();
  }

  handleNewQuote() {
    this.getNewQuote();
    console.log("Get new quote");
  }

  handleTweet() {
    console.log("Tweet");
  }

  getNewQuote() {
    let funcName = "handleData" + new Date().getTime();
    console.log(funcName);

    window[funcName] = function(e) {
      clearInterval(interval);
      console.log(e);
      this.setState({quote: {author: e.quoteAuthor, text: e.quoteText}});
      delete window[funcName];
      document.getElementById("get-jsonp").remove();
    }.bind(this);

    let script = document.createElement("script");
    script.src = "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=" + funcName;
    console.log(script.src);
    script.id = "get-jsonp";
    document.getElementsByTagName("head")[0].appendChild(script);
    let interval = setTimeout(function() {
      console.log("still running!!");
    }, 400);
  }
  render() {
    return (
      <div className="background">
        <div className="background">
          <QuoteBox
            handleNewQuote={this.handleNewQuote}
            handleTweet={this.handleTweet}
            quote={this.state.quote}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
