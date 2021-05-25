import { useEffect, useRef, useState } from "react"

const Slider = (props) => {
  const { percentage, changeSlider, duration, currentTime, isPlay } = props

  const [position, setPosition] = useState(0)

  const thumbRef = useRef()
  const rangeRef = useRef()

  useEffect(() => {
    setPosition(percentage)
  }, [percentage])

  const full = {
    width: "100%",
    height: 2,
    backgroundColor: "#1f2128",
  }

  const filler = {
    height: "100%",
    width: `${percentage}%`,
    backgroundColor: "#6343e4",
  }

  return (
    <>
      <div className="sliderBar">
        <span>{currentTime}</span>

        <div className="sliderBar__progress">
          <div style={full}>
            <div ref={thumbRef} style={filler}></div>
          </div>
        </div>

        <span>{duration}</span>
      </div>

      <input
        className={isPlay ? "range poiter" : "range"}
        disabled={!isPlay}
        type="range"
        value={position}
        min={0}
        max={100}
        ref={rangeRef}
        step="0.01"
        onChange={changeSlider}
      />
    </>
  )
}

export default Slider
