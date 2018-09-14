import React from "react";
import ReactDOM from "react-dom";
import Grid from "./Grid";
import Display from "./Display";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.BUTTONS = [
      {id:"clear", value:"AC", size: "2w"},
      {id:"divide", value:"/"},
      {id:"multiply", value:"X"},
      {id:"seven", value:7},
      {id:"eight", value:8},
      {id:"nine", value:9},
      {id:"subtract", value:"-"},
      {id:"four", value:4},
      {id:"five", value:5},
      {id:"six", value:6},
      {id:"add", value:"+"},
      {id:"one", value:1},
      {id:"two", value:2},
      {id:"three", value:3},
      {id:"equals", value: "=", size:"2h"},
      {id: "zero", value: 0, size:"2w"},
      {id:"decimal", value:"."}
    ];
  }

  render() {
    return (
      <div className="calc">
        <Display value="0" />
        <div className="calc__grid">
          <Grid buttons={this.BUTTONS} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
