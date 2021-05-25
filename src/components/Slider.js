import { useEffect, useRef, useState } from "react"

const Slider = ({ percentage, changeSlider, duration, currentTime }) => {
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
        type="range"
        value={position}
        ref={rangeRef}
        step="0.01"
        className="range"
        onChange={changeSlider}
      />
    </>
  )
}

export default Slider
