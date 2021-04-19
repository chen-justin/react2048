import React, { useState, useEffect, useRef } from "react";
import TileView from "./components/TileView";
import GameEngine from "../model/GameEngine";
import "./css/Game.css";

interface GameProps {
  board: any;
  onLeft?: any;
  onRight?: any;
  onUp?: any;
  onDown?: any;
}

const Game = (props: GameProps) => {
  const [game, setGame] = useState(new GameEngine());
  const [board, setBoard] = useState(game.getTileState());
  const [score, setScore] = useState(game.getScore());
  const [boardSize, setBoardSize] = useState(game.getBoardSize());

  //Rerender the board whenever game changes.
  useEffect(() => {
    setBoard(game.getTileState());
    setScore(game.getScore());
  }, [game]);

  const handleClick = () => {
    game.left();
    setBoard(game.getTileState());
  };

  const handleLeft = () => {
    console.log(game.getTileState());
    game.left();
    setBoard(game.getTileState());
    console.log(game.getTileState());
  }

  const handleRight = () => {
    console.log(game.getTileState());
    game.right();
    setBoard(game.getTileState());
    console.log(game.getTileState());
  }

  const handleUp = () => {
    game.up();
    setBoard(game.getTileState());
  }

  const handleDown = () => {
    game.down();
    setBoard(game.getTileState());
  }
  const renderBoard = () => {
    const tiles = board.map((tile) => {
      return <TileView key={tile.getId()} tile={tile} />;
    })
    return tiles;
  };
  return (
    <div className="game-container">
      <div className="tiles-container" style={{
        display: "grid",
        gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
        gridTemplateRows: `repeat(${boardSize}, 1fr)`
      }}>
        {renderBoard()}
      </div>
      <button onClick={handleLeft}>Left</button>
      <button onClick={handleRight}>Right</button>
      <button onClick={handleUp}>Up</button>
      <button onClick={handleDown}>Down</button>
    </div >
  );
};

export default Game;
