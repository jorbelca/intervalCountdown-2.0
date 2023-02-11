import { Dialog, IconButton } from "@mui/material"
import React, { useEffect, useState } from "react"
import CloseIcon from "@mui/icons-material/Close"
import { formatDuration } from "./App"

function Timer({ data, modal }) {
  const [modalVisible, setModalVisible] = useState(modal)
  let [exercise, setExercise] = useState(0)
  let [rest, setRest] = useState(0)
  let [rounds, setRounds] = useState(0)

  const [allData] = useState(data)

  console.log(data, allData)

  useEffect(() => {
    if (allData !== undefined) {
      setExercise(allData[0].exercise)
      setRest(allData[0].rest)
      setRounds(allData[0].rounds)
    }
  }, [allData])

  const minusExercise = () =>
    exercise > 0 && setTimeout(() => setExercise(exercise - 1), 1000)

  const minusRest = () => rest > 0 && setTimeout(() => setRest(rest - 1), 1000)

  useEffect(() => {
    if (rest >= 0) {
      minusExercise()
    }
    if (exercise <= 0) {
      minusRest()
    }
    if (exercise === 0 && rest === 0 && rounds > 1) {
      setExercise(allData[0].exercise)
      setRest(allData[0].rest)
      setRounds(rounds - 1)
    }

    if (exercise === 0 && rest === 0 && rounds === 1) {
      setRounds(rounds - 1)
      allData.shift()
      if (allData.length > 0) {
        setExercise(allData[0].exercise)
        setRest(allData[0].rest)
        setRounds(allData[0].rounds)
      }
    }
  }, [exercise, rest])

  const stopTimer = () => {
    setExercise(0)
    setRest(0)
    setRounds(0)
    allData = null
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={modalVisible}
        onClose={() => {
          stopTimer()
        }}
      >
        <IconButton
          edge="start"
          color="error"
          onClick={() => setModalVisible(false)}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>

        {allData.length === 0 ? (
          <div className="finish">TIME OUT!!!</div>
        ) : (
          <div>
            {allData.map((data) => (
              <h5 className="timer-name">
                {data.id} -- {data.name}
              </h5>
            ))}
            <div id="countdown" className="countdown">
              <div className="tiles-timer">
                <p className="titles-timer">WORK</p>
                <span id="countdown-label" className="countdown__label">
                  {formatDuration(exercise)}
                </span>
              </div>

              <div className="tiles-timer">
                <p className="titles-timer">REST</p>
                <span id="countdown-label" className="countdown__label">
                  {formatDuration(rest)}
                </span>
              </div>

              <div className="tiles-timer">
                {rounds === 1 ? (
                  ""
                ) : (
                  <p className="titles-timer">ROUNDS LEFT</p>
                )}
                <span id="countdown-label" className="countdown__label">
                  {rounds === 1 ? (
                    <p
                      style={{
                        color: "red",
                        fontSize: "7vmin",
                      }}
                    >
                      LAST ROUND
                    </p>
                  ) : (
                    rounds
                  )}
                </span>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  )
}

export default Timer
