import prisma from '../database/prisma.js'
import addSoftDelete from '../middlewares/softDelete.js'
import httpStatus from '../utils/httpStatus.js'

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

  return {
    deleteUser
  }
}
