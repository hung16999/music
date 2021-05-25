import "./assets/scss/index.scss"

import React, { useEffect, useRef, useState } from "react"

import ControlPanel from "./components/ControlPanel"
import Header from "./components/Header"
import Playlist from "./components/Playlist"
import axios from "axios"

const App = () => {
  const [isPlay, setIsPlay] = useState(false)

  const [percentage, setPercentage] = useState(0)
  const [duration, setDuration] = useState("0:00")
  const [currentTime, setCurrentTime] = useState("0:00")

  const [currentSong, setCurrentSong] = useState({})
  const [currentArtist, setCurrentArtist] = useState({})
  const [currentAlbum, setCurrentAlbum] = useState({})
  const [lengthOfList, setLengthOfList] = useState(0)

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
    axios.get("http://localhost:3333/musics").then((response) => {
      setLengthOfList(response.data.length)
    })
  }, [])

  useEffect(() => {
    if (currentSong.id) {
      axios
        .get(`http://localhost:3333/artists/${currentSong.artistID}`)
        .then((response) => {
          setCurrentArtist(response.data)
        })

      axios
        .get(`http://localhost:3333/albums/${currentSong.albumID}`)
        .then((response) => {
          setCurrentAlbum(response.data)
        })
    }
  }, [currentSong])

  const changeSlider = (e) => {
    const audio = audioRef.current
    audio.currentTime = Math.floor((audio.duration / 100) * e.target.value)
    setPercentage(e.target.value)
  }

  const handleClickSong = (songID) => {
    axios
      .get(`http://localhost:3333/musics/${songID}`)
      .then(async (response) => {
        await setCurrentSong(response.data)
        setIsPlay(true)
      })
  }

  const togglePlaying = () => {
    if (currentSong.id) {
      setIsPlay(!isPlay)
    } else {
      setIsPlay(false)
    }
  }

  const nextSong = () => {
    if (currentSong.id === lengthOfList) {
      axios.get(`http://localhost:3333/musics/1`).then(async (response) => {
        await setCurrentSong(response.data)
        setIsPlay(true)
      })
    } else {
      axios
        .get(`http://localhost:3333/musics/${currentSong.id + 1}`)
        .then(async (response) => {
          await setCurrentSong(response.data)
          setIsPlay(true)
        })
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

      <Playlist handleClickSong={handleClickSong} />

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
        src={currentSong.srcAudio}
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
