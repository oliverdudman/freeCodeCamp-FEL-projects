/* eslint-disable no-console */

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class QuoteBox extends React.Component {
  render() {
    return (
      <div id="quote-box">
        <p id="text"></p>
        <p id="author"></p>
        <button id="new-quote" onClick={this.props.handleNewQuote}>New Quote</button>
        <button id="tweet-quote" onClick={this.props.handleTweet}>Tweet</button>
      </div>
    );
  }
}

QuoteBox.propTypes = {
  handleNewQuote: PropTypes.func.isRequired,
  handleTweet: PropTypes.func.isRequired
};

class App extends React.Component {
  constructor(props) {
    super(props);

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
    window.getData = function(e) {
      clearInterval(interval);
      console.log(e);
      this.handleTweet();
      delete window.getData;
      document.getElementById("get-jsonp").remove();
    }.bind(this);

    let script = document.createElement("script");
    script.src = "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=getData";
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
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
