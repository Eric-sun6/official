import {createSearchParams} from '~utils/main'

// 获取手机验证码
export function getMobileCode(context, mobile) {
    return new Promise((resolve, reject) => {
        context.$axios.post('/am/mobileCode', createSearchParams({mobile}))
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}

// 注册
export function register(context,mobile, personPwd, mobileCode) {
    return new Promise((resolve, reject) => {
        context.$axios.post('/am/register', createSearchParams({mobile, personPwd, mobileCode}))
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}
