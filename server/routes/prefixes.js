module.exports = (fastify, options, done) => {
  // 获取前缀列表
  fastify.get('/prefixes', {
    async handler(request, reply) {
      return await this.mongo.db.collection('prefixes').find().toArray()
    },
  })

  done()
}
