import React, { Component } from 'react';
import './App.css';
import Board from './Board'
import './static/css/chessground.css'
import './static/css/theme.css'
import positions from './positions'
import Chess from 'chess.js'


const IDS_OF_SOLVED_POSITIONS = 'ids_of_solved_positions';

const getPositionId = positions => {
  let ids = localStorage.getItem(IDS_OF_SOLVED_POSITIONS);
  if (ids) {
    ids = JSON.parse(ids)
  } else {
    ids = []
  }
  for (let i = 0; i < positions.length; i++) {
    if (!ids.includes(i)) {
      return i;
    }
  }
}

const getState = (index = getPositionId(positions)) => {
  return {
    fail: false,
    success: false,
    moveCount: 0,
    index,
    position: positions[index],
    whichSideMoves: positions[index].condition === '1. ?' ? 'white' : 'black'
  }
}

class App extends Component {

  constructor() {
    super()
    this.state = getState()
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
          position={this.state.position}
          makeMove={({from, to}) => {
            const orientation = this.state.position.condition === '1. ?' ? 'w' : 'b'
            const chess = new Chess();
            chess.load(`${this.state.position.fen} ${orientation} - - 1 1`)
            const solutionMoves = this.state.position.solution.replace(/\(.+\)/, '').replace(/\$\d+/, '').replace(/\d+\.+/g, '').trim().split(/\s+/)
            const chess2 = new Chess();
            chess2.load(`${this.state.position.fen} ${orientation} - - 1 1`)
            const isMoveValid = chess.move({from, to})

            if (isMoveValid) {
              this.setState({
                position: {
                  ...this.state.position,
                  fen: chess.fen().replace(/\s.+/, ''),
                  condition: this.state.position.condition === '1. ?' ? '1... ?' : '1. ?'
                },
              })
            }

            // const valid = chess2.move(solutionMoves[0], {sloppy: true})
            // const chess2fen = chess2.move(solutionMoves[0], {sloppy: true})
            // console.log({valid, chess2fen})
            console.log(chess2.fen())
            console.log(solutionMoves[this.state.moveCount])
            
            const mCorrect = chess2.move(solutionMoves[this.state.moveCount], {sloppy: true})
            if (!mCorrect) {
              console.log('move is not correct')
              console.log(chess2.fen())
            } 
            console.log(chess2.fen())

            if (chess.fen().replace(/\s.+/, '') === chess2.fen().replace(/\s.+/, '')) {
              console.log('right move')
              // debugger;
              if (solutionMoves.length > this.state.moveCount + 1) {
                setTimeout(() => {
                  // solutionMoves.shift();
                  // debugger;
                  // console.log(chess2.fen())
                  const isMoveValid = chess2.move(solutionMoves[this.state.moveCount + 1], {sloppy: true})
  
                  if (isMoveValid) {
                    this.setState({
                      moveCount: this.state.moveCount + 2,
                      position: {
                        ...this.state.position,
                        fen: chess2.fen().replace(/\s.+/, ''),
                        condition: this.state.position.condition === '1. ?' ? '1... ?' : '1. ?'
                      },
                    })
                  }
                }, 500)

              } else {
                this.setState({
                  success: true
                })
              }
              
            } else {
              this.setState({
                fail: true
              })
            }
          }}
          whichSideMoves={this.state.whichSideMoves}
          fail={this.state.fail}
          success={this.state.success}
          next={() => {
            this.setState(getState())
          }}
          prev={() => {
            this.state.index > 0 && this.setState(getState(this.state.index - 1))
          }}
        />
      </div>
    );
  }
}

export default App;
