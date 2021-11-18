<template>
  <div>
    <el-table :data="products">
      <el-table-column label="选择">
        <template #default="{ $index }">
          <el-radio v-model="currentIndex" :label="$index" @change="handleCurrentChange"
            >&nbsp;</el-radio
          >
        </template>
      </el-table-column>
      <el-table-column label="名字" prop="name"></el-table-column>
      <el-table-column label="是否赠与">
        <template #default="{ row, $index }">
          <el-radio-group v-model="row.isGift" :disabled="$index !== currentIndex">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </template>
      </el-table-column>
      <el-table-column label="数量">
        <template #default="{ row, $index }">
          <el-input v-model="row.num" :disabled="$index !== currentIndex"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="submit">确定</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: null,
      products: [
        { id: 1, name: '杜康', isGift: null, num: '' },
        { id: 2, name: '茅台', isGift: null, num: '' },
        { id: 3, name: '啤酒', isGift: null, num: '' },
      ],
    }
  },
  methods: {
    handleCurrentChange() {
      this.products
        .filter((item, index) => index !== this.currentIndex)
        .forEach((item) => {
          item.isGift = null
          item.num = ''
        })
    },
    submit() {
      if (this.currentIndex === null) {
        this.$message.error('必须选择一个商品')
        return
      }
      const product = this.products[this.currentIndex]
      const { isGift, num } = product
      if (isGift === null) {
        this.$message.error('必须设置是否赠与')
        return
      }
      if (num === '') {
        this.$message.error('必须填写数量')
        return
      }
      // 发送 axios 请求
      // this.$api.products.pick(product).then(() => {})
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
