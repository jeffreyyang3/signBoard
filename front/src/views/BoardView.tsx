import StringMatrixView from "../components/StringMatrixView";
import { post } from "../helpers/apiClient";
import {
  DisplayMatrix,
  getMatrixInfoString,
  stringToPaddedOneMatrix,
} from "../matrix";
import { MatrixDisplayInfo } from "../types";
import React from "react";
import ActionCable from "actioncable";

interface Props {}
interface State {
  lineOne: string;
  lineTwo: string;
  lineThree: string;
  minLength: number;
  socket: WebSocket | null;
  presetName: string;
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
      presetName: "",
    };
  }

  componentDidMount() {
    let msg = JSON.stringify({
      command: "subscribe",
      identifier: JSON.stringify({
        channel: "MatrixBroadcastChannel",
      }),
    });

    // @ts-ignore
    const socket = new WebSocket("ws://localhost:3000/cable/presets");
    // @ts-ignore

    socket.addEventListener("open", (e) => {
      socket.send(msg);
    });

    socket.addEventListener("message", (m) => {
      console.log(m);
    });

    if (2 === 2) return;
    try {
      const socket = new WebSocket("ws://10.0.1.171:8080");
      this.setState({
        socket,
      });
      console.log(socket);
    } catch (e) {
      console.log("original websocket connection fails");
      console.log(e);
    }
  }

  async makeRequest() {
    const postBody = {
      info_string: this.threeLinesInfoString(),
      title: this.state.presetName,
    } as MatrixDisplayInfo;
    const res = await post({
      path: "presets",
      postBody,
    });
    console.log(res);
  }
  render() {
    return (
      <div>
        <h1>this is the board 4</h1>
        <button onClick={() => this.makeRequest()}>post request</button>
        <br />
        <input
          type="text"
          value={this.state.presetName}
          onChange={(e) => this.setState({ presetName: e.target.value })}
        />{" "}
        title of preset?
        <br />
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
        // this.sendToSocket();
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
