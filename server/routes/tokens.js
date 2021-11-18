const { loginSchema } = require('../controllers/schemas/tokens')
const { loginHandler } = require('../controllers/handlers/tokens')

const tokenRoutes = (fastify, options, done) => {
  fastify.post('/tokens', {
    schema: loginSchema,
    handler: loginHandler,
  })

  done()
}

module.exports = tokenRoutes
