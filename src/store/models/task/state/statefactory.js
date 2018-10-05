import TodoState from "./todostate"
import DoingState from "./doingstate"
import DoneState from './donestate'

class StateFactory {
  static STATES() {
    return {
      todo: new TodoState(),
      doing: new DoingState(),
      done: new DoneState()
    }
  }

  static stateByName(name) {
    return StateFactory.STATES()[name]
  }
}

export default StateFactory