const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// JWT 秘钥
const jwtKey = 'hfs78dfyds78f7dstyf78dstf78dstf';

const loginHandler = async function(request, reply) {
  const { username, password } = request.body
  const user = await this.mongo.db.collection('users').findOne({ username })
  if (!user) {
    return new Error('用户名或密码错误')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return new Error('用户名或密码错误')
  }
  const accessToken = jwt.sign({ _id: user._id }, jwtKey)
  return {
    accessToken,
  }
}

module.exports = {
  loginHandler,
}
