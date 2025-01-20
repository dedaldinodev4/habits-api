import { FastifyInstance } from "fastify"
import { z } from "zod"

import { prisma } from "../../lib/prisma"
import { Role } from "@prisma/client"

export const signIn = async (app: FastifyInstance) => {
  app.post('/users', async (request, reply) => {

    const signUpRequest = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      role: z.nativeEnum(Role).optional(),
    })

    const { name, email, password, role } = signUpRequest.parse(request.body)

    const userExists = await prisma.user.findFirst({
      where: { email }
    })

    if (userExists) {
      return reply.status(400).send({ message: 'User already exists.' })
    }

    const user = await prisma.user.create({
      data: {
        name,
        email, 
        password, 
        role
      }
    })

    return reply.status(201).send(user)
  })

}