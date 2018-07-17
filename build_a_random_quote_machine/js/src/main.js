/* eslint-disable no-console */

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class QuoteBox extends React.Component {
  render() {
    let text;
    let author;
    let tweetUrl;
    let style = this.props.visable ? {opacity: 1} : {opacity: 0};
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
      <div id="quote-box" style={style}>
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
  quote: PropTypes.object,
  visable: PropTypes.bool
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: null,
      visable: true
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

    let script = document.createElement("script");
    script.src = "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=" + funcName;
    console.log(script.src);
    script.id = "get-jsonp";
    document.getElementsByTagName("head")[0].appendChild(script);
    let interval = setTimeout(function() {
      console.log("still running!!");
    }, 400);

    this.setState({visable: false});
    let testVar = "hello Oliuver";
    let author;
    let text;

    window[funcName] = function(e) {
      author = e.quoteAuthor;
      text = e.quoteText;
      console.log(testVar);
      clearInterval(interval);
      console.log(e);
      console.log(this);
      setTimeout(() => {
        console.log(this);
        this.setState({
          quote: {author: author, text: text},
           visable: false},
           function() {
             console.log(this);
             setTimeout(() => {
               console.log(this);
               this.setState({visable: true});
             }, 1000);
        }.bind(this));
        delete window[funcName];
        document.getElementById("get-jsonp").remove();
    }, 1000);
  }.bind(this);
}

  render() {
    return (
      <div className="background">
        <div className="background">
          <QuoteBox
            handleNewQuote={this.handleNewQuote}
            handleTweet={this.handleTweet}
            quote={this.state.quote}
            visable={this.state.visable}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
