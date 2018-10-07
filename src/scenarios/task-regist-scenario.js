import TaskRegisterService from '@/services/task-register-service'

class TaskRegistScenario {
  static regist(user, name, state, created) {
    TaskRegisterService.regist(
      user, name, state, created
    )
  }
}

export default TaskRegistScenario