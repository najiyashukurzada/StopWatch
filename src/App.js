import './App.css';
import { useEffect, useReducer} from "react";

const initalvalue = {
  m: 0,
  s: 0,
  h: 0,
  btn: false
}
const reduce = (state, action) => {
  switch (action.type) {
      case "SET_STOP":
          return {
              btn: state.btn = false,
              h: state.h,
              s: state.s,
              m: state.m,
          }
      case "SET_START":
          return {
              btn: state.btn = true,
              s: state.s += 1,
              h: state.h += 0,
              m: state.m += 0,
          }
      case "ADD_RESET":
          return {
              btn: state.btn = false,
              h: state.h = 0,
              s: state.s = 0,
              m: state.m = 0,
          }
          default: return state;
  }
}

let watch

function App() {
  let [state, dispatch] = useReducer(reduce, initalvalue)
  useEffect(() => {
    watch = state.btn ? setInterval(() => {
      dispatch({ type: "SET_START", payload: 1 })
    }) : ""

    return () => clearInterval(watch)
  })
  console.log(state.m)
  function Start() {
    dispatch({ type: "SET_START", payload: true })
  }
  function Stop() {
    dispatch({ type: "SET_STOP", payload: false })
    clearInterval(watch)
  }

  function Reset() {
    dispatch({ type: "ADD_RESET", payload: (0, false) })
    clearInterval(watch)
  }

  return (
    <div >
      <div style={{display:"flex", alignItems: "center",justifyContent: "center", margin: "50px"}}>
        <span>{state.h  ? "0" + state.h : state.h}</span>
        <span>:{state.m  ? "0" + state.m : state.m}</span>
        <span>:{state.s ? "0" + state.s : state.s}</span>
      </div>
      <div style={{display:"flex", alignItems: "center",justifyContent: "center"}}>
        <button onClick={() => Stop()}>Stop</button>
        <button onClick={() => Reset()}>Reset</button>
        <button onClick={() => Start()}>Start</button>
      </div>
    </div>
  );
}

export default App;