import { createRouter, createWebHistory } from 'vue-router'
import User from '../views/user/UserLR.vue'
import Login from '../views/user/UserLogin.vue'
import Register from '../views/user/UserRegister.vue'
import Trading from '../views/trading/TradingPage.vue'
import UpdateUserMsg from '../views/user/updateUserMsg/UpdateUserMsg.vue'
import UpdateUsername from '../views/user/updateUserMsg/UpdateUsername.vue'
import UpdatePassword from '../views/user/updateUserMsg/UpdatePassword.vue'
import StockInfo from '../views/stockPool/StockInfo.vue'
import user from '@/api/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/user/login',
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      children: [
        {
          path: 'login',
          name: 'login', 
          component: Login,
        },
        {
          path: 'register',
          name: 'register',
          component: Register,
        },
      ],
    },
    {
      path: '/update',
      name: 'update',
      component: UpdateUserMsg,
      children: [
        {
          path: 'updateUsername',
          name: 'updateUsername',
          component: UpdateUsername,
        },
        {
          path: 'updatePassword',
          name: 'updatePawword',
          component: UpdatePassword,
        },
      ],
    },

    {
      path: '/trading',
      name: 'trading',
      component: Trading,

      beforeEnter: (to, from, next) => {
        const token = window.sessionStorage.getItem("token")
        if (token) {
          user.validLogin(token)
          next()
        } else {
          next('/user/login')
        }
      },
    },

    {
      path: '/stockInfo',
      name: 'stockInfo',
      component: StockInfo,
    },
  ],
})

export default router
