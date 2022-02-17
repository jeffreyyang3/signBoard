import StringMatrixView from "../components/StringMatrixView";
import React from "react";
const blockRows = 7 + 2;
const blockCols = 5 + 2;

interface Props {}
interface State {
  lineOne: string;
  lineTwo: string;
  lineThree: string;
  minLength: number;
}

class BoardView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      lineOne: "",
      lineTwo: "",
      lineThree: "",
      minLength: 0,
    };
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
        {this.threeLinesPadded().lines.map((line, idx) => {
          return <StringMatrixView str={line} key={idx}></StringMatrixView>;
        })}
      </div>
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
