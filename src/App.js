import React from 'react';
import './App.css';

const rowStyle = {
  display: 'flex'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const winnerStyle = {
  'color': 'black'
}

const resetStyle = {
  'marginBottom': '10px'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'black'
}

class Square extends React.Component {
  
  clickSquare() {
    if( board[this.props.index] !== "")
      return
    let next_player = this.props.player_now
    let player_now = (this.props.player_now === "X" ? "0" : "X")
    let board = this.props.board
    board[this.props.index] = player_now
    this.props.playerCallback(player_now, next_player);
    this.value = player_now
    
    let winning = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]

    for(let i=0; i<winning.length; i++){
      let winning_row = winning[i];
      let p1 = winning_row[0];
      let p2 = winning_row[1];
      let p3 = winning_row[2];
      
      if(board[p1] !== "" && board[p1] === board[p2] && board[p2] === board[p3] && board[p3] === board[p1]) {
        this.props.winnerCallback(`Winner! The player ${player_now} won`)
      }
    }
    
    this.setState({
      player_now: player_now,
      board: board
    })
  }

  render() {
    return (
      <div
        className="square"
        style={squareStyle} 
        onClick={this.clickSquare.bind(this)}>
          <p>{this.props.board[this.props.index]}</p>
      </div>
    );
  }
}

class Game extends React.Component {

  constructor() {
    super(); 
    this.state = {
      player_now: "X",
      next_player: "",
      board: ["","","","","","","","","",],
      winner: ""
    }   
  }

  playerCallback = (player, next) =>{
    this.setState({
      player_now: player, 
      next_player: next
    })
  }

  winnerCallback = (winner) => {
    this.setState({winner: winner})
  }

  reset() {
    this.setState({
      player_now: "X",
      next_player: "",
      board: ["","","","","","","","","",],
      winner: ""
    })
  }

  render() {
    return (
      <div style={containerStyle} className="App">
        <p>Next player: {this.state.next_player}</p>
        <div><p style={winnerStyle}>{this.state.winner}</p></div>
        <button style={resetStyle} onClick={this.reset.bind(this)}>Reset</button>
        <div style={boardStyle}>
          <div className="board-row" style={rowStyle}>
            <Square index={0} board={this.state.board} player_now={this.state.player_now} playerCallback={this.playerCallback} winnerCallback={this.winnerCallback} />
            <Square index={1} board={this.state.board} player_now={this.state.player_now} playerCallback={this.playerCallback} winnerCallback={this.winnerCallback} />
            <Square index={2} board={this.state.board} player_now={this.state.player_now} playerCallback={this.playerCallback} winnerCallback={this.winnerCallback} />
          </div>
          <div className="board-row" style={rowStyle}>
            <Square index={3} board={this.state.board} player_now={this.state.player_now} playerCallback={this.playerCallback} winnerCallback={this.winnerCallback} />
            <Square index={4} board={this.state.board} player_now={this.state.player_now} playerCallback={this.playerCallback} winnerCallback={this.winnerCallback} />
            <Square index={5} board={this.state.board} player_now={this.state.player_now} playerCallback={this.playerCallback} winnerCallback={this.winnerCallback} />
          </div>
          <div className="board-row" style={rowStyle}>
            <Square index={6} board={this.state.board} player_now={this.state.player_now} playerCallback={this.playerCallback} winnerCallback={this.winnerCallback} />
            <Square index={7} board={this.state.board} player_now={this.state.player_now} playerCallback={this.playerCallback} winnerCallback={this.winnerCallback} />
            <Square index={8} board={this.state.board} player_now={this.state.player_now} playerCallback={this.playerCallback} winnerCallback={this.winnerCallback} />
          </div>
        </div>        
      </div>
    );
  } 
}

export default Game;