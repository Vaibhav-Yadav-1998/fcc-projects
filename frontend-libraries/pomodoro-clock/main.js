import React from "react";
import ReactDOM from "react-dom";

function Controls({ name, length, increment, decrement }) {
  return (
    <div>
      <h3 id={`${name}-label`} className="label">
        {name} Length
      </h3>
      <div className="time-values">
        <button id={`${name}-increment`} onClick={() => increment(name)}>
          <i class="far fa-arrow-alt-circle-up fa-2x" />
        </button>
        <h4 id={`${name}-length`}>{length}</h4>
        <button id={`${name}-decrement`} onClick={() => decrement(name)}>
          <i class="far fa-arrow-alt-circle-down fa-2x" />
        </button>
      </div>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      brkLen: 5,
      sesLen: 25,
      label: "session",
      clockMin: 25,
      clockSec: 0,
      running: false
    };

    this.timer = this.timer.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }

  timer() {
    const { clockSec, clockMin, label, brkLen, sesLen } = this.state;

    if (clockSec > 0) {
      this.setState({
        clockSec: clockSec - 1
      });
    } else if (clockMin > 0) {
      this.setState({
        clockSec: 59,
        clockMin: clockMin - 1
      });
    } else if (clockMin === 0 && clockSec === 0 && label === "session") {
      this.beep.play();
      this.setState({
        clockMin: brkLen,
        clockSec: 0,
        label: "break"
      });
    } else if (clockMin === 0 && clockSec === 0 && label === "break") {
      this.beep.play();
      this.setState({
        clockMin: sesLen,
        clockSec: 0,
        label: "session"
      });
    }
  }

  start() {
    this.intervalId = setInterval(this.timer, 1000);
    this.setState({
      running: true
    });
  }

  stop() {
    clearInterval(this.intervalId);
    this.setState({
      running: false
    });
  }

  increment(name) {
    const { sesLen, brkLen, label, running } = this.state;

    if (running === false) {
      if (name === "session" && sesLen < 60) {
        this.setState({
          sesLen: sesLen + 1
        });

        if (label === "session") {
          this.setState({
            clockMin: sesLen + 1,
            clockSec: 0
          });
        }
      } else if (name === "break" && brkLen < 60) {
        this.setState({
          brkLen: brkLen + 1
        });

        if (label === "break") {
          this.setState({
            clockMin: brkLen + 1,
            clockSec: 0
          });
        }
      }
    }
  }

  decrement(name) {
    const { sesLen, brkLen, label, running } = this.state;

    if (running === false) {
      if (name === "session" && sesLen > 1) {
        this.setState({
          sesLen: sesLen - 1
        });

        if (label === "session") {
          this.setState({
            clockMin: sesLen - 1,
            clockSec: 0
          });
        }
      } else if (name === "break" && brkLen > 1) {
        this.setState({
          brkLen: brkLen - 1
        });

        if (label === "break") {
          this.setState({
            clockMin: brkLen - 1,
            clockSec: 0
          });
        }
      }
    }
  }

  reset() {
    clearInterval(this.intervalId);
    this.beep.pause();
    this.beep.currentTime = 0;
    this.setState({
      running: false,
      brkLen: 5,
      sesLen: 25,
      clockMin: 25,
      clockSec: 0,
      label: "session"
    });
  }

  render() {
    const { brkLen, sesLen, clockMin, clockSec, label, running } = this.state;

    return (
      <React.Fragment>
        <h1 className="heading">Pomodoro Clock</h1>

        <div>
          <h3 id="timer-label">{label}</h3>
          <h2 id="time-left">
            {clockMin > 9 ? clockMin : "0" + clockMin}:
            {clockSec > 9 ? clockSec : "0" + clockSec}
          </h2>

          {running === false ? (
            <button id="start_stop" onClick={this.start}>
              <i class="fas fa-play-circle fa-4x" />
            </button>
          ) : (
            <button id="start_stop" onClick={this.stop}>
              <i class="fas fa-pause-circle fa-4x" />
            </button>
          )}

          <button id="reset" onClick={this.reset}>
            <i class="fas fa-sync-alt fa-4x" />
          </button>
        </div>

        <div className="controls">
          <Controls
            name="break"
            length={brkLen}
            increment={this.increment}
            decrement={this.decrement}
          />
          <Controls
            name="session"
            length={sesLen}
            increment={this.increment}
            decrement={this.decrement}
          />
        </div>

        <audio
          id="beep"
          ref={sound => (this.beep = sound)}
          src="https://goo.gl/65cBl1"
          preload="auto"
        />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
