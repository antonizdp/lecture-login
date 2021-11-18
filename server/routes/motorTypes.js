module.exports = (fastify, options, done) => {
  fastify.get('/motorTypes', {
    async handler(request, reply) {
      return await this.mongo.db.collection('motorTypes').find().toArray()
    },
  })

  done()
}
