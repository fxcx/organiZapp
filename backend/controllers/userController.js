import prisma from '../database/prisma.js'
import addSoftDelete from '../middleware/softDelete.js'
import httpStatus from '../helpers/httpStatus.js'

export const userController = () => {
  const deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params
      prisma.$use(addSoftDelete)
      const userDeleted = await prisma.user.delete({
        where: {
          id: Number(id)
        }
      })
      res.status(httpStatus.FOUND).json({
        success: true,
        message: 'User Deleted',
        data: userDeleted
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateUser = async (req, res, next) => {
    try {
      const { id } = req.params
      const userUpdated = await prisma.user.update({
        where: {
          id: Number(id)
        }
      })
      res.status(httpStatus.OK).json({
        success: true,
        message: 'User Updated',
        data: userUpdated
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getUser = async (_req, res, next) => {
    try {
      const users = await prisma.user.findMany()
      res.status(httpStatus.OK).json(users)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getUserById = async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await prisma.user.findUnique({
        where: {
          id: Number(id)
        },
        include: {
          tasks: true
        }
      })
      res.status(httpStatus.OK).json(user)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const createUser = async (req, res, next) => {
    try {
      const { username, email, password, birthYear } = req.body
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password,
          birthYear: new Date(birthYear)
        }
      })
      return res.status(httpStatus.CREATED).json(user)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    updateUser,
    deleteUser,
    getUser,
    getUserById,
    createUser
  }
}
