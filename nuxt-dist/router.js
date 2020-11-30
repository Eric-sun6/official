import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _73c1feda = () => interopDefault(import('../pages/aboutUs/index.vue' /* webpackChunkName: "pages/aboutUs/index" */))
const _4c722a8a = () => interopDefault(import('../pages/platformService/index.vue' /* webpackChunkName: "pages/platformService/index" */))
const _29c56a72 = () => interopDefault(import('../pages/solution/index.vue' /* webpackChunkName: "pages/solution/index" */))
const _44094b97 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/aboutUs",
    component: _73c1feda,
    name: "aboutUs"
  }, {
    path: "/platformService",
    component: _4c722a8a,
    name: "platformService"
  }, {
    path: "/solution",
    component: _29c56a72,
    name: "solution"
  }, {
    path: "/",
    component: _44094b97,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
