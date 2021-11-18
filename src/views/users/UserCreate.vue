<template>
  <el-row>
    <el-col :span="8">
      <el-form label-width="80px">
        <el-form-item label="用户名">
          <el-input
            v-model="user.username"
            placeholder="新用户的登录名"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="user.password"
            placeholder="建议 ≥ 8 位，包含字母 / 数字 / 特殊字符"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createUser">
            创建
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    createUser() {
      this.$api.users.create(this.user).then(() => {
        this.$message.success('创建成功')
        this.user = { username: '', password: '' }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
