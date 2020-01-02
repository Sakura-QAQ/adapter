// 路由配置
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Weather from '@/views/weather'
import Soil from '@/views/soil'
import Irrigation from '@/views/irrigation'
// import Fertilizer from '@/views/fertilizer'
import Crop from '@/views/fertilizer/crop'
import Cycle from '@/views/fertilizer/cycle'
import Formula from '@/views/fertilizer/formula'
import Passageway from '@/views/fertilizer/passageway'
import Statistic from '@/views/statistic'
import Scene from '@/views/scene'
import NotFound from '@/views/404'
import Try from '@/views/try'

Vue.use(VueRouter)
const router = new VueRouter({
  // 配置路由规则
  routes: [
    { name: 'login', path: '/login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { name: 'welcome', path: '/', component: Welcome },
        { name: 'weather', path: '/weather', component: Weather },
        { name: 'soil', path: '/soil', component: Soil },
        { name: 'irrigation', path: '/irrigation', component: Irrigation },
        // { name: 'fertilizer', path: '/fertilizer', component: Fertilizer },
        { name: 'crop', path: '/crop', component: Crop },
        { name: 'cycle', path: '/cycle', component: Cycle },
        { name: 'formula', path: '/formula', component: Formula },
        { name: 'passageway', path: '/passageway', component: Passageway },
        { name: 'statistic', path: '/statistic', component: Statistic },
        { name: 'scene', path: '/scene', component: Scene },
        { name: 'try', path: '/try', component: Try }
      ]
    },
    { name: '404', path: '*', component: NotFound }
  ]
})

// 加前置守卫

// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   const user = window.sessionStorage.getItem('')
//   if (user) return next()
//   next('/login')
// })

export default router
