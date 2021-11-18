const getProductsHandler = async function(request, reply) {
  const query = request.query
  const page = +query.page || 1
  const perPage = +query.perPage || 10
  const q = query.q || ''
  const filter = { }
  if (q) filter.$text = { $search: q }
  const products = await this.mongo.db.collection('products')
    .find(filter)
    .sort({ _id: -1 })
    .limit(perPage)
    .skip(perPage * (page - 1))
    .toArray()
  const total = await this.mongo.db.collection('products').countDocuments(filter)
  return {
    total,
    data: products,
  }
}

const getProductHandler = async function (request, reply) {
  const { id } = request.params
  const product = await this.mongo.db.collection('products')
    .findOne({ _id: this.mongo.ObjectId(id) })
  return product
}

const createProductHandler = async function (request, reply) {
  const product = request.body
  const prevProduct = await this.mongo.db.collection('products')
    .findOne(product, { sort: { no: -1 } })
  if (prevProduct) {
    const prevNo = prevProduct.no
    const prevChar = prevNo.slice(0, 1)
    const prevNum = prevNo.slice(1)
    if (prevNum !== '999') {
      product.no = prevChar + String(+prevNum + 1).padStart(3, '0')
    } else {
      product.no = String.fromCodePoint(prevChar.codePointAt() + 1) + '001'
    }
  } else {
    product.no = 'A001'
  }
  await this.mongo.db.collection('products').insertOne(product)
  return product
}

const updateProductHandler = async function (request, reply) {
  const { id } = request.params
  const product = request.body
  delete product._id
  const result = await this.mongo.db.collection('products')
    .updateOne({ _id: this.mongo.ObjectId(id) }, { $set: product })
  return result
}

const deleteProductHandler = async function (request, reply) {
  const { id } = request.params
  const result = await this.mongo.db.collection('products')
    .deleteOne({ _id: this.mongo.ObjectId(id) })
  return result
}

module.exports = {
  getProductsHandler,
  getProductHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
}
