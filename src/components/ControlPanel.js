import React, { useState } from "react"

import Slider from "./Slider"
import arrowUp from "../assets/icons/arrow-up.svg"
import nextButton from "../assets/icons/play-next-button.svg"
import pauseButton from "../assets/icons/pause-button.svg"
import playButton from "../assets/icons/play-button-arrowhead.svg"

const ControlPanel = ({
  currentSong,
  isPlay,
  currentArtist,
  togglePlaying,
  nextSong,
  duration,
  currentTime,
  percentage,
  changeSlider,
}) => {
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

      <div className="controlPanel__detail">
        <img
          className="controlPanel__detail__avatar"
          src={currentSong.srcImg}
          alt=""
        />

        <div className="controlPanel__detail__text">
          <span>{currentSong.name}</span>
          <span>{currentArtist.name}</span>
        </div>

        <div className="controlPanel__detail__button">
          <img
            className="controlPanel__detail__button__icon"
            src={isPlay ? pauseButton : playButton}
            onClick={togglePlaying}
            alt=""
          />

          <img
            className="controlPanel__detail__button__icon"
            src={nextButton}
            alt=""
            onClick={nextSong}
          />
        </div>
      </div>

      <Slider
        duration={duration}
        currentTime={currentTime}
        percentage={percentage}
        changeSlider={changeSlider}
      />

      <div className="controlPanel__lyric">
        {currentSong.lyric ? (
          <div>{currentSong.lyric}</div>
        ) : (
          <div>Hiện không có lời bài hát</div>
        )}
      </div>
    </div>
  )
}

export default ControlPanel
