import React from "react"

const ControlPanel = ({ artists, currentSong, togglePlaying, nextSong }) => {
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
    </div>
  )
}

export default ControlPanel
