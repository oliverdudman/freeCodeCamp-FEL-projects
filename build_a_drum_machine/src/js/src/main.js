import React from "react";
import ReactDOM from "react-dom";
import DrumPad from './DrumPad';

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);

    this.SOUNDS = {
      Q: {src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3", name: "Heater-1"},
      W: {src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3", name: "Heater-2"},
      E: {src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3", name: "Heater-3"},
      A: {src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3", name: "Heater-4"},
      S: {src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", name: "Heater-6"},
      D: {src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3", name: "Dsc_Oh"},
      Z: {src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3", name: "Kick 'n' Hat"},
      X: {src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", name: "Kick-1"},
      C: {src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3", name: "Cev_H2"}
    };

    this.state = {
      currentSound: null
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", (e) => {
      let c = String.fromCharCode(e.keyCode);
      if (this.SOUNDS[c]) {
        this.setState({currentSound: c});
      }
    });

  }

  handleClick(e) {
    let c = e.target.lastChild.id;
    this.setState({currentSound: c});
  }

  render() {
    const soundText = this.state.currentSound ? this.SOUNDS[this.state.currentSound].name : null;
    return (
      <div id="drum-machine">
        <div id="display">{soundText}</div>
        <DrumPad sounds={this.SOUNDS} handleClick={this.handleClick} currentSound={this.state.currentSound}/>
      </div>
    );
  }
}

ReactDOM.render(<DrumMachine />, document.getElementById("root"));
