import React from "react";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import Editor from "./Editor";
import Previewer from "./Previewer";

library.add(faMinus, faPlus);


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: "all",
      text: 'Oliver\'s React Markdown Previewer\n' +
            '=======\n\n' +
            'Sub-heading\n' +
            '-----------\n\n' +
            '### Another deeper heading\n\n' +
            'Paragraphs are separated\n' +
            'by a blank line.\n\n' +
            'Leave 2 spaces at the end of a line to do a\n' +
            'line break\n\n' +
            'Text attributes *italic*, **bold**,\n' +
            '`monospace`, ~~strikethrough~~ .\n\n' +
            'Shopping list:\n\n' +
            '* apples\n' +
            '* oranges\n' +
            '* pears\n\n' +
            'Numbered list:\n\n' +
            '1. apples\n' +
            '2. oranges\n' +
            '3. pears\n\n' +
            'The rain---not the reign---in\n' +
            'Spain.\n\n' +
            '*[Herman Fassett](https://freecodecamp.com/hermanfassett)*\n' +
            `${"```"}
            // this is a code block
            <h1>hi</h1>
            ${"```"}\n` +
            `![React Logo w/ Text](https://goo.gl/Umyytc)\n` +
            `> blockquote\n`
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFullScreen = this.handleFullScreen.bind(this);
  }

  handleChange(e) {
    let text = e.target.value;
    this.setState({text: text});
  }

  handleFullScreen(e) {
    if (this.state.display === "all") {
      let display = e.toLocaleLowerCase();
      this.setState({display: display});
    } else {
      this.setState({display: "all"});
    }
  }

  render() {
    return (
      <div className="container">
        <Editor
          text={this.state.text}
          handleChange={this.handleChange}
          display={this.state.display}
          handleFullScreen={this.handleFullScreen}
        />
        <Previewer
          text={this.state.text}
          display={this.state.display}
          handleFullScreen={this.handleFullScreen}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
