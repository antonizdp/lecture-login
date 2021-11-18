const { createUserSchema } = require('../controllers/schemas/users')
const { createUserHandler } = require('../controllers/handlers/users')

const userRoutes = (fastify, options, done) => {
  fastify.post('/users', {
    schema: createUserSchema,
    handler: createUserHandler,
  })

  done()
}

module.exports = userRoutes
