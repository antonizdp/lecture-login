<template>
  <div>
    <el-form label-width="80px">
      <el-row :gutter="50">
        <el-col :span="12">
          <el-form-item label="编号">
            {{ serial }}
          </el-form-item>
          <el-form-item label="留言">
            <el-input type="textarea" v-model="product.note">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="remove">取消</el-button>
            <el-button type="primary" @click="done">完成</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收货人">
            <el-row :gutter="10" type="flex">
              <el-col :span="10">
                <el-input
                  placeholder="姓名"
                  v-model="product.receiverName"
                >
                </el-input>
              </el-col>
              <el-col :span="14">
                <el-input
                  placeholder="手机号"
                  v-model="product.receiverPhone"
                >
                </el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-input
                type="textarea"
                placeholder="地址"
                v-model="product.receiverAddr"
              >
              </el-input>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      product: {
        _id: '',
        prefix: '',
        current: '',
        no: '',
        receiverName: '',
        receiverPhone: '',
        receiverAddr: '',
      },
    }
  },
  computed: {
    serial() {
      const { current, no } = this.product
      return `${current}-${no}`
    },
  },
  created() {
    this.getProduct()
  },
  methods: {
    getProduct() {
      const { id } = this.$route.params
      axios({
        method: 'GET',
        url: `http://localhost:3000/products/${id}`,
      }).then((response) => {
        this.product = response.data
      })
    },
    done() {
      this.$api.products
        .update(this.product._id, this.product)
        .then(() => {
          this.$message.success('保存成功')
          this.$router.push('/products')
        })
    },
    remove() {
      axios({
        method: 'DELETE',
        url: `http://localhost:3000/products/${this.product._id}`,
      }).then(() => {
        this.$message.error('删除成功')
        this.$router.go(-1)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.line {
  text-align: center;
}

// TODO: 验证是否会影响其他组件?
.el-form-item .el-row:not(:first-child) {
  margin-top: 10px;
}
</style>
