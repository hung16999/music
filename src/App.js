import "./assets/scss/index.scss"

import React, { useEffect, useRef, useState } from "react"

import ControlPanel from "./components/ControlPanel"
import Header from "./components/Header"
import Playlist from "./components/Playlist"
import API from "./env/api"

const App = () => {
  const [isPlay, setIsPlay] = useState(false)

  const [percentage, setPercentage] = useState(0)
  const [duration, setDuration] = useState("0:00")
  const [currentTime, setCurrentTime] = useState("0:00")

  const [currentSong, setCurrentSong] = useState({})
  const [currentArtist, setCurrentArtist] = useState({})
  const [currentAlbum, setCurrentAlbum] = useState({})

  const [musics, setMusics] = useState([])

  const audioRef = useRef()

  useEffect(() => {
    const audio = audioRef.current

    if (isPlay) {
      audio.play()
    } else {
      audio.pause()
    }
  })

  useEffect(() => {
    API.get(`get_music.php`).then((response) => {
      setMusics(response.data)
    })
  }, [])

  const changeSlider = (e) => {
    const audio = audioRef.current

    audio.currentTime = Math.floor((audio.duration / 100) * e.target.value)
    setPercentage(e.target.value)
    setIsPlay(true)
  }

  const handleClickSong = async (songID) => {
    const formData = new FormData()

    const song = musics.find((song) => song.id === songID)
    await setCurrentSong(song)
    setIsPlay(true)

    formData.append("id_album", currentSong.id_album)
    formData.append("id_artist", currentSong.id_artist)
    console.log(formData)

    API.post(`get_album_by_song.php`, formData).then((response) =>
      console.log(response.data)
    )

    API.post(`get_artist_by_song.php`, formData).then((response) =>
      console.log(response.data)
    )
  }

  const togglePlaying = () => {
    if (currentSong.id) {
      setIsPlay(!isPlay)
    } else {
      setIsPlay(false)
    }
  }

  const nextSong = () => {}

  const calculateTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    const formatedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

    return `${minutes}:${formatedSeconds}`
  }

  const getCurrentTime = (e) => {
    const currentTime = e.currentTarget.currentTime
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2)

    setPercentage(+percent)
    setCurrentTime(calculateTime(currentTime))
  }

  return (
    <div className="music-app">
      <Header
        isPlay={isPlay}
        currentArtist={currentArtist}
        currentAlbum={currentAlbum}
      />

      <Playlist musics={musics} handleClickSong={handleClickSong} />

      <ControlPanel
        currentSong={currentSong}
        isPlay={isPlay}
        currentArtist={currentArtist}
        duration={duration}
        currentTime={currentTime}
        percentage={percentage}
        changeSlider={changeSlider}
        togglePlaying={togglePlaying}
        nextSong={nextSong}
      />

      <audio
        ref={audioRef}
        src={currentSong.audio}
        onEnded={nextSong}
        onTimeUpdate={getCurrentTime}
        onLoadedData={(e) => {
          setDuration(calculateTime(e.currentTarget.duration))
        }}
      />
    </div>
  )
}

export default App
