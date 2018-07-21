import React from "react";
import ReactDOM from "react-dom";
import Editor from "./Editor";
import Previewer from "./Previewer"; 

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
            `> blockquote\n` +
            `![React Logo w/ Text](https://goo.gl/Umyytc)\n`
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let text = e.target.value;
    this.setState({text: text});
  }

  render() {
    return (
      <div>
        <Editor text={this.state.text} handleChange={this.handleChange} />
        <Previewer text={this.state.text} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
