import "./assets/scss/index.scss"

import React, { useEffect, useRef, useState } from "react"

import BodyApp from "./components/BodyApp"
import ControlPanel from "./components/ControlPanel"
import Header from "./components/Header"
import { albums } from "./constants/albums"
import { artists } from "./constants/artists"
import { musics } from "./constants/musics"

const App = () => {
  const [isPlay, setIsPlay] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [currentSong, setCurrentSong] = useState(musics[0])
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
    const findedArtist = artists.find(
      (artist) => artist.id === currentSong.artistID
    )
    const findedAlbum = albums.find((album) => album.id === currentSong.albumID)

    setCurrentArtist(findedArtist)
    setCurrentAlbum(findedAlbum)
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

    setIsPlay(true)
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
      <Header currentArtist={currentArtist} currentAlbum={currentAlbum} />
      <BodyApp handleClickSong={handleClickSong} />

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
        isPlay={isPlay}
        currentArtist={currentArtist}
        togglePlaying={togglePlaying}
        nextSong={nextSong}
        duration={duration}
        currentTime={currentTime}
        percentage={percentage}
        changeSlider={changeSlider}
      />
    </div>
  )
}

export default App
