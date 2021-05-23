import React from "react"
import Slider from "./Slider"
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
  return (
    <div className="controlPanel">
      <div className="controlPanel__detail">
        {/* <img src={currentSong.srcImg} alt="" /> */}
        <div>
          <span>{currentSong.name}</span>
          <span>{currentArtist.name}</span>
        </div>
      </div>

      <div className="controlPanel__control">
        <img
          src={isPlay ? pauseButton : playButton}
          onClick={togglePlaying}
          alt=""
        />
        <img src={nextButton} alt="" onClick={nextSong} />
      </div>

      <Slider
        duration={duration}
        currentTime={currentTime}
        percentage={percentage}
        changeSlider={changeSlider}
      />
    </div>
  )
}

export default ControlPanel
