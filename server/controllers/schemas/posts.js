const typeStr = { type: 'string' }

const product = {
  type: 'object',
  properties: {
    _id: typeStr,
    prefix: typeStr,
    diameter: typeStr,
    current: { type: 'number' },
    no: typeStr,
    note: typeStr,
    receiverName: typeStr,
    receiverPhone: typeStr,
    receiverAddr: typeStr,
  },
}

const getProductsSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        total: { type: 'number' },
        data: {
          type: 'array',
          items: product,
        },
      },
    },
  },
}

const createProductSchema = {
  body: {
    prefix: typeStr,
    diameter: typeStr,
    current: typeStr,
  },
}

const getProductSchema = {
  response: {
    200: product,
  },
}

module.exports = {
  getProductsSchema,
  getProductSchema,
  createProductSchema,
}
