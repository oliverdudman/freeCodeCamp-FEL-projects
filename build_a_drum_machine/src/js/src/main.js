import React from "react";
import ReactDOM from "react-dom";
import DrumPad from './DrumPad';
import Controls from "./Controls";

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);

    this.SOUNDS = [
      {
        Q: {src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3", name: "Heater-1"},
        W: {src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3", name: "Heater-2"},
        E: {src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3", name: "Heater-3"},
        A: {src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3", name: "Heater-4"},
        S: {src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", name: "Heater-6"},
        D: {src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3", name: "Dsc_Oh"},
        Z: {src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3", name: "Kick 'n' Hat"},
        X: {src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", name: "Kick-1"},
        C: {src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3", name: "Cev_H2"}
      },
      {
        Q: {src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3", name: "Chord-1"},
        W:  {src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3", name: "Chord-2"},
        E: {src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3", name: "Chord-3"},
        A: {src: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3", name: "Give-us-a-light"},
        S: {src: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3", name: "Dry-Ohh"},
        D: {src: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3", name: "Bld-H1"},
        Z: {src: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3", name: "Punchy-Kick"},
        X: {src: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3", name: "Side-Stick"},
        C: {src: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3", name: "Brk-Snr"}
      }
    ];

    this.state = {
      volume: 0.4,
      bank: 0,
      power: true,
      displayText: ""
    };

    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handleBankChange = this.handleBankChange.bind(this);
    this.handleSetDisplayText = this.handleSetDisplayText.bind(this);
    this.handlePowerChange = this.handlePowerChange.bind(this);
  }

  handleVolumeChange(e) {
    if (this.state.power) {
      let volume = parseFloat(e.target.value);
      let text = "Volume: " + Math.floor(volume*100);
      this.setState({volume: volume, displayText: text});
    }
  }

  handleBankChange() {
    if (this.state.power) {
      let bank = this.state.bank === 0 ? 1 : 0;
      this.setState({bank: bank});
    }
  }

  handleSetDisplayText(text) {
    this.setState({displayText: text});
  }

  handlePowerChange() {
    let power = !this.state.power;
    let text = power ? "ON" : "OFF";
    this.setState({displayText: text, power: power}, () => {
      setTimeout(() => {this.setState({displayText: ""});}, 400);
    });
  }

  render() {
    return (
      <div id="drum-machine">
        <div id="display" className="display">{this.state.displayText}</div>
        <div className="drum-machine__container">
          <DrumPad
            sounds={this.SOUNDS[this.state.bank]}
            volume={this.state.volume}
            setDisplayText={this.handleSetDisplayText}
            power={this.state.power}
          />
          <Controls
            handleVolumeChange={this.handleVolumeChange}
            volume={this.state.volume}
            handleBankChange={this.handleBankChange}
            handlePowerChange={this.handlePowerChange}
            power={this.state.power}
            bank={this.state.bank}
          />
        </div>

      </div>
    );
  }
}

ReactDOM.render(<DrumMachine />, document.getElementById("root"));
