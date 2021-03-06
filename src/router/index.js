// 路由配置
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Registe from '@/views/registe'
import Password from '@/views/password'
import Chose from '@/views/chose'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Weather from '@/views/weather'
import Soil from '@/views/soil'
import Irrigation from '@/views/irrigation'
// import Fertilizer from '@/views/fertilizer'
import CropCycle from '@/views/fertilizer/crop-cycle'
import Cycle from '@/views/fertilizer/cycle'
import Formula from '@/views/fertilizer/formula'
// import Details from '@/views/fertilizer/details'
import Passageway from '@/views/fertilizer/passageway'
import Statistic from '@/views/statistic'
import Scene from '@/views/scene'
import NotFound from '@/views/404'
import Try from '@/views/try'
import Daily from '@/views/daily'

Vue.use(VueRouter)
const router = new VueRouter({
  // 配置路由规则
  routes: [
    {
      name: 'login',
      path: '/login',
      meta: {
        index: 0
      },
      component: Login
    },
    {
      name: 'registe',
      path: '/registe',
      meta: {
        index: 1
      },
      component: Registe
    },
    {
      name: 'password',
      path: '/password',
      meta: {
        index: 2
      },
      component: Password
    },
    {
      name: 'chose',
      path: '/chose',
      meta: {
        index: 3
      },
      component: Chose
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          name: 'welcome',
          path: '/',
          meta: {
            index: 4
          },
          component: Welcome
        },
        { name: 'weather', path: '/weather', component: Weather },
        { name: 'soil', path: '/soil', component: Soil },
        { name: 'irrigation', path: '/irrigation', component: Irrigation },
        // { name: 'fertilizer', path: '/fertilizer', component: Fertilizer },
        { name: 'crop', path: '/Crop-Cycle', component: CropCycle },
        { name: 'cycle', path: '/cycle', component: Cycle },
        { name: 'formula', path: '/formula', component: Formula },
        // { name: 'details', path: '/details', component: Details },
        { name: 'passageway', path: '/passageway', component: Passageway },
        { name: 'statistic', path: '/statistic', component: Statistic },
        { name: 'scene', path: '/scene', component: Scene },
        { name: 'try', path: '/try', component: Try },
        { name: 'daily', path: '/daily', component: Daily }
      ]
    },
    { name: '404', path: '*', component: NotFound }
  ]
})

// 加前置守卫

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  if (to.path === '/registe') return next()
  if (to.path === '/password') return next()
  const user = window.sessionStorage.getItem('token')
  if (user) return next()
  next('/login')
})

export default router
