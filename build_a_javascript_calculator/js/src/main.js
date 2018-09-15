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

    this.state = {
      num1: "0",
      num2: null,
      operator: null
    };

    this.createNumber = this.createNumber.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleNumClick = this.handleNumClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  createNumber(curr, input) {
    let num = curr;
    if ((num === "0" && input !== ".") || num === null || typeof(num) === "number") {
      num = input;
    } else {
      if (!num.includes(".") || input !== ".") {
        num += input;
      }
    }
    return num;
  }

  handleClick(e) {
    // handle non-numeric btn clicks
    let btn = e.target.innerHTML;
    if (btn === "AC") {
      this.handleReset();
    } else if (btn === "=" || (this.state.num2 && btn !== "=")) {
      // run calc if chaining or if the equals btn is pressed
      let num1 = parseFloat(this.state.num1);
      let num2 = parseFloat(this.state.num2);
      let result = num1;// fail safe

      if (num2) {
        switch(this.state.operator) {
          case "/":
            result = num1 / num2;
            break;
          case "X":
            result = num1 * num2;
            break;
          case "+":
            result = num1 + num2;
            break;
          case "-":
            result = num1 - num2;
            break;
          default:
            result = num1;
        }
      }     

      let operator = btn !== "=" ? btn : null;// set operator for chaining

      this.setState({
        num1: result,
        num2: null,
        operator: operator
      });

    } else {
      // set operator when not chaining
      this.setState({operator: btn});
    }
  }

  handleNumClick(e) {
    // handle numeric btn clicks
    let currNum = this.state.operator ? "num2" : "num1";
    let value = this.createNumber(this.state[currNum], e.target.innerHTML);
    this.setState({[currNum]: value});
  }

  handleReset() {
    this.setState({
      num1: "0",
      num2: null,
      operator: null
    });
  }

  render() {
    let display = this.state.num1.toString();
    if (this.state.operator) {
      display += this.state.operator;
      if (this.state.num2) {
        display += this.state.num2;
      }
    }
    return (
      <div className="calc">
        <Display value={display} />
        <div className="calc__grid">
          <Grid
            buttons={this.BUTTONS}
            handleClick={this.handleClick}
            handleNumClick={this.handleNumClick}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
