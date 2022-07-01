import "./App.css"
import React, { useState } from "react"
import { Box, Slider, Button, Input } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import Timer from "./Timer"

function App() {
  const [name, setName] = useState("")
  const [ejercicio, setEjercicio] = useState(20)
  const [descanso, setDescanso] = useState(10)
  const [rondas, setRondas] = useState(1)
  const [work, setWork] = useState([])
  const [timer, activateTimer] = useState(false)

  function valuetext(ejercicio) {
    return `${ejercicio} segundos`
  }

  function formatDuration(ejercicio) {
    const minute = Math.floor(ejercicio / 60)
    const secondLeft = ejercicio - minute * 60
    return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`
  }

  const submitForm = (e) => {
    e.preventDefault()

    let id
    if (work.length > 0) {
      work.map((n) => (id = n.id + 1))
    } else {
      id = 1
    }

    setWork([
      ...work,
      {
        id: Number(id),
        name: name,
        ejercicio: ejercicio,
        descanso: descanso,
        rondas: rondas,
      },
    ])
    setName("")
  }

  const startTimer = () => {
    activateTimer(!timer)
  }

  const deleteWorkout = (id) => {
    const updatedWork = work.filter((n) => n.id !== id)

    setWork(updatedWork)
  }

  return (
    <div className="App">
      <h1>INTERVAL COUNTDOWN</h1>

      <form onSubmit={submitForm}>
        <div className="form-layout">
          <div className="inputs">
            <Box sx={{ width: 400 }}>
              <label>EXERCISE NAME &nbsp;</label>
              <Input
                onChange={(e) => {
                  setName(e.target.value)
                }}
                value={name}
                type="text"
                style={{ fontFamily: "Copperplate" }}
              ></Input>
            </Box>
            <br />
            <Box sx={{ flewgrow: 1, ml: 1, mr: 1, mt: 1, mb: 1 }}>
              <label>WORK {formatDuration(ejercicio)}</label>
              <Slider
                defaultValue={20}
                step={5}
                max={300}
                onChange={(_, value) => setEjercicio(value)}
                placeholder="segundos"
                color="error"
              />
            </Box>

            <Box sx={{ flewgrow: 1, ml: 1, mr: 1, mt: 1, mb: 1 }}>
              <label>REST {formatDuration(descanso)}</label>
              <Slider
                defaultValue={10}
                step={5}
                max={200}
                onChange={(_, value) => setDescanso(value)}
                placeholder="segundos"
                color="success"
              />
            </Box>

            <Box sx={{ flewgrow: 1, ml: 5, mr: 5, mt: 2, mb: 2 }}>
              <label>ROUNDS {rondas}</label>
              <Slider
                aria-label="Always visible"
                defaultValue={1}
                getAriaValueText={valuetext}
                step={1}
                max={10}
                valueLabelDisplay="auto"
                onChange={(_, value) => setRondas(value)}
                value={rondas}
                placeholder="segundos"
                color="secondary"
              />
            </Box>
          </div>
          <br />
          <Button
            variant="outlined"
            type="submit"
            style={{ color: "black", border: "1px solid black" }}
          >
            ADD
          </Button>
        </div>
      </form>

      {work.length > 0 ? (
        <div className="all-wk">
          {work.map((workout) => (
            <>
              <Box
                key={workout.ejercicio + workout.descanso + workout.id}
                sx={{
                  flewgrow: 1,
                  ml: 5,
                  mr: 5,
                  mt: 5,
                  mb: 5,
                  borderRadius: 1,
                  border: 1,
                  borderColor: "grey",
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "grey",
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
              >
                <div key={workout.id} className="inner-tab">
                  <>
                    <span style={{ color: "black" }}>
                      {workout.name === "" ? workout.id + "." : workout.name}
                    </span>
                    <span style={{ color: "red" }}>
                      {formatDuration(workout.ejercicio)}
                    </span>
                    <span style={{ color: "green" }}>
                      {formatDuration(workout.descanso)}
                    </span>
                    <span style={{ color: "purple" }}>{workout.rondas}</span>
                  </>
                  <Button
                    onClick={() => deleteWorkout(workout.id)}
                    aria-label="delete"
                    size="small"
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </Button>
                </div>
              </Box>
            </>
          ))}
          <Button variant="outlined" onClick={() => startTimer()} color="error">
            START
          </Button>
        </div>
      ) : (
        <></>
      )}
      {timer === true ? (
        <>
          <Timer data={work} modal={timer} />
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default App
