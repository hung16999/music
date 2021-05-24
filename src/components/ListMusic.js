import React, { useRef } from "react"

import addIcon from "../assets/icons/add.svg"
import { albums } from "../constants/albums"
import { artists } from "../constants/artists"
import { musics } from "../constants/musics"

const ListMusic = ({ handleClickSong }) => {
  const albumsRef = useRef()

  const getArtist = (id) => {
    const findedArtist = artists.find((artist) => artist.id === id)
    return findedArtist.name
  }

  const handleScrollHorizontal = (e) => {
    if (e.deltaY > 0) {
      albumsRef.current.scrollLeft += 70
    } else {
      albumsRef.current.scrollLeft -= 70
    }
  }

  return (
    <div className="listMusic">
      <div className="listMusic__topSong">
        <div className="listMusic__topSong__title">
          <span>Top songs</span>
          <span>all songs</span>
        </div>

        <div className="listMusic__topSong__list">
          {musics.map((song) => (
            <div
              className="listMusic__topSong__list__item"
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

      <div className="listMusic__album">
        <div className="listMusic__album__title">
          <span>Albums</span>
          <span>all albums</span>
        </div>

        <div
          ref={albumsRef}
          onWheel={handleScrollHorizontal}
          className="listMusic__album__list"
        >
          {albums.map((album) => (
            <div key={album.id} className="listMusic__album__list__item">
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
  )
}

export default ListMusic
