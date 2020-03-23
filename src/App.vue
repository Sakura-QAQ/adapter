<template>
  <div id="app">
  <transition :name="transitionName">
    <router-view class="position-div"></router-view>
  </transition>
</div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      transitionName: ''
    }
  },
  watch: {
    // 使用watch 监听$router的变化
    $route (to, from) {
      // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        // 设置动画名称
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
    }
  }
}
</script>

<style lang="less">
body {
  width: 100%;
  height: 1080px;
  // background: RGB(40,88,139);
  background: url(./assets/images/demo-1-bg.jpg) no-repeat center / cover;
  overflow: hidden;
  .login-container {
    height: 100%;
    position:relative; /*给正文内容块的父级随便添加个定位属性*/
    .position-div{
        position:absolute; /*给正文内容router-view添加absolute定位使其脱离标准文档流*/
        left:0;
        right:0;
        top:0;
        bottom:0;
    }
  }
}
 .slide-right-enter-active,
 .slide-right-leave-active,
 .slide-left-enter-active,
 .slide-left-leave-active {
   will-change: transform;
   transition: all 200ms;
   position: absolute; //这里的定位使用relative可以解决切换时页面残影
 }.slide-right-enter {
   opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }.slide-right-leave-active {
    opacity: 0;
   transform: translate3d(100%, 0, 0);
 }.slide-left-enter {
   opacity: 0;
   transform: translate3d(100%, 0, 0);
 }.slide-left-leave-active {
   opacity: 0;
   transform: translate3d(-100%, 0, 0);
 }
 .slide-fade{
  position: fixed;left:0;right: 0;
  width: 100%;
  // background-color: white;
}
</style>
