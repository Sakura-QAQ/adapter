import MyChose from '@/components/my-chose.vue'
import PaGer from '@/components/pager.vue'
export default {
  install (Vue) {
    Vue.component(MyChose.name, MyChose)
    Vue.component(PaGer.name, PaGer)
  }
}
