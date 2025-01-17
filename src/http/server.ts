import fastify from "fastify";

//* Routes *//
import { getAllUsers } from "./routes/get-all-users";

import { getCategory } from "./routes/get-category";
import { getAllCategories } from "./routes/get-all-categories";
import { createCategory } from "./routes/create-category";
import { updateCategory } from "./routes/update-category";
import { deleteCategory } from "./routes/delete-category";

const server = fastify({
  logger: true
})

server.register(getAllUsers)

server.register(createCategory)
server.register(updateCategory)
server.register(getAllCategories)
server.register(getCategory)
server.register(deleteCategory)


server.get('/', function (req, reply) {
  return reply.send('Hello API')
})

server.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!")
})
