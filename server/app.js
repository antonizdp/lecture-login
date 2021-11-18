const fastify = require('fastify')()

fastify.register(require('fastify-mongodb'), {
  url: 'mongodb://localhost:27017/linear',
  forceClose: true,
})

fastify.register(require('fastify-cors'))

// 定义接口路由
fastify.register(require('./routes/prefixes'))
fastify.register(require('./routes/motorTypes'))
fastify.register(require('./routes/motorThicknesses'))
fastify.register(require('./routes/leads'))
fastify.register(require('./routes/products'))
fastify.register(require('./routes/users'))
fastify.register(require('./routes/tokens'))

fastify.listen(3000)
