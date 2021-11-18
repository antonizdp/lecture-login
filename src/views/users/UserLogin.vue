<template>
  <div class="login-container">
    <el-image class="login-pic" :src="require('./img/login.png')">
    </el-image>
    <el-form
      class="login-form"
      label-width="80px"
      :model="user"
      :rules="rules"
      hide-required-asterisk
      @keyup.enter.native="login"
    >
      <el-form-item>
        <h1 class="login-form-heading">登录</h1>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="user.username" autofocus></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="user.password"> </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="login"
          :disabled="!canSubmit"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Image } from 'element-ui'
import Vue from 'vue'

Vue.use(Image)

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '用户名必填', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码必填', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    canSubmit() {
      const { username, password } = this.user
      return Boolean(username && password)
    },
  },
  methods: {
    login() {
      this.$api.users
        .login(this.user)
        .then(({ data }) => {
          const { accessToken } = data
          localStorage.setItem('token', accessToken)
          this.$router.push('/products/create')
        })
        .catch((err) => {
          this.$message.error(err.response.data.message)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.login-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-pic {
  width: 30vw;
  min-width: 300px;
  margin-right: 100px;
}

.login-form {
  width: 30vw;
  min-width: 300px;
}

.el-form-item:last-child {
  margin-bottom: 0;
}

.login-form-heading {
  margin: 0;
}
</style>
