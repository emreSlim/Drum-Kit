import React from "react";
import './Drumpad.css'
export default class Drumpad extends React.Component {
  constructor(props) {
    super(props);
    this.volumeHandler = this.volumeHandler.bind(this);
  }

  componentDidMount() {
    this.volumeHandler();
    document
      .querySelector("#volume")
      .addEventListener("change", this.volumeHandler);
  }

  componentDidUpdate() {
    let audio = document.querySelector("#" + this.props.text);
    audio.load();
  }

  volumeHandler(e) {
    document.querySelector("#" + this.props.text).volume =
      document.querySelector("#volume").value * 0.01;
  }

  render() {
    return (
      <div className={"drum-pad " + this.props.text} id={this.props.id}>
        <audio
          src={this.props.url}
          id={this.props.text}
          className="clip"
          preload="auto"
        />
        {this.props.text}
      </div>
    );
  }
}
