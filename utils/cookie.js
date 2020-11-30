import Cookies from 'js-cookie'
//设置cookie
function setCookie (key, value) {
    Cookies.set(key, value, { domain: process.env.ENV_DOMAIN, path: '/' })
}
//取cookie
function getCookie (key) {
    return Cookies.get(key);
}
export default {
    setCookie,
    getCookie
}