import prisma from '../database/prisma.js'
import addSoftDelete from '../middleware/softDelete.js'
import httpStatus from '../helpers/httpStatus.js'

export const taskController = () => {
  const deleteTask = async (req, res, next) => {
    try {
      const { id } = req.params
      prisma.$use(addSoftDelete)
      const taskDeleted = await prisma.user.delete({
        where: {
          id: Number(id)
        }
      })
      res.status(httpStatus.FOUND).json({
        success: true,
        message: 'Task Deleted',
        data: taskDeleted
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateTask = async (req, res, next) => {
    try {
      const { id } = req.params
      const taskUpdated = await prisma.user.update({
        where: {
          id: Number(id)
        }
      })
      res.status(httpStatus.OK).json({
        success: true,
        message: 'Task Updated',
        data: taskUpdated
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getTask = async (_req, res, next) => {
    try {
      const users = await prisma.user.findMany()
      res.status(httpStatus.OK).json(users)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getTaskById = async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await prisma.user.findUnique({
        where: {
          id: Number(id)
        }
      })
      res.status(httpStatus.OK).json(user)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const createTask = async (req, res, next) => {
    try {
      const { username, email, password, birthYear } = req.body
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password,
          birthYear
        }
      })

      res.status(httpStatus.CREATED).json(user)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    updateTask,
    deleteTask,
    getTask,
    getTaskById,
    createTask
  }
}
