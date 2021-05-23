import React from "react"
import Slider from "./Slider"

const ControlPanel = ({
  artists,
  currentSong,
  togglePlaying,
  nextSong,
  duration,
  currentTime,
  percentage,
  changeSlider,
}) => {
  const getArtist = () => {
    if (currentSong.artist) {
      const currentArtist = artists.find(
        (artist) => artist.id === currentSong.artist
      )
      return currentArtist.name
    }
  }

  return (
    <div className="controlPanel">
      <span>{currentSong.title}</span>
      <span>{getArtist()}</span>
      <span onClick={togglePlaying}>play</span>
      <span onClick={nextSong}>next</span>
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
