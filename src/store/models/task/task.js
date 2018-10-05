class Task {
  constructor(id, name, state, created) {
    this.id = id
    this.name = name
    this.state = state
    this.created = created
  }

  toHash() {
    return {
      name: this.name.toString(),
      created: this.created.toString(),
      state: this.state.toString(),
    }
  }
}

export default Task
