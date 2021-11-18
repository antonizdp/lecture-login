module.exports = (fastify, options, done) => {
  fastify.get('/motorThicknesses', {
    async handler(request, reply) {
      return await this.mongo.db.collection('motorThicknesses').find().toArray()
    },
  })

  done()
}
