import Home from './view/home.vue'
import About from './view/about.vue'
import Vue from 'vue'


class VueRouter {
  constructor(options) {

    //理由配置保存
    this.$options = options;
    this.routeMap = {};

    //路由响应式,与Vue强绑定
    this.app = new Vue({
      data: {
        current: '/'
      }
    })


  }
  init() {
    this.bindEvents(); //url监听
    this.createRouterMap(this.$options) //解析理由配置
    this.initComponent() //实现组件
  }
  bindEvents() {
    window.addEventListener('load', this.onHashChange.bind(this))
    window.addEventListener('hashchange', this.onHashChange.bind(this))
  }
  onHashChange() {
    this.app.current = window.location.hash.slice(1) || '/'
  }
  createRouterMap(options) {
    //把路由的path与component 做一个隐射关系
    options.routes.forEach(item => {
      this.routeMap[item.path] = item.components
    });
  }
  initComponent() {
    //router-link router-view
    Vue.component('router-link', {
      props: { to: String },
      render(h) {
        //h(tag,data,children)
        return h('a', { attrs: { href: '#' + this.to } }, [this.$slots.default]);
      },
    })

    Vue.component('router-view', {
      render:(h)=> {
        //h(tag,data,children)
        const comp = this.routeMap[this.app.current]
        return h(comp);
      },
    })
  }
}

//vue插件需要一个insall方法
VueRouter.install = function (Vue) {
  //混入,用于插件开发
  Vue.mixin({
    //会跟所有的组件的beforCreate一块执行
    beforeCreate() {
      if (this.$options.router) {
        //仅在根组件执行一次
        Vue.prototype.$router = this.$options.router;
        this.$options.router.init();
      }
    }
  })
}
// 中间件注册
Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: '/', components: Home },
    { path: '/about', components: About }
  ]
})