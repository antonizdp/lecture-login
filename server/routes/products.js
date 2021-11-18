const jwt = require('jsonwebtoken')

const jwtKey = 'hfs78dfyds78f7dstyf78dstf78dstf';

const {
  getProductsSchema,
  getProductSchema,
  createProductSchema,
} = require('../controllers/schemas/posts')

const {
  getProductsHandler,
  getProductHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
} = require('../controllers/handlers/posts')

const productRoutes = (fastify, options, done) => {
  // 获取产品列表
  fastify.get('/products', {
    schema: getProductsSchema,
    async preHandler(request, reply) {
      const token = (request.headers.authorization || '').slice(7)
      try {
        const { _id: userId } = jwt.verify(token, jwtKey)
      } catch (error) {
        reply.code(401)        
        throw new Error('请登录')
      }
    },
    handler: getProductsHandler,
  })

  // 获取产品详情
  fastify.get('/products/:id', {
    schema: getProductSchema,
    handler: getProductHandler,
  })

  // 创建产品
  fastify.post('/products', {
    schema: createProductSchema,
    handler: createProductHandler,
  })

  // 修改产品信息
  fastify.put('/products/:id', {
    handler: updateProductHandler,
  })

  // 删除产品
  fastify.route({
    method: 'DELETE',
    url: '/products/:id',
    handler: deleteProductHandler,
  })

  done()
}

module.exports = productRoutes
