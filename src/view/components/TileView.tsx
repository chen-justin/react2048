import React, { useRef } from "react";
import Tile from "../../model/Tile";
import "../css/TileView.css";

interface TileProps {
  tile: Tile;
}

const TileView = (props: TileProps) => {
  const ref = useRef(null);
  const value = Math.floor(Math.pow(2, props.tile.getValue()));
  const tileClass = `tile tile-${value}`;
  return (
    <div ref={ref} key={props.tile.getId()} className={tileClass}>
      {value}
    </div>
  );
};

export default TileView;
