import React, { useEffect, useState } from "react"

import addIcon from "../assets/icons/add.svg"
import axios from "axios"

const Music = ({ song, icon, handleClickSong }) => {
  return (
    <div
      className="playlist__topSong__list__item"
      key={song.id}
      onClick={() => handleClickSong(song.id)}
    >
      <img src={song.img} alt="" />

      <div>
        <span>{song.name}</span>
        {/* <span>{nameArtist}</span> */}
      </div>

      <img src={addIcon} alt="" />
    </div>
  )
}

export default Music
