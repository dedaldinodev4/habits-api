import { FastifyInstance } from "fastify"
import { z } from "zod"

import { prisma } from "@libs/prisma"


export const getUser = async (app: FastifyInstance) => {
  
  app.get('/users/:userId', async (request, reply) => {
    const getUserParams = z.object({
      userId: z.string().uuid(),
    })

    const { userId } = getUserParams.parse(request.params)

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
    })

    if (!user) {
      return reply.status(400).send({ message: 'User does not exists.' })
    }

    return reply.send(user);
  })

}