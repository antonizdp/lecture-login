module.exports = (fastify, options, done) => {
  fastify.get('/leads', {
    async handler(request, reply) {
      return await this.mongo.db.collection('leads').find().toArray()
    },
  })

  done()
}
