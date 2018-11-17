import {Chessground} from 'chessground'
import React from 'react';


export default class Board extends React.Component {

  componentDidMount () {
    const board = document.querySelector('#board')
    console.log('board')
    console.log(board)
    const ground =
      Chessground(board, {
                    viewOnly: false,
                    fen: '7k/6p1/3Q1pq1/7p/8/7P/5PP1/1r2R1K1 w - - 2 36',
                    events: {
                        move: (...args) => console.log(...args)
                    }
					// disableContextMenu: true
				});

  }
  render() {
    return (<div id="board"></div>)
  }
}


