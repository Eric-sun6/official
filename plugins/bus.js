import Vue from 'vue'

const bus = {}

bus.install = function (Vue) {
    Vue.prototype.$bus = new Vue()
}

Vue.use(bus)

export default (ctx, inject) => {
    const bus = new Vue;
    inject('bus', bus);
};