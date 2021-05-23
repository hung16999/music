import "./assets/scss/index.scss"

import React, { useEffect, useRef, useState } from "react"

import BodyApp from "./components/BodyApp"
import ControlPanel from "./components/ControlPanel"
import Header from "./components/Header"
import Slider from "./components/Slider"
import { albums } from "./constants/albums"
import { artists } from "./constants/artists"
import { musics } from "./constants/musics"

const App = () => {
  const emptySong = {
    id: null,
    title: "Not playing",
    artistID: "",
    albumID: "",
  }
  const [isPlay, setIsPlay] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [currentSong, setCurrentSong] = useState(emptySong)
  const [currentArtist, setCurrentArtist] = useState({})
  const [currentAlbum, setCurrentAlbum] = useState({})

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
    if (currentSong.id !== null) {
      const findedArtist = artists.find(
        (artist) => artist.id === currentSong.artistID
      )
      const findedAlbum = albums.find(
        (album) => album.id === currentSong.albumID
      )

      setCurrentArtist(findedArtist)
      setCurrentAlbum(findedAlbum)
    }
  }, [currentSong])

  const changeSlider = (e) => {
    const audio = audioRef.current
    audio.currentTime = (audio.duration / 100) * e.target.value
    setPercentage(e.target.value)
  }

  const handleClickSong = async (song) => {
    await setCurrentSong(song)
    setIsPlay(true)
  }

  const togglePlaying = () => {
    setIsPlay(!isPlay)
  }

  const nextSong = () => {
    const indexCurrentSong = musics.indexOf(currentSong)

    if (indexCurrentSong === musics.length - 1) {
      setCurrentSong(musics[0])
    } else {
      setCurrentSong(musics[indexCurrentSong + 1])
    }
  }

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

    setPercentage(percent)
    setCurrentTime(calculateTime(currentTime))
  }

  return (
    <div className="music-app">
      {musics.map((song) => (
        <p key={song.id} onClick={() => handleClickSong(song)}>
          {song.name}
        </p>
      ))}

      <Header currentArtist={currentArtist} currentAlbum={currentAlbum} />
      <BodyApp />

      <audio
        ref={audioRef}
        src={currentSong.srcAudio}
        onEnded={nextSong}
        onTimeUpdate={getCurrentTime}
        onLoadedData={(e) => {
          setDuration(calculateTime(e.currentTarget.duration))
        }}
      />

      <ControlPanel
        currentSong={currentSong}
        currentArtist={currentArtist}
        togglePlaying={togglePlaying}
        nextSong={nextSong}
      />

      <Slider
        duration={duration}
        currentTime={currentTime}
        percentage={percentage}
        changeSlider={changeSlider}
      />
    </div>
  )
}

export default App
