import { Router } from 'express'
import { taskController } from '../controllers/taskController.js'
import { taskValidation, taskParamsValidation, userValidation, userParamsValidation } from '../middleware/validations'

export const taskRouter = () => {
  const taskRouter = Router()
  // desestructuro las funciones que importo de controller, la lógica que usaría con prisma
  const { getTask, getTaskById, createTask, updateTask, deleteTask } = taskController()

  taskRouter.route('/task')
    .get(getTask)
    .post(userParamsValidation, userValidation, createTask)

  taskRouter.route('/task/:id')
    .get(getTaskById)
    .put(taskParamsValidation, taskValidation, updateTask)
    .delete(deleteTask)

  return taskRouter
}
