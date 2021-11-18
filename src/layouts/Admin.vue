<template>
  <el-container class="layout-container">
    <el-aside width="190px">
      <el-menu
        class="aside-menu"
        router
        :default-active="menuActive"
        :default-openeds="menuOpeneds"
        unique-opened
      >
        <el-submenu index="products">
          <template #title>
            <i class="el-icon-tickets"></i>
            产品
          </template>
          <el-menu-item index="/products/create"> 产品领号 </el-menu-item>
          <el-menu-item index="/products"> 已领号产品列表 </el-menu-item>
        </el-submenu>
        <el-submenu index="users">
          <template #title>
            <i class="el-icon-user"></i>
            用户
          </template>
          <el-menu-item index="/users/create">创建用户</el-menu-item>
          <el-menu-item index="/users">用户列表</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  computed: {
    menuActive() {
      return this.$route.path
    },
    menuOpeneds() {
      const { path } = this.$route
      const submenu = path.split('/')[1]
      return [submenu]
    },
  },
}
</script>

<style lang="scss" scoped>
.layout-container {
  min-height: 100vh;
}

.aside-menu {
  height: 100%;
}

.el-menu-item.is-active {
  background-color: #ecf5ff;
}
</style>
