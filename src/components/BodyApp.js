import React from "react"
import addIcon from "../assets/icons/add.svg"
import { albums } from "../constants/albums"
import { artists } from "../constants/artists"
import { musics } from "../constants/musics"

const BodyApp = ({ handleClickSong }) => {
  const getArtist = (id) => {
    const findedArtist = artists.find((artist) => artist.id === id)
    console.log(findedArtist)
    return findedArtist.name
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

          <div className="bodyApp__album__list">
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
    </>
  )
}

export default BodyApp
