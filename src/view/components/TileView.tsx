import React, { useRef } from "react";
import Tile from "../../model/Tile";
import "../css/TileView.css";
import { motion } from "framer-motion";

interface TileProps {
  tile: Tile;
}

const variants = {
  popIn: {
    initial: {
      scale: 0.9
    },
    animate: {
      scale: [1, 1.2, 1]
    }
  },
  merge: {

  }
}

const TileView = (props: TileProps) => {
  const ref = useRef(null);
  const value = Math.floor(Math.pow(2, props.tile.getValue()));
  const [row, col] = props.tile.getCoordinates();

  if (value < 2) {
    return (
      <div ref={ref} className={"tile empty"}>
        <div className="tile-inner">
          <span></span>
        </div>
      </div>
    )
  } else {
    const tileClass = `tile tile-${value}`;
    return (
      <motion.div
        layoutId={props.tile.getId().toString()}
        ref={ref}
        className={tileClass}
        layout
        transition={{
          duration: 0.3
        }}
        style={{
          gridColumn: col + 1,
          gridRow: row + 1
        }}
        initial={{
          scale: 0
        }}
        animate={{
          scale: [0.5, 1.3, 1]
        }}
      >
        <div className="tile-inner">
          {value}
        </div>
      </motion.div >
    );
  }
};


export default TileView;
