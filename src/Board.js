import { Chessground } from 'chessground'
import React from 'react'
import Swipeable from 'react-swipeable'

const IDS_OF_SOLVED_POSITIONS = 'ids_of_solved_positions'

export default class Board extends React.Component {
  state = {
    showSolution: false
  }

  update() {
    const { fen } = this.props.position
    const board = document.querySelector('#board')

    const orientation = this.props.whichSideMoves
    const chessground = Chessground(board, {
      orientation,
      viewOnly: false,
      fen,
      animation: {
        enabled: true,
        duration: 5000
      },
      drawable: {
        enabled: false
      },
      events: {
        move: (from, to) => {
          this.props.makeMove({ from, to })
          let ids = localStorage.getItem(IDS_OF_SOLVED_POSITIONS)
          if (ids) {
            ids = JSON.parse(ids)
          } else {
            ids = []
          }

          if (!ids.includes(this.props.id)) ids.push(this.props.id)
          localStorage.setItem(IDS_OF_SOLVED_POSITIONS, JSON.stringify(ids))
        }
      }
    })
  }

  componentDidUpdate() {
    this.update()
  }
  componentDidMount() {
    this.update()
  }

  next() {
    this.props.next()
    this.setState({ showSolution: false })
  }

  prev() {
    this.props.prev()
    this.setState({ showSolution: false })
  }

  render() {
    const {
      position: { info, solution, fen },
      all,
      solved,
      id,
      whichSideMoves,
      originalFen
    } = this.props
    return (
      <Swipeable
        style={{ height: '100%' }}
        onSwipedLeft={this.next.bind(this)}
        onSwipedRight={this.prev.bind(this)}
      >
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              height: '100%'
            }}
          >
            <div id="board" style={{ width: '300px', height: '300px' }} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginTop: '20px' }}>{info}</div>
            {(this.props.success || this.props.fail) && (
              <>
                <div style={{ marginTop: '20px' }}>Solution: {solution}</div>
                <a
                  href={`https://lichess.org/analysis/standard/${originalFen}_${
                    whichSideMoves[0]
                  }`}
                  target="_blank"
                >
                  Analyze on lichess
                </a>
              </>
            )}
            {this.props.success && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="icon success">✓</div>
                <div>Puzzle solved</div>
              </div>
            )}
            {this.props.fail && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="icon fail">✗</div>
                <div>Puzzle failed</div>
              </div>
            )}
            <div style={{ marginTop: '5px' }}>
              <button
                className="navigation_button"
                onClick={this.prev.bind(this)}
              >
                &lt;
              </button>
              <button
                className="navigation_button"
                onClick={this.next.bind(this)}
              >
                &gt;
              </button>
            </div>
            <div>Current: {id}</div>
            <span>
              Solved {solved} of {all}
            </span>
          </div>
        </div>
      </Swipeable>
    )
  }
}
