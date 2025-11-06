import { FastifyInstance } from "fastify"
import { z } from "zod"

import { prisma } from "@libs/prisma"

export const updateCategory = async (app: FastifyInstance) => {
  app.put('/categories/:categoryId', async (request, reply) => {
    const updateCategoryParams = z.object({
      categoryId: z.string().uuid(),
    })

    const updateCategoryBody = z.object({
      name: z.string(),
      description: z.string().optional(),
      tags: z.string().optional(),
    })

    const { categoryId } = updateCategoryParams.parse(request.params)
    const { name, description, tags } = updateCategoryBody.parse(request.body)

    const categoryExists = await prisma.category.findFirst({
      where: { id: categoryId }
    })

    if (!categoryExists) {
      return reply.status(400).send({ message: 'Category does not exists.' })
    }

    const category = await prisma.category.create({
      data: {
        name,
        description, 
        tags
      }
    })

    return reply.status(201).send(category)
  })

}