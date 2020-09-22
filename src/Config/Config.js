export const Screens = {
  configuracion: "configuracion",
  timer: "timer"
}

export const Colors = {
  primary: "#002984",
  secondary: "grey",
  white: "white",
  lightgrey: "lightgrey",
  black: "black"
}


export const configuracion = {
  activityOne: {
    title: "Camina",
    minutes: 0,
    seconds: 0
  },
  activityTwo: {
    title: "Trota",
    minutes: 0,
    seconds: 0
  },
  steps: {
    steps: 0
  }
}

export const TimerStates = {
  stopped: "stopeed",
  started: "started"
}

export const TimerConfig = {
  timerStatus: TimerStates.stopped,
  timerVal: "0",
  stepsLeft: "0",
  currentActivity: "Preparado?",
}
