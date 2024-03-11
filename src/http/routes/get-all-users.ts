import { FastifyInstance } from "fastify"
import { z } from "zod"

import { prisma } from "../../lib/prisma"


export const getAllUsers = async (app: FastifyInstance) => {
  
  app.get('/users', async (request, reply) => {
    
    const users = await prisma.user.findMany({}) ?? []

    return reply.send(users);
  })

}