class Tile {
  private id: number;
  private mergedId?: number | null;
  private value: number;
  private row: number;
  private col: number;
  public toBeDeleted: boolean | null;
  private mergedTile?: Tile | null;

  private static tileSerial = 0;

  constructor(value: number, row: number, col: number, incId = true) {
    this.value = value;
    this.row = row;
    this.col = col;
    this.id = Tile.tileSerial;
    if (incId) {
      Tile.tileSerial += 1;
    }
    this.toBeDeleted = false;
  }

  // Getters/Setters
  getId(): number {
    return this.id;
  }

  setId(value: number): Tile {
    this.id = value;
    return this;
  }

  setMergedId(value: number): Tile {
    this.mergedId = value;
    return this;
  }

  getValue(): number {
    return this.value;
  }

  setValue(value: number): Tile {
    this.value = value;
    return this;
  }

  getRow(): number {
    return this.row;
  }

  setRow(value: number): Tile {
    this.row = value;
    return this;
  }

  getCol(): number {
    return this.col;
  }

  setMergedTile(tile: Tile) {
    this.mergedTile = tile;
  }

  getMergedTile(): Tile | null {
    return this.mergedTile ? this.mergedTile : null;
  }

  popMergedTile(): Tile | null {
    if (this.mergedTile) {
      let temp = this.mergedTile;
      this.mergedTile = null;
      return temp;
    } else {
      return null;
    }
  }

  setCol(value: number): Tile {
    this.col = value;
    return this;
  }

  getCoordinates(): [number, number] {
    return [this.row, this.col];
  }

  // Class functions

  popMergedId(): number | null {
    if (this.mergedId) {
      let temp = this.mergedId;
      this.mergedId = null;
      return temp;
    } else {
      return null;
    }
  }

  swapPos() {
    let temp = this.row;
    this.row = this.col;
    this.col = temp;
  }

  // Static functions

  static fromTile(tile: Tile) {
    const newTile = new this(tile.value, tile.row, tile.col, false);
    newTile.id = tile.id;
    return newTile;
  }

  static swapPos(lhs: Tile, rhs: Tile) {
    const tempRow = lhs.row;
    const tempCol = lhs.col;
    lhs.row = rhs.row;
    lhs.col = rhs.col;
    rhs.row = tempRow;
    rhs.col = tempCol;
  }

  static equals(lhs: Tile, rhs: Tile): boolean {
    return lhs.id === rhs.id;
  }
}

export default Tile;
