import React from "react";
import PropTypes from "prop-types";

class DrumPad extends React.Component {
  constructor(props) {
    super(props);

    Object.keys(this.props.sounds).forEach((key) => {
      this[key] = React.createRef();
    });
  }

  componentDidUpdate() {
    if (this.props.currentSound) {
      let audio = this[this.props.currentSound].current;
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }

  }

  render() {
    return (
      <div className="drum-pad-container">
        {Object.keys(this.props.sounds).map((key) => {
          return (
            <button id={this.props.sounds[key].name} className="drum-pad" onClick={this.props.handleClick} key={key}>{key}
              <audio id={key} className="clip" src={this.props.sounds[key].src} ref={this[key]}></audio>
            </button>
          );
        })}
      </div>
    );
  }
}

DrumPad.propTypes = {
  currentSound: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  sounds: PropTypes.object.isRequired
};

export default DrumPad;
