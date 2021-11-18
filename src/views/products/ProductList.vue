<template>
  <div>
    <el-form inline>
      <el-form-item>
        <el-input v-model="query.q" placeholder="请搜索"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="search()">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="products">
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column prop="prefix" label="前缀"></el-table-column>
      <el-table-column prop="current" label="电流"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            @click="editProduct(row._id)"
            size="mini"
            type="text"
          >
            编辑
          </el-button>
          <el-button size="mini" type="text" @click=""
            >删除</el-button
          >
          <el-button
            size="mini"
            type="text"
            @click="showProduct(row._id)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="pagination"
      background
      :page-size.sync="query.perPage"
      :total="total"
      :current-page.sync="query.page"
      @current-change="getProducts"
      layout="->, prev, pager, next, jumper"
    >
    </el-pagination>

    <el-drawer title="产品详情" :visible.sync="productVisible">
      <div>编号 {{ product.no }}</div>
    </el-drawer>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import { Drawer } from 'element-ui'

Vue.use(Drawer)

export default {
  data() {
    return {
      products: [],
      productVisible: false,
      product: {
        no: '',
        prefix: '',
      },
      total: 0,
      query: {
        page: 1,
        perPage: 5,
        q: '',
      },
    }
  },
  created() {
    this.getProducts()
  },
  methods: {
    showProduct(id) {
      axios
        .get(`http://localhost:3000/products/${id}`)
        .then(({ data }) => {
          this.product = data
          this.productVisible = true
        })
    },
    search() {
      this.query.page = 1
      this.getProducts()
    },
    getProducts() {
      this.$api.products.get(this.query).then((response) => {
        this.products = response.data.data
        this.total = response.data.total
      })
    },
    editProduct(id) {
      this.$router.push(`/products/${id}/edit`)
    },
  },
}
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 20px;
}
</style>
