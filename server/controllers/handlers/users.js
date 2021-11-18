const bcrypt = require('bcrypt')

const createUserHandler = async function(request, reply) {
  const { username, password } = request.body
  const user = await this.mongo.db.collection('users').findOne({ username })
  if (user) {
    return new Error('用户名重复')
  }
  const hash = await bcrypt.hash(password, 10)
  const result = await this.mongo.db.collection('users').insertOne({ username, password: hash })
  return { message: '创建成功' }
}

module.exports = {
  createUserHandler,
}
