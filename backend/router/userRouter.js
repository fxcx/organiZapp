import { Router } from 'express'
import { userController } from '../controllers/userController.js'

export const userRouter = () => {
  const userRouter = Router()
  // desestructuro las funciones que importo de controller, la lógica que usaría con prisma
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
