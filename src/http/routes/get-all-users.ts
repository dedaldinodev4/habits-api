import { FastifyInstance } from "fastify"

import { prisma } from "@libs/prisma"


export const getAllUsers = async (app: FastifyInstance) => {
  
  app.get('/users', async (request, reply) => {
    
    const users = await prisma.user.findMany({}) ?? []

    return reply.send(users);
  })

}