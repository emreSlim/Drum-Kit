import "./App.css";
import React from "react";
import $ from "jquery";
import { setArray } from "./data and key/setArray";
import PadContainer from "./components/PadContainer";
import SetSelector from "./components/SetSelector";

var timeout;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSet: setArray[0].set,
      keyArr: [],
      currentMode: "",
    };

    this.updateSetStates = this.updateSetStates.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  componentDidCatch(err, info) {
    console.log(err + ":" + info);
  }

  componentDidMount() {
    this.updateSetStates();
    $("#setSelector").on("change", this.updateSetStates);
    $(document).on("keydown keyup", this.handleKeydown);
    if ("ontouchstart" in window || navigator.msMaxTouchPoints) {
      $(".drum-pad").on("touchstart", this.handleClick);
    } else {
      $(".drum-pad").on("mousedown", this.handleClick);
    }
  }

  componentDidUpdate(preProps, preState) {}

  componentWillUnmount() {
    $("#setSelector").off("change", this.updateSetStates);
    $(document).off("keydown keyup", this.handleKeydown);
    if ("ontouchstart" in window || navigator.msMaxTouchPoints) {
      $(".drum-pad").off("touchstart", this.handleClick);
    } else {
      $(".drum-pad").off("mousedown", this.handleClick);
    }
  }

  handleClick(e) {
    e.target.childNodes[0].currentTime = 0;
    e.target.childNodes[0].play();
    this.display(e.target.id);
  }

  handleKeydown(e) {
    if (this.state.keyArr.includes(e.keyCode)) {
      let audio = document.querySelector("#" + String.fromCharCode(e.keyCode));
      if (e.type === "keydown") {
        audio.currentTime = 0;
        audio.play();
        this.display(audio.parentElement.id);

        $(audio.parentElement).css({
          "background-image":
            "radial-gradient(rgb(255, 250, 90), rgb(149, 132, 62))",
          border: "2px solid rgb(253, 228, 63)",
          "box-shadow": "0px 0px 2px 2px rgba(253, 228, 63, 0.5)",
        });
      } else {
        $(audio.parentElement).css({
          "background-color": "",
          "box-shadow": "",
          "background-image": "",
          border: "",
        });
      }
    }

    if (e.keyCode === 38 || e.keyCode === 39) {
      document.querySelector("#volume").value++;
      this.volumeDisplayer();
    }
    if (e.keyCode === 37 || e.keyCode === 40) {
      document.querySelector("#volume").value--;
      this.volumeDisplayer();
    }
  }

  volumeDisplayer() {
    document.querySelector("#volDisplay").innerText =
      "Volume: " + document.getElementById("volume").value;
  }

  display(text) {
    let disp = document.querySelector("#display");
    disp.innerText = text;
    clearTimeout(timeout);
    timeout = setTimeout(timeoutHandler, 5000);
    function timeoutHandler() {
      disp.innerText = "Instrument";
    }
  }

  updateSetStates() {
    let set = JSON.parse(document.querySelector("#setSelector").value);
    this.setState({
      currentSet: set.set,
      keyArr: set.set.map((obj) => obj.key.charCodeAt(0)),
      currentMode: set.name,
    });
  }

  render() {
    return (
      <div id="drum-machine">
        <h1 id="title">{this.state.currentMode}</h1>
        <SetSelector setArray={setArray} />
        <div className="display">
          <p id="display">Instrument</p>
          <p id="volDisplay">Volume: 50</p>
        </div>
        <input type="range" onChange={this.volumeDisplayer} id="volume" />
        <PadContainer
          set={this.state.currentSet}
          handleClick={this.handleClick}
        />
        <a
          id="cite"
          href="https://www.linkedin.com/in/imran-qureshi-92b822154/"
        >
          by Emre
        </a>
      </div>
    );
  }
}

export default App;
