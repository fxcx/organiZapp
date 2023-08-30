import { Router } from 'express'
import { taskController } from '../controllers/'

export const taskRouter = () => {
  const taskRouter = Router()
  // destructuro las funciones que vienen controller, la logica que usaria con prisma
  const { getUser, getUserById, createUser, updateUser, deleteUser } = taskController()

  taskRouter.route('/task')
    .get(getUser)
    .post(createUser)

  taskRouter.route('/task/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

  return taskRouter
}
