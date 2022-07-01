import { Dialog, IconButton } from "@mui/material"
import React, { createRef, useEffect, useRef, useState } from "react"
import CloseIcon from "@mui/icons-material/Close"

function Timer({ data, modal }) {
  const [modalVisible, setModalVisible] = useState(modal)
  const [ejercicio, setEjercicio] = useState(null)
  const [descanso, setDescanso] = useState(null)
  const [rondas, setRondas] = useState(null)
  const [workoutNum, setWorkoutNum] = useState("")
  const [allData, setData] = useState(data)

  const countdown = createRef()
  const baseTimerPathRemaining = createRef()
  const baseTimerLabel = createRef()

  // const works = useMemo(() => {
  //   return data
  // })
  // useEffect(() => {
  //   if (works.length > 0) {
  //     setData(works)
  //   }
  // }, [])

  // // if (modal === true) setModalVisible(true)

  // useEffect(() => {
  //   if (allData !== undefined) {
  //     console.log(allData)
  //     if (allData !== undefined) setWorkoutNum(0)
  //     console.log(allData[0])
  //     console.log(workoutNum)
  //     setEjercicio(allData[workoutNum].ejercicio)
  //     setDescanso(allData[workoutNum].descanso)
  //     setRondas(allData[workoutNum].rondas)
  //   }
  // }, [workoutNum])

  // useEffect(() => {
  //   if (descanso >= 0) {
  //     ejercicio > 0 && setTimeout(() => setEjercicio(ejercicio - 1), 1000)
  //   }
  //   if (ejercicio <= 0) {
  //     descanso > 0 && setTimeout(() => setDescanso(descanso - 1), 1000)
  //   }
  //   if (ejercicio == 0 && descanso == 0 && rondas >= 1) {
  //     setEjercicio(data.ejercicio)
  //     setDescanso(data.descanso)
  //     setRondas(rondas - 1)
  //   }
  // }, [ejercicio, descanso])

  console.log(allData[0])

  const FULL_DASH_ARRAY = 283
  const WARNING_THRESHOLD = 10
  const ALERT_THRESHOLD = 5

  const COLOR_CODES = {
    info: {
      color: "green",
    },
    warning: {
      color: "orange",
      threshold: WARNING_THRESHOLD,
    },
    alert: {
      color: "red",
      threshold: ALERT_THRESHOLD,
    },
  }

  const TIME_LIMIT = allData[0].ejercicio
  let timePassed = 0
  let timeLeft = TIME_LIMIT
  let timerInterval = null
  let remainingPathColor = COLOR_CODES.info.color

  startTimer()

  function onTimesUp() {
    clearInterval(timerInterval)
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      timePassed = timePassed += 1
      timeLeft = TIME_LIMIT - timePassed
      document.getElementById("countdown-label").innerHTML =
        formatTime(timeLeft)
      setCircleDasharray()
      setRemainingPathColor(timeLeft)

      if (timeLeft === 0) {
        onTimesUp()
      }
    }, 1000)
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60)
    let seconds = time % 60

    if (seconds < 10) {
      seconds = `0${seconds}`
    }
    return `${minutes}:${seconds}`
  }

  function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES
    // if (timeLeft <= alert.threshold) {
    //   document
    //     .getElementById("base-timer-path-remaining")
    //     .classList.remove(warning.color)
    //   document
    //     .getElementById("base-timer-path-remaining")
    //     .classList.add(alert.color)
    // } else if (timeLeft <= warning.threshold) {
    //   document
    //     .getElementById("base-timer-path-remaining")
    //     .classList.remove(info.color)
    //   document
    //     .getElementById("base-timer-path-remaining")
    //     .classList.add(warning.color)
    // }
  }

  function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction)
  }

  let circleDasharray
  function setCircleDasharray() {
    circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(
      0
    )} 283`
    // document
    //   .getElementById("base-timer-path-remaining")
    //   .setAttribute("stroke-dasharray", circleDasharray)
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => setModalVisible(false)}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <div>
          <h5>{allData[0].name}</h5>
          <div ref={countdown} id="countdown" className="countdown">
            <svg className="countdown__svg" viewBox="0 0 100 100">
              <g className="countdown__circle">
                <circle
                  className="countdown__path-elapsed"
                  cx="50"
                  cy="50"
                  r="45"
                ></circle>
                <path
                  ref={baseTimerPathRemaining}
                  id="countdown-path-remaining"
                  strokeDasharray={circleDasharray}
                  className={`countdown__path-remaining ${remainingPathColor}`}
                  d="            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
                ></path>
              </g>
            </svg>
            <span
              ref={baseTimerLabel}
              id="countdown-label"
              className="countdown__label"
            >
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default Timer
