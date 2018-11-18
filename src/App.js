import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Board'
import './static/css/chessground.css'
import './static/css/theme.css'
import positions from './positions'
// import './static/css/style.css'

const IDS_OF_SOLVED_POSITIONS = 'ids_of_solved_positions';

const getPositionId = positions => {
  debugger;
  let ids = localStorage.getItem(IDS_OF_SOLVED_POSITIONS);
  if (ids) {
    ids = JSON.parse(ids)
  } else {
    ids = []
  }
  for (var i = 0; i < positions.length; i++) {
    if (!ids.includes(i)) {
      return i;
    }
  }
}

class App extends Component {
  state = {
    index: getPositionId(positions)
  }
  render() {
    const ids = localStorage.getItem(IDS_OF_SOLVED_POSITIONS)
    const solved = ids ? JSON.parse(ids).length : 0;

    return (
      <div className="App">
        <Board
          id={this.state.index}
          all={positions.length}
          solved={solved}
          position={positions[this.state.index]}
          next={() => this.setState({index: getPositionId(positions)})}
          prev={() => {
            this.state.index > 0 && this.setState({index: this.state.index - 1})
          }}
        />
      </div>
    );
  }
}

export default App;
