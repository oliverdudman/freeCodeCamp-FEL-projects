import React from "react";

function DrumPad(props) {
  return (
    Object.keys(props.sounds).map((key) => {
      return (
        <button id={key} className="drum-pad" key={key}>{key}
          <audio id={key} className="clip" src={props.sounds[key].src}></audio>
        </button>
      );
    })
  );
}

export default DrumPad;
