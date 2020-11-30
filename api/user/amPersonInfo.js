import {createSearchParams} from '~utils/main'

//获取AmPersonInfo
export function getPersonalInfo(context) {
    return new Promise((resolve, reject) => {
        context.$axios.get('/am/getPersonalInfo')
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}

export function updatePersonal(context, data) {
    return new Promise((resolve, reject) => {
        context.$axios.post('/am/updatePersonal', createSearchParams(data))
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}

export function restPwd(context, newPwd, oldPwd) {
    return new Promise((resolve, reject) => {
        context.$axios.post('/am/modifyPersonPwd',
            {
                newPwd: newPwd,
                oldPwd: oldPwd
            }).then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}

//获取教育程度
export function getEducation(context) {
    return new Promise((resolve, reject) => {
        context.$axios.get('/sys/getDictDetailList/EDUCATION/' + Math.random())
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}

//获取审核没通过时的企业信息
export function getEnterpriseInfo(context) {
    return new Promise((resolve, reject) => {
        context.$axios.get('/am/getEnterpriseInfo')
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}

//获取审核没通过时的企业信息
export function getUserToken(context) {
    return new Promise((resolve, reject) => {
        context.$axios.get('/am/getToken')
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}