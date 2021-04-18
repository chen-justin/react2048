import React, { useState, useEffect } from "react";
import TileView from "./components/TileView";
import GameEngine from "../model/GameEngine";

interface GameProps {
  board: any;
  onLeft?: any;
  onRight?: any;
  onUp?: any;
  onDown?: any;
}

const Game = (props: GameProps) => {
  const game = new GameEngine();
  const [board, setBoard] = useState(game.getTileState());
  const [score, setScore] = useState(game.getScore());

  const handleClick = () => {
    game.left();
    setBoard(game.getTileState());
  };

  const renderBoard = () => {
    const tiles = board.map((tile) => {
      return <TileView tile={tile} />;
    });
    return tiles;
  };
  return <div onClick={handleClick}>{renderBoard()}</div>;
};

export default Game;
