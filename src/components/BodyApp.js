import React, { useRef } from "react"

import ControlPanel from "./ControlPanel"
import addIcon from "../assets/icons/add.svg"
import { albums } from "../constants/albums"
import { artists } from "../constants/artists"
import { musics } from "../constants/musics"

const BodyApp = ({
  handleClickSong,
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
  const albumsRef = useRef()
  const getArtist = (id) => {
    const findedArtist = artists.find((artist) => artist.id === id)
    console.log(findedArtist)
    return findedArtist.name
  }

  const handleScrollHorizontal = (e) => {
    if (e.deltaY > 0) {
      albumsRef.current.scrollLeft += 50
    } else {
      albumsRef.current.scrollLeft -= 50
    }
  }

  return (
    <>
      <div className="bodyApp">
        <div className="bodyApp__topSong">
          <div className="bodyApp__topSong__title">
            <span>Top songs</span>
            <span>all songs</span>
          </div>

          <div className="bodyApp__topSong__list">
            {musics.map((song) => (
              <div
                className="bodyApp__topSong__list__item"
                key={song.id}
                onClick={() => handleClickSong(song)}
              >
                <img src={song.srcImg} alt="" />
                <div>
                  <span>{song.name}</span>
                  <span>{getArtist(song.artistID)}</span>
                </div>
                <img src={addIcon} alt="" />
              </div>
            ))}
          </div>
        </div>

        <div className="bodyApp__album">
          <div className="bodyApp__album__title">
            <span>Albums</span>
            <span>all albums</span>
          </div>

          <div
            ref={albumsRef}
            onWheel={handleScrollHorizontal}
            className="bodyApp__album__list"
          >
            {albums.map((album) => (
              <div key={album.id} className="bodyApp__album__list__item">
                <img src={album.srcImg} alt="" />
                <div>
                  <span>{album.name}</span>
                  <span>{album.artist}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ControlPanel
        currentSong={currentSong}
        isPlay={isPlay}
        currentArtist={currentArtist}
        togglePlaying={togglePlaying}
        nextSong={nextSong}
        duration={duration}
        currentTime={currentTime}
        percentage={percentage}
        changeSlider={changeSlider}
      />
    </>
  )
}

export default BodyApp
