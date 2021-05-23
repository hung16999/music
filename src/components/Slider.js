import { useEffect, useRef, useState } from "react"

const Slider = ({ percentage, changeSlider, duration, currentTime }) => {
  const [position, setPosition] = useState(0)

  const rangeRef = useRef()

  useEffect(() => {
    setPosition(percentage)
  }, [percentage])

  return (
    <div>
      <span>{currentTime}</span>
      <input
        type="range"
        value={position}
        ref={rangeRef}
        onChange={changeSlider}
      />
      <span>{duration}</span>
    </div>
  )
}

export default Slider
