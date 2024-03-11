import { FastifyInstance } from "fastify"
import { z } from "zod"

import { prisma } from "../../lib/prisma"


export const getCategory = async (app: FastifyInstance) => {
  
  app.get('/categories/:categoryId', async (request, reply) => {
    const getCategoryParams = z.object({
      categoryId: z.string().uuid(),
    })

    const { categoryId } = getCategoryParams.parse(request.params)

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId
      },
    })

    if (!category) {
      return reply.status(400).send({ message: 'Category does not exists.' })
    }

    return reply.status(200).send(category);
  })

}