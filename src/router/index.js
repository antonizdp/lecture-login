import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'ProductCreate' },
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('../views/users/UserLogin.vue'),
  },
  {
    path: '/demos/1',
    component: () => import('../views/demos/ProductCreate.vue'),
  },
  {
    path: '/admin',
    component: () => import('../layouts/Admin.vue'),
    meta: { authRequired: true },
    children: [
      {
        name: 'ProductCreate',
        path: '/products/create',
        component: () => import('../views/products/ProductCreate.vue'),
      },
      {
        name: 'ProductEdit',
        path: '/products/:id/edit',
        component: () => import('../views/products/ProductEdit.vue'),
      },
      {
        name: 'ProductList',
        path: '/products',
        component: () => import('../views/products/ProductList.vue'),
      },
      {
        name: 'UserCreate',
        path: '/users/create',
        component: () => import('../views/users/UserCreate.vue'),
      },
      {
        name: 'UserList',
        path: '/users',
        component: () => import('../views/users/UserList.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.name !== 'Login' && !token) next({ name: 'Login' })
  else next()
})

export default router
