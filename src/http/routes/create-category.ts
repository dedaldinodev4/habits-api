import { FastifyInstance } from "fastify"
import { z } from "zod"

import { prisma } from "@libs/prisma"

export const createCategory = async (app: FastifyInstance) => {
  app.post('/categories', async (request, reply) => {
    const createCategoryBody = z.object({
      name: z.string(),
      description: z.string().optional(),
      tags: z.string().optional(),
    })

    const { name, description, tags } = createCategoryBody.parse(request.body)

    const categoryExists = await prisma.category.findFirst({
      where: { name }
    })

    if (categoryExists) {
      return reply.status(400).send({ message: 'Category already exists.' })
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