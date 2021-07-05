import React from "react"
import iconSearch from "../assets/icons/search-icon.svg"

const Header = ({ isPlay, currentArtist, currentAlbum }) => {
  return (
    <>
      <div className="header">
        {currentArtist.id && <img src={currentArtist.img} alt="" />}

        <div className="header__search">
          <img src={iconSearch} alt="" />
        </div>

        <span className="header__text">{currentArtist.name}</span>

        <div
          className={
            isPlay ? "header__albumPicture rotate" : "header__albumPicture"
          }
        >
          {currentAlbum.id && <img src={currentAlbum.img} alt="" />}
        </div>
      </div>
    </>
  )
}

export default Header
