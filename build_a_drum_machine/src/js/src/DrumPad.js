import React from "react";
import PropTypes from "prop-types";

class DrumPad extends React.Component {
  constructor(props) {
    super(props);

    Object.keys(this.props.sounds).forEach((key) => {
      this[key] = React.createRef();
    });

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.playAudio = this.playAudio.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(e) {
    let c = String.fromCharCode(e.keyCode);
    if (this[c]) {
      this.playAudio(this[c].current, this.props.sounds[c].name);
    }
  }

  handleClick(e) {
    let audio = e.target.lastChild;
    this.playAudio(audio, e.target.id);
  }

  playAudio(audio, text) {
    if (this.props.power) {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = this.props.volume;
      audio.play();
      this.props.setDisplayText(text);
    }

  }

  render() {
    return (
      <div className="drum-pad-container">
        {Object.keys(this.props.sounds).map((key) => {
          return (
            <button id={this.props.sounds[key].name} className="drum-pad" onClick={this.handleClick} key={key}>
              {key}
              <audio id={key} className="clip" src={this.props.sounds[key].src} ref={this[key]}></audio>
            </button>
          );
        })}
      </div>
    );
  }
}

DrumPad.propTypes = {
  setDisplayText: PropTypes.func.isRequired,
  sounds: PropTypes.object.isRequired,
  volume: PropTypes.number.isRequired,
  power: PropTypes.bool.isRequired
};

export default DrumPad;
