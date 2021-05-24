import React from "react"

const Header = ({ currentSong, currentArtist, currentAlbum }) => {
  return (
    <>
      <div className="header">
        <img src={currentArtist.srcImg} alt="" />
        <span className="header__text">{currentArtist.name}</span>
        <div className="header__albumPicture">
          <img src={currentAlbum.srcImg} alt="" />
        </div>
      </div>
    </>
  )
}

export default Header
