import React from "react";
import ReactDOM from "react-dom";

const DrumPad = ({ name, url, id, code, display }) => {
  let music;
  return (
    <button
      id={name}
      className="drum-pad"
      onClick={() => {
        music.play();
        display(name);
      }}
    >
      <audio
        ref={sound => (music = sound)}
        src={url}
        className="clip"
        id={id}
        preload="auto"
        data-code={code}
        data-name={name}
      />
      {id}
    </button>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: null,
      keys: [
        {
          id: "Q",
          code: 81,
          name: "Heater 1",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
        },
        {
          id: "W",
          code: 87,
          name: "Heater 2",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
        },
        {
          id: "E",
          code: 69,
          name: "Heater 3",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
        },
        {
          id: "A",
          code: 65,
          name: "Heater 4",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
        },
        {
          id: "S",
          code: 83,
          name: "Clap",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
        },
        {
          id: "D",
          code: 68,
          name: "Open-HH",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
        },
        {
          id: "Z",
          code: 90,
          name: "Kick-n'-Hat",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
        },
        {
          id: "X",
          code: 88,
          name: "Kick",
          url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
        },
        {
          id: "C",
          code: 67,
          name: "Closed-HH",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
        }
      ]
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleDisplay = this.handleDisplay.bind(this);
  }

  handleKeyDown(e) {
    const sounds = document.querySelectorAll("audio");

    sounds.forEach(audio => {
      if (e.keyCode == audio.dataset.code) {
        audio.play();
        this.handleDisplay(audio.dataset.name);
      }
    });
  }

  handleDisplay(name) {
    this.setState({
      display: name
    });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  render() {
    const { display, keys } = this.state;

    return (
      <React.Fragment>
        <h1>Drum Machine</h1>
        <div id="drum-machine">
          {keys.length
            ? keys.map(key => (
                <DrumPad
                  name={key.name}
                  id={key.id}
                  url={key.url}
                  key={key.id}
                  code={key.code}
                  display={this.handleDisplay}
                />
              ))
            : null}
        </div>

        <h3 id="display">{display}</h3>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
