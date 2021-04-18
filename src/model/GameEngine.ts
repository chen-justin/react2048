import Tile from "./Tile";

class GameEngine {
  private state: Tile[] = [];
  private gameScore = 0;
  private boardSize: number;

  constructor(boardSize: number = 4) {
    this.boardSize = boardSize;
    for (let i = 0; i < boardSize * boardSize; i++) {
      this.state.push(new Tile(0, Math.floor(i / boardSize), i % boardSize));
    }
    this.spawn();
    this.spawn();
  }

  getBoardSize() {
    return this.boardSize;
  }

  getScore() {
    return this.gameScore;
  }

  left() {
    let collapse = this.collapseBoard(this.state);
    if (collapse) {
      this.state = collapse;
      this.spawn();
    }
  }

  right() {
    this.reverseBoard();
    let collapse = this.collapseBoard(this.state);
    if (collapse) {
      this.state = collapse;
      this.reverseBoard();
      this.spawn();
    } else {
      this.reverseBoard();
    }
  }

  up() {
    this.transposeBoard();
    let collapse = this.collapseBoard(this.state);
    if (collapse) {
      this.state = collapse;
      this.transposeBoard();
      this.spawn();
    } else {
      this.transposeBoard();
    }
  }

  down() {
    this.transposeBoard();
    let collapse = this.collapseBoard(this.state);
    if (collapse) {
      this.state = collapse;
      this.reverseBoard();
      this.transposeBoard();
      this.spawn();
    } else {
      this.reverseBoard();
      this.transposeBoard();
    }
  }

  getState() {
    let gameState: number[] = [];
    this.state.forEach((elt) => {
      gameState.push(elt.getValue());
    });
    return gameState;
  }

  getTileState() {
    return this.state.filter((x) => x.getValue() > 0);
  }

  private tilesAvailable() {
    this.state.forEach((tile) => {
      if (tile.getValue() === 0) {
        return true;
      }
    });
    return false;
  }

  private spawn() {
    let empty: number[] = [];
    for (let i = 0; i < this.state.length - 1; i++) {
      if (this.state[i].getValue() < 1) {
        empty.push(i);
      }
    }
    //Get a random index of the empty array.
    let rand = Math.floor(Math.random() * empty.length);
    this.state[empty[rand]] = new Tile(
      1,
      Math.floor(empty[rand] / this.boardSize),
      empty[rand] % this.boardSize
    );
    this.gameScore += 2;
  }

  // @TODO: This could probably use some refactoring.
  private collapse(row: number, arr: Tile[]): Tile[] | null {
    let noZeroArr = arr.filter((x) => x.getValue() !== 0);
    let ret: Tile[] = [];
    let i = 0;
    while (i < noZeroArr.length) {
      if (
        i + 1 < noZeroArr.length &&
        noZeroArr[i].getValue() === noZeroArr[i + 1].getValue()
      ) {
        let curr = noZeroArr[i];
        let mergedWith = noZeroArr[i + 1];

        // @TODO: Could probably separate this logic into the Tile class.
        curr.setMergedId(mergedWith.getId());
        mergedWith.setId(mergedWith.getId() + 1);
        curr.setValue(curr.getValue() + 1);
        this.gameScore += Math.floor(Math.pow(2, curr.getValue()));
        ret.push(curr);
        i += 1; //Increment i to "skip" the next element.
      } else {
        ret.push(noZeroArr[i]);
      }
      i += 1;
    }

    for (let i = 0; i < ret.length; i++) {
      ret[i].setCol(i);
    }

    while (ret.length < this.boardSize) {
      ret.push(new Tile(0, row, ret.length));
    }

    let changed = false;
    for (let i = 0; i < ret.length; i++) {
      if (ret[i].getValue() !== arr[i].getValue()) {
        changed = true;
      }
    }

    return changed ? ret : null;
  }

  private collapseBoard(arr: Tile[]): Tile[] | null {
    let state2d: Tile[][] = [];
    const boardSize = this.boardSize;
    for (let i = 0; i < boardSize; i++) {
      let row = [];
      for (let j = 0; j < boardSize; j++) {
        row.push(arr[i * boardSize + j]);
      }
      state2d.push(row);
    }

    let newState: Tile[] = [];
    let changed = false;
    state2d.forEach((elt, i) => {
      let newRow = this.collapse(i, elt);
      if (newRow) {
        newState = newState.concat(newRow);
        changed = true;
      } else {
        newState = newState.concat(elt);
      }
    });
    return changed ? newState : null;
  }

  private reverseBoard() {
    let i = 0;
    const boardSize = this.boardSize;
    while (i < boardSize) {
      let j = i * boardSize;
      let k = j + boardSize - 1;
      while (j < k) {
        let temp = this.state[i];
        this.state[j] = this.state[k];
        this.state[k] = temp;
        Tile.swapPos(this.state[j], this.state[k]);
        j += 1;
        k -= 1;
      }
      i += 1;
    }
  }

  private transposeBoard() {
    let ret = Array<Tile>();
    let i = 0;
    const boardSize = this.boardSize;
    while (i < boardSize) {
      let j = 0;
      while (j < boardSize) {
        let curr = this.state[j * boardSize + i];
        curr.swapPos();
        ret.push(curr);
        j += 1;
      }
      i += 1;
    }
    this.state = ret;
  }
}

export default GameEngine;
