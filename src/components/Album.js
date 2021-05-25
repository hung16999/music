import React from "react"

const Album = ({ album }) => {
  return (
    <div className="playlist__album__list__item">
      <img src={album.srcImg} alt="" />

      <div>
        <span>{album.name}</span>
        <span>{album.artist}</span>
      </div>
    </div>
  )
}

export default Album
