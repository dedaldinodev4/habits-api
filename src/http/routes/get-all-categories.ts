import { FastifyInstance } from "fastify"

import { prisma } from "@libs/prisma"


export const getAllCategories = async (app: FastifyInstance) => {
  
  app.get('/categories', async (request, reply) => {
    
    const categories = await prisma.category.findMany({}) ?? []

    return reply.status(200).send(categories);
  })

}