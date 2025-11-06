import { FastifyInstance } from "fastify"
import { z } from "zod"
import jwt from 'jsonwebtoken'

import { prisma } from "@libs/prisma"
import { Role } from "@prisma/client"
import { hashPassword } from "@utils/auth"


export const signUp = async (app: FastifyInstance) => {
  app.post('/auth/sign-up', async (request, reply) => {

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
        password: hashPassword(password),
        role
      }
    })

    const currentUser = {
      email, name, role, id: user.id
    }

    const token = jwt.sign(
      {
        user: currentUser,
      }, process.env.JWT_KEY ?? 'secret',
      { expiresIn: "30d" }
    );

    

    return reply.status(201).send({
      user: currentUser,
      token
    })
  })

}