import React from "react"
import nextButton from "../assets/icons/play-next-button.svg"
import pauseButton from "../assets/icons/pause-button.svg"
import playButton from "../assets/icons/play-button-arrowhead.svg"
const PlayerMusic = (props) => {
  const { currentSong, currentArtist, isPlay, nextSong, togglePlaying } = props

  return (
    <>
      <div className="controlPanel__playerMusic">
        {currentSong.id && (
          <img
            className="controlPanel__playerMusic__avatar"
            src={currentSong.img}
            alt=""
          />
        )}

        <div className="controlPanel__playerMusic__text">
          <span>{currentSong.name}</span>
          <span>{currentArtist.name}</span>
        </div>

        <div className="controlPanel__playerMusic__button">
          <img
            className={isPlay && "poiter"}
            src={isPlay ? pauseButton : playButton}
            onClick={togglePlaying}
            alt=""
          />

          <img
            className={isPlay && "poiter"}
            src={nextButton}
            alt=""
            onClick={nextSong}
          />
        </div>
      </div>
    </>
  )
}

export default PlayerMusic
