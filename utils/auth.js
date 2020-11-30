import Cookies from 'js-cookie'

const TokenKey = 'front-token'
const zscTokenKey = 'zsc-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
    if (token !== null && token !== undefined && token !== '') {
        Cookies.set(TokenKey, token, { expires: 1, domain: process.env.ENV_DOMAIN, path: '/' })
    }
}

export function removeToken() {
    var domain = document.domain;
    var count =(domain.split('.')).length-1;
    var newDomain = domain;
    if(count == 1){
        newDomain = '.'+domain;
    }
    else if(count == 2){
        newDomain = domain.substring(domain.indexOf("."));
    }
    if(newDomain != domain){
        Cookies.remove(TokenKey,{domain: newDomain,path:'/' })
        Cookies.remove(zscTokenKey,{domain: newDomain,path:'/' })
    }
    Cookies.remove(TokenKey)
    Cookies.remove(zscTokenKey)
}

export function getZscToken() {
    return Cookies.get(zscTokenKey)
}

export function setZscToken(token) {
    if (token !== null && token !== undefined && token !== '') {
        var domain = document.domain;
        var count =(domain.split('.')).length-1;
        var newDomain = domain;
        if(count == 1){
            newDomain = '.'+domain;
        }
        else if(count == 2){
            newDomain = domain.substring(domain.indexOf("."));
        }
        if(newDomain != domain){
            Cookies.set(TokenKey, token, { expires: 1,domain: newDomain,path:'/' })
            Cookies.set(zscTokenKey, token, { expires: 1,domain: newDomain,path:'/' })
        }
        Cookies.set(zscTokenKey, token, { expires: 1 })
    }
}

export function removeZscToken () {
    return Cookies.remove(zscTokenKey)
}
