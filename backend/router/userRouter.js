import { Router } from 'express'
import { userController } from '../controllers/userController'

export const userRouter = () => {
  const userRouter = Router()
  // destructuro las funciones que vienen controller, la logica que usaria con prisma
  const { getUser, getUserById, createUser, updateUser, deleteUser } = userController()

  userRouter.route('/')
    .get(getUser)
    .post(createUser)

  userRouter.route('/user/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

  return userRouter
}
