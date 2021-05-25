import React from "react"

const Lyric = ({ currentSong }) => {
  return (
    <>
      {currentSong.id && (
        <div className="controlPanel__lyric">
          {currentSong.lyric ? (
            <>
              <h2>Lyrics:</h2>
              <div>{currentSong.lyric}</div>
            </>
          ) : (
            <div>No lyrics</div>
          )}
        </div>
      )}
    </>
  )
}

export default Lyric
