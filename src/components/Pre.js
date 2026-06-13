import React from "react";
import blockIcon from "../Assets/icon_block.svg";
import mushroomIcon from "../Assets/icon_mushroom.svg";
import terrainTile from "../Assets/terrain_block_tile.png";

function Pre({ load }) {
  return (
    <div id={load ? "preloader" : "preloader-none"}>
      <div className="mario-pre-center">
        <div className="mario-pre-icons">
          <img src={blockIcon} alt="" className="mario-pre-block" />
          <img src={mushroomIcon} alt="" className="mario-pre-mushroom" />
        </div>
        <p className="mario-pre-label">LOADING</p>
        <div className="mario-pre-dots">
          <span />
          <span />
          <span />
        </div>
        <div className="mario-pre-bar-wrap">
          <div className="mario-pre-bar" />
        </div>
      </div>
      <div className="mario-pre-ground-wrap">
        <div
          className="mario-pre-ground"
          style={{ backgroundImage: `url(${terrainTile})` }}
        />
      </div>
    </div>
  );
}

export default Pre;
