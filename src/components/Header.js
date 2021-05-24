import React from "react"
import iconSearch from "../assets/icons/search-icon.svg"

const Header = ({ isPlay, currentArtist, currentAlbum }) => {
  return (
    <>
      <div className="header">
        <img src={currentArtist.srcImg} alt="" />

        <div className="header__search">
          <img src={iconSearch} alt="" />
        </div>

        <span className="header__text">{currentArtist.name}</span>

        <div
          className={
            isPlay ? "header__albumPicture rotate" : "header__albumPicture"
          }
        >
          <img src={currentAlbum.srcImg} alt="" />
        </div>
      </div>
    </>
  )
}

export default Header