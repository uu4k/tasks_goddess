import TaskRepository from '@/repositories/task-repository'
import Task from '@/models/task/task'
import Name from '@/models/task/name'
import StateFactory from '@/models/task/state/statefactory'
import Created from '@/models/task/created';

class TaskRegisterService {
  static regist(user, name, state, created) {
    let task = new Task(
      null,
      new Name(name),
      new StateFactory.stateByName(state),
      new Created(created)
    )

    TaskRepository.addTask(user, task)
  }
}

export default TaskRegisterService