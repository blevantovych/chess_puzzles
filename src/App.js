import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Board'
import './static/css/chessground.css'
import './static/css/theme.css'
// import './static/css/style.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Board />
      </div>
    );
  }
}

export default App;
