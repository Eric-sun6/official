
let plugin = {
  install: (Vue, options) => {
    let utils = require.context('.', false, /\.js$/)
    console.log(utils)
    let $util = new Object()
    utils.keys().forEach(key => {
      if (key === './index.js') return
      let utilName = key.replace(/^\.\//, "").replace(/\.js/, ""); //key = './abcd.js'   utilName = 'abcd'
      $util[utilName] = utils(key).default;  //$util['abcd'] = utils('./abcd.js')
    });
    Vue.prototype.$util = $util;
  }
}
export default plugin 