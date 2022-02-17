import StringMatrixView from "../components/StringMatrixView";
import {
  DisplayMatrix,
  getMatrixInfoString,
  stringToPaddedOneMatrix,
} from "../matrix";
import React from "react";

interface Props {}
interface State {
  lineOne: string;
  lineTwo: string;
  lineThree: string;
  minLength: number;
  socket: WebSocket | null;
}

class BoardView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      lineOne: "",
      lineTwo: "",
      lineThree: "",
      minLength: 0,
      socket: null,
    };
  }

  componentDidMount() {
    try {
      const socket = new WebSocket("ws://10.0.1.171:8080");
      this.setState({
        socket,
      });
      console.log(socket);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <h1>this is the board</h1>
        min pad
        <input
          type="number"
          value={this.state.minLength}
          onChange={(e) => this.setState({ minLength: Number(e.target.value) })}
        />
        <br />
        line 1
        <input
          type="text"
          value={this.state.lineOne}
          onChange={(e) =>
            this.setState({
              lineOne: e.target.value,
            })
          }
        />
        line 2
        <input
          type="text"
          value={this.state.lineTwo}
          onChange={(e) =>
            this.setState({
              lineTwo: e.target.value,
            })
          }
        />
        line 3
        <input
          type="text"
          value={this.state.lineThree}
          onChange={(e) =>
            this.setState({
              lineThree: e.target.value,
            })
          }
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(this.threeLinesInfoString());
          }}
        >
          copy string
        </button>
        {this.threeLinesPadded().lines.map((line, idx) => {
          return <StringMatrixView str={line} key={idx}></StringMatrixView>;
        })}
      </div>
    );
  }

  sendToSocket() {
    this.state.socket?.send(this.threeLinesInfoString());
  }

  componentDidUpdate(_: Props, prevState: State) {
    for (const stateProp of ["lineOne", "lineTwo", "lineThree", "minPad"]) {
      // @ts-ignore
      if (this.state[stateProp] !== prevState[stateProp]) {
        this.sendToSocket();
        return;
      }
    }
  }
  threeLinesInfoString() {
    return getMatrixInfoString(
      this.threeLinesPadded().lines.reduce(
        (acc, curr) => [...acc, ...stringToPaddedOneMatrix(curr)],
        [] as DisplayMatrix
      )
    );
  }

  threeLinesPadded() {
    const lines = [
      this.state.lineOne,
      this.state.lineTwo,
      this.state.lineThree,
    ];
    const maxLength = Math.max(
      ...lines.map((line) => line.length),
      this.state.minLength
    );
    return {
      lines: lines.map((line) => line.padEnd(maxLength, " ")),
      maxLength,
    };
  }
}
export default BoardView;
