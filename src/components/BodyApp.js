import { Add } from "../iconComponents/Add"
import React from "react"
import addIcon from "../assets/icons/add.svg"
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
          {musics.map((song) => (
            <div
              className="bodyApp__topSong__item"
              key={song.id}
              onClick={() => handleClickSong(song)}
            >
              <img src={song.srcImg} alt="" />
              <div>
                <span>{song.name}</span>
                <span>{getArtist(song.artistID)}</span>
              </div>
              <Add />
            </div>
          ))}
        </div>
        <div className="bodyApp__album"></div>
      </div>
    </>
  )
}

export default BodyApp
