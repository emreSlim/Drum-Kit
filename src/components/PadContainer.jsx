import React from 'react';
import Drumpad from "./Drumpad";
import './PadContainer.css';

export default class PadContainer extends React.Component {
  render() {
    if (this.props.set) {
      return (
        <div id="padContainer">
          {this.props.set.map((obj) => {
            return (
              <Drumpad
                text={obj.key}
                key={obj.key}
                id={obj.id}
                url={obj.url}
                handleClick={this.props.handleClick}
                code={obj.key.charCodeAt(0)}
              />
            );
          })}
        </div>
      );
    }
  }
}
