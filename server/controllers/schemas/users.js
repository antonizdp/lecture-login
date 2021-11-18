const createUserSchema = {
  body: {
    type: 'object',
    required: [ 'username', 'password' ],
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
}

module.exports = {
  createUserSchema,
}
