import React from "react";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons/faQuoteLeft';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons/faQuoteRight';
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import QuoteBox from "./QuoteBox";

library.add(faTwitter, faQuoteLeft, faQuoteRight);

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
    this.getNewQuote = this.getNewQuote.bind(this);
  }

  componentDidMount() {
    this.getNewQuote();
  }

  handleNewQuote() {
    this.getNewQuote();
  }

  getNewQuote() {
    let quote;
    let funcName = "handleData" + new Date().getTime();
    let interval = null;

    let script = document.createElement("script");
    script.src = "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=" + funcName;
    script.id = funcName;
    // eslint-disable-next-line no-console
    script.onerror = () => {console.log("Something went wrong: script error");};
    document.getElementsByTagName("head")[0].appendChild(script);

    // handle slow network/server
    interval = setTimeout(() => {
      quote = null;
      clearInterval(interval);
      interval = null;
    }, 400);

    this.setState({visable: false}, () => {
      setTimeout(() => {
        let colorIndex = (this.state.colorIndex + 1) % this.COLORS.length;
        this.setState({
          quote: quote,
          visable: true,
          colorIndex: colorIndex
        });
      }, 1000);
    });


    window[funcName] = (e) => {
      quote = {author: e.quoteAuthor, text: e.quoteText};
      // if slow network
      if (!interval) {
        this.setState({quote: quote});
      }
      clearInterval(interval);
      interval = null;
  };
}

  render() {
    const style = {
      backgroundColor: this.COLORS[this.state.colorIndex]
    };

    return (
      <div className="background" style={style}>
        <QuoteBox
          handleNewQuote={this.handleNewQuote}
          quote={this.state.quote}
          visable={this.state.visable}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
