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
      visable: true,
      colorIndex: 0
    };

    this.COLORS = ["#ED5565", "#FC6E51", "#FFCE54", "#A0D468", "#48CFAD", "#4FC1E9", "#5D9CEC", "#AC92EC", "#EC87C0", "#CCD1D9"];

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
    let author;
    let text;
    let funcName = "handleData" + new Date().getTime();
    let interval = null;

    let script = document.createElement("script");
    script.src = "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=" + funcName;
    console.log(script.src);
    script.id = "get-jsonp";
    script.onerror = () => {console.log("script error");};
    document.getElementsByTagName("head")[0].appendChild(script);
    interval = setTimeout(function() {
      console.log("still running!!");
      text= "still loading...";
      clearInterval(interval);
      interval = null;
    }, 400);

    this.setState({visable: false}, () => {
      setTimeout(() => {
        console.log(author, script.src);
        let colorIndex = (this.state.colorIndex + 1) % this.COLORS.length;
        this.setState({
          quote: {author: author, text: text},
          visable: true,
          colorIndex: colorIndex
        });
      }, 1000);
    });


    window[funcName] = function(e) {
      author = e.quoteAuthor;
      text = e.quoteText;
      console.log(interval);
      if (!interval) {
        this.setState({quote: {author: author, text: text}, visable: true});
      }
      clearInterval(interval);
      interval = null;
      console.log(e);
      console.log("wrkig");
  }.bind(this);
}

  render() {
    const style = {
      backgroundColor: this.COLORS[this.state.colorIndex]
    };

    return (
      <div className="background" style={style}>
        <QuoteBox
          handleNewQuote={this.handleNewQuote}
          handleTweet={this.handleTweet}
          quote={this.state.quote}
          visable={this.state.visable}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
