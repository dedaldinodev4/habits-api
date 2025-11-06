import { FastifyInstance } from "fastify"
import { z } from "zod"

import { prisma } from "@libs/prisma"

export const deleteCategory = async (app: FastifyInstance) => {
  app.delete('/categories/:categoryId', async (request, reply) => {
    const deleteCategoryParams = z.object({
      categoryId: z.string().uuid(),
    })


    const { categoryId } = deleteCategoryParams.parse(request.params)

    const categoryExists = await prisma.category.findFirst({
      where: { id: categoryId }
    })

    if (!categoryExists) {
      return reply.status(400).send({ message: 'Category does not exists.' })
    }

    const category = await prisma.category.delete({
     where: { id: categoryId }
    })

    return reply.status(204).send()
  })

}