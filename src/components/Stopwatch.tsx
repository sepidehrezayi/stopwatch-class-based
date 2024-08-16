import { Component, ClassAttributes } from "react";
import formattedSeconds from "../utils/timeFormatter";
import Lap from "./Lap";

interface StopwatchProps extends ClassAttributes<Stopwatch> {
  initialSeconds: number;
}

//we need an interface for the states and then pass it to the class instead of any
interface StopwatchState {
  secondsElapsed: number;
  lastClearedIncrementer: number;
  isStarted: boolean; //added this state to track which button is clicked, to be used in ComponentDidUpdate
  laps: number[]; //change any to number
}

class Stopwatch extends Component<StopwatchProps, StopwatchState> {
  incrementer: number; //change any to number
  constructor(props: StopwatchProps) {
    super(props);
    this.state = {
      secondsElapsed: props.initialSeconds,
      lastClearedIncrementer: -1, //change null to -1
      isStarted: false,
      laps: [],
    };
    this.incrementer = -1; //initialize incrementer
  }

  //lifecycle methods to handle starting,stopping and cleaning the interval
  componentDidUpdate(
    prevProps: Readonly<StopwatchProps>,
    prevState: Readonly<StopwatchState>
  ): void {
    // Check if isStarted has changed
    if (prevState.isStarted !== this.state.isStarted) {
      if (this.state.isStarted) {
        // Start the interval if the stopwatch has started
        this.incrementer = setInterval(() => {
          this.setState((prevState) => ({
            secondsElapsed: prevState.secondsElapsed + 1,
          }));
        }, 1000);
      } else {
        // Clear the interval if the stopwatch has stopped
        clearInterval(this.incrementer);
        this.setState({
          lastClearedIncrementer: this.incrementer,
        });
      }
    }
  }

  componentWillUnmount() {
    //i if the component is unmounted but the timer was not stopped. Prevent memory leaks
    if (this.incrementer) {
      clearInterval(this.incrementer);
    }
  }

  //all the handleClick functions must be binded to "this" or be implemented as arrow functions
  handleStartClick = () => {
    this.setState({ isStarted: true });
  };
  handleStopClick = () => {
    this.setState({ isStarted: false });
  };
  handleResetClick = () => {
    this.setState({
      laps: [],
      secondsElapsed: 0,
      isStarted: false,
    });
  };
  handleLabClick = () => {
    this.setState((prevState) => ({
      laps: [...prevState.laps, prevState.secondsElapsed],
    }));
  };

  handleDeleteClick = (index: number) => {
    this.setState((prevState) => ({
      laps: prevState.laps.filter((_, i) => i !== index),
    }));
  };
  render() {
    const { secondsElapsed, lastClearedIncrementer } = this.state;
    return (
      <div className="stopwatch">
        <h1 className="stopwatch-timer">{formattedSeconds(secondsElapsed)}</h1>
        <div className="btn-group">
          {secondsElapsed === 0 ||
          this.incrementer === lastClearedIncrementer ? (
            <button
              type="button"
              className="start-btn"
              onClick={this.handleStartClick}
            >
              start
            </button>
          ) : (
            <button
              type="button"
              className="stop-btn"
              onClick={this.handleStopClick}
            >
              stop
            </button>
          )}
          {secondsElapsed !== 0 &&
          this.incrementer !== lastClearedIncrementer ? (
            <button
              type="button"
              className="lap-btn"
              onClick={this.handleLabClick}
            >
              lap
            </button>
          ) : null}
          {secondsElapsed !== 0 &&
          this.incrementer === lastClearedIncrementer ? (
            <button
              type="button"
              className="reset-btn"
              onClick={this.handleResetClick}
            >
              reset
            </button>
          ) : null}
        </div>
        <div className="stopwatch-laps">
          {this.state.laps &&
            this.state.laps.map((lap, i) => (
              <Lap
                key={i}
                index={i + 1}
                lap={lap}
                onDelete={()=>this.handleDeleteClick(i)}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default Stopwatch;
