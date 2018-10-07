class TaskRepository {

  // Firestoreへの接続設定
  init(db) {
    this.db = db
    Object.freeze(this)
  }

  addTask(user, task) {
    let data = task.toHash()
    data['uid'] = user.uid

    return this.db.collection('tasks').add(data)
  }
}

// singletonにする
export default new TaskRepository();
