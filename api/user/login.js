import {createSearchParams} from '~utils/main'

//登录
export function login(context, personName, password, lsmToken) {
    return new Promise((resolve, reject) => {
        context.$axios.post('/am/login',
            createSearchParams({
                    personName: personName,
                    password: password,
                    lsmToken: lsmToken
            })
            )
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}

//注册后登录
export function autoLogin(context, personName, password) {
    return new Promise((resolve, reject) => {
        context.$axios.post('/am/autoLogin',
            createSearchParams({
                personName: personName,
                password: password
            })
        )
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}

//登录yzm
export function loginByCode(context, personName, password, verifyCode) {
    return new Promise((resolve, reject) => {
        context.$axios.post('/am/loginByCode',
            {
                params: {
                    personName: personName,
                    password: password,
                    verifyCode: verifyCode
                }
            })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}

// 检查token是否过期
export function checkToken(context, token) {
    return new Promise((resolve, reject) => {
        return resolve(true)
    })
}

// 登录之后查询企业邀请
export function corporateInvitation(context) {
    return new Promise((resolve, reject) => {
        context.$axios.get('/am/corporateInvitation')
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}

// 企业操作.同意加入企业或者拒绝加入企业
export function operation(context, data) {
    return new Promise((resolve, reject) => {
        context.$axios.post('/am/operation', createSearchParams(data))
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}

//查询当前登陆用户是否有权限 zsc
export function getIsShowZSC(context) {
    return new Promise((resolve, reject) => {
        context.$axios.get('/admin/getZSCPromission')
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}

//查询当前登陆用户是否有权限 wlfa
export function getIsShowWL(context) {
    return new Promise((resolve, reject) => {
        context.$axios.get('/admin/getWLPromission')
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}
