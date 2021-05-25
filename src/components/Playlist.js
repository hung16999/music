import React, { useEffect, useRef, useState } from "react"

import Album from "./Album"
import Music from "./Music"
import axios from "axios"

const Playlist = ({ handleClickSong }) => {
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
      })
      .catch(() => {
        setIsLoadingMusic(false)
      })

    axios
      .get("http://localhost:3333/albums")
      .then((response) => {
        setListAlbum(response.data)
        setIsLoadingAlbum(false)
      })
      .catch(() => {
        setIsLoadingAlbum(false)
      })
  }, [])

  const handleScrollHorizontal = (e) => {
    if (e.deltaY > 0) {
      albumsRef.current.scrollLeft += 70
    } else {
      albumsRef.current.scrollLeft -= 70
    }
  }

  return (
    <div className="playlist">
      <div className="playlist__topSong">
        <div className="playlist__topSong__title">
          <span>Top songs</span>
          <span>all songs</span>
        </div>

        <div className="playlist__topSong__list">
          {isLoadingMusic && <div className="loading">Loading ... </div>}

          {listMusic.map((song) => (
            <Music
              song={song}
              handleClickSong={handleClickSong}
              key={song.id}
            />
          ))}
        </div>
      </div>

      <div className="playlist__album">
        <div className="playlist__album__title">
          <span>Albums</span>
          <span>all albums</span>
        </div>

        <div
          ref={albumsRef}
          onWheel={handleScrollHorizontal}
          className="playlist__album__list"
        >
          {isLoadingAlbum && <div className="loading">Loading ...</div>}
          {listAlbum.map((album) => (
            <Album album={album} key={album.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Playlist
