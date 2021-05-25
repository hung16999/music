import React, { useState } from "react"

import Lyric from "./Lyric"
import PlayerMusic from "./PlayerMusic"
import Slider from "./Slider"
import arrowUp from "../assets/icons/arrow-up.svg"

const ControlPanel = (props) => {
  const {
    currentSong,
    isPlay,
    currentArtist,
    togglePlaying,
    nextSong,
    duration,
    currentTime,
    percentage,
    changeSlider,
  } = props

  const [isShowPopup, setIsShowPopup] = useState(false)

  return (
    <div className={isShowPopup ? "controlPanel active" : "controlPanel"}>
      <img
        className={
          isShowPopup ? "controlPanel__arrow down" : "controlPanel__arrow"
        }
        src={arrowUp}
        alt=""
        onClick={() => setIsShowPopup(!isShowPopup)}
      />

      <PlayerMusic
        currentSong={currentSong}
        currentArtist={currentArtist}
        isPlay={isPlay}
        togglePlaying={togglePlaying}
        nextSong={nextSong}
      />

      <Slider
        isPlay={isPlay}
        duration={duration}
        currentTime={currentTime}
        percentage={percentage}
        changeSlider={changeSlider}
      />

      <Lyric currentSong={currentSong} />
    </div>
  )
}

export default ControlPanel
