class Created {
  constructor(created) {
    // TODO validation
    this.created = created | new Date()
  }

  toString() {
    return this.created
  }
}

export default Created