import React, { useEffect, useRef, useState } from "react"

import addIcon from "../assets/icons/add.svg"
import { artists } from "../constants/artists"
import axios from "axios"

const ListMusic = ({ handleClickSong, setLengthOfList }) => {
  const albumsRef = useRef()
  const [isLoadingMusic, setIsLoadingMusic] = useState(true)
  const [isLoadingAlbum, setIsLoadingAlbum] = useState(true)
  const [listMusic, setListMusic] = useState([])
  const [listAlbum, setListAlbum] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3333/musics")
      .then((response) => {
        setListMusic(response.data)
        setIsLoadingMusic(false)
        setLengthOfList(response.data.length)
      })
      .catch((error) => {
        setIsLoadingMusic(false)
        console.log(error)
      })

    axios.get("http://localhost:3333/albums").then((response) => {
      setListAlbum(response.data)
      setIsLoadingAlbum(false)
    })
  }, [])

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
          {isLoadingMusic && <div className="loading">Loading ... </div>}
          {listMusic.map((song) => (
            <div
              className="listMusic__topSong__list__item"
              key={song.id}
              onClick={() => handleClickSong(song.id)}
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
          {isLoadingAlbum && <div className="loading">Loading ...</div>}
          {listAlbum.map((album) => (
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
