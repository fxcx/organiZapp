import prisma from '../database/prisma.js'
import addSoftDelete from '../middlewares/softDelete.js'
import httpStatus from '../utils/httpStatus.js'

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

  return {
    deleteTask
  }
}
