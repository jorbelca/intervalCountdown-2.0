import { Dialog, IconButton } from "@mui/material"
import React, { createRef, useEffect, useRef, useState } from "react"
import CloseIcon from "@mui/icons-material/Close"

function Timer({ data, modal }) {
  const [modalVisible, setModalVisible] = useState(modal)
  const [exercise, setExercise] = useState(null)
  const [rest, setRest] = useState(null)
  const [rounds, setRounds] = useState(null)
  const [workoutNum, setWorkoutNum] = useState(0)
  const [allData, setData] = useState(data)

  useEffect(() => {
    if (allData !== undefined) {
      setExercise(allData[workoutNum].exercise)
      setRest(allData[workoutNum].rest)
      setRounds(allData[workoutNum].rounds)
    }
  }, [workoutNum])

  useEffect(() => {
    if (rest >= 0) {
      exercise > 0 && setTimeout(() => setExercise(exercise - 1), 1000)
    }
    if (exercise <= 0) {
      rest > 0 && setTimeout(() => setRest(rest - 1), 1000)
    }
    if (exercise == 0 && rest == 0 && rounds >= 1) {
      setExercise(allData[0].exercise)
      setRest(allData[0].rest)
      setRounds(rounds - 1)
      console.log(rounds)
    }
  }, [exercise, rest])

  console.log(allData)

  const TIME_LIMIT = allData[0].exercise
  let timePassed = 0
  let timeLeft = TIME_LIMIT
  let timerInterval = null

  startTimer()

  function onTimesUp() {
    clearInterval(timerInterval)
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      timePassed = timePassed += 1
      timeLeft = TIME_LIMIT - timePassed
      if (rounds === 0) {
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
          <h5 className="timer-name">
            {allData[0].name == "" ? allData[0].id : allData[0].name}
          </h5>
          <div id="countdown" className="countdown">
            <div className="tiles-timer">
              <p className="titles-timer">WORK</p>
              <span id="countdown-label" className="countdown__label">
                {formatTime(exercise)}
              </span>
            </div>

            <div className="tiles-timer">
              <p className="titles-timer">REST</p>
              <span id="countdown-label" className="countdown__label">
                {formatTime(rest)}
              </span>
            </div>

            <div className="tiles-timer">
              <p className="titles-timer">ROUND</p>
              <span id="countdown-label" className="countdown__label">
                {rounds}
              </span>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default Timer
