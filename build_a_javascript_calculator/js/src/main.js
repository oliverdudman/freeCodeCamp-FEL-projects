import React from "react";
import ReactDOM from "react-dom";
import Row from "./Row";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="calc">
        <Row buttons={[{id:"clear", value:"AC", size: "2w"}, {id:"divide", value:"/"}, {id:"multiply", value:"X"}]} />
        <Row buttons={[{id:"seven", value:7}, {id:"eight", value:8}, {id:"nine", value:9}, {id:"minus", value:"-"}]} />
        <Row buttons={[{id:"four", value:4}, {id:"five", value:5}, {id:"six", value:6}, {id:"plus", value:"+"}]} />
        <Row buttons={[{id:"one", value:1}, {id:"two", value:2}, {id:"three", value:3}, {id:"equals", value: "=", size:"2h"}]} />
        <Row buttons={[{id: "zero", value: 0, size:"2w"}, {id:"decimal", value:"."}]} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
