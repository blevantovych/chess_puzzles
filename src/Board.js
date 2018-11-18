import {Chessground} from 'chessground'
import React from 'react';

const IDS_OF_SOLVED_POSITIONS = 'ids_of_solved_positions';

export default class Board extends React.Component {

  state = {
    showSolution: false
  }

  update () {
    const {fen, condition} = this.props.position;
    const board = document.querySelector('#board')

    const orientation = condition === '1. ?' ? 'white' : 'black'
    Chessground(board, {
      orientation,
      viewOnly: false,
      fen,
      events: {
          move: () => {
            let ids = localStorage.getItem(IDS_OF_SOLVED_POSITIONS);
            if (ids) {
              ids = JSON.parse(ids)
            } else {
              ids = []
            }

            this.setState({
              showSolution: true
            })
            if (!ids.includes(this.props.id))
              ids.push(this.props.id)
            localStorage.setItem(IDS_OF_SOLVED_POSITIONS, JSON.stringify(ids))
          }
      }
    });
  }


  componentDidUpdate() {
    this.update();
  }
  componentDidMount () {
    this.update();
  }

  next() {
    this.props.next();
    this.setState({showSolution: false})
  }

  prev() {
    this.props.prev();
    this.setState({showSolution: false})
  }

  render() {
    const {position: {info, solution}, all, solved, id} = this.props;
    return (<div>
      <div id="board"></div>
      <div style={{marginTop: '20px'}}>
        {info}
      </div>
      {this.state.showSolution && <div style={{marginTop: '20px'}}>
        Solution: {solution}
      </div>}
      <div style={{marginTop: '50px'}}>
        <button className="navigation_button" onClick={this.prev.bind(this)}>&lt;</button>
        <button className="navigation_button" onClick={this.next.bind(this)}>&gt;</button>
      </div>
      <div>Current: {id}</div>
      <span>Solved {solved} of {all}</span>

    </div>)
  }
}


