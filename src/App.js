import React, { Component } from 'react';
import './App.css';
import GameMaster from './game/GameMaster'

class App extends Component {
  componentDidMount() {
    this.gm = new GameMaster(document.getElementById('canvas'));
  }

  render() {
    return (
      <div className="App">
        <div id="canvasWrapper">
          <div id="ui">
            <button id="b1">click me test</button>
            <button id="b2">cant click me test</button>
            <button id="b3">cant click me test</button>
          </div>
          <canvas id="canvas"> </canvas>
        </div>
      </div>
    );
  }
}

export default App;
