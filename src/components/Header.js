import React from "react"

const Header = ({ currentSong, currentArtist, currentAlbum }) => {
  return (
    <>
      <div className="header">
        <img src={currentArtist.srcImg} alt="" />
        <span>{currentArtist.name}</span>
      </div>
    </>
  )
}

export default Header
