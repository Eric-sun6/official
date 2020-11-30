function formatDate (date) {
    var date = new Date(date * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var year = date.getFullYear(),
        month = ("0" + (date.getMonth() + 1)).slice(-2),
        sdate = ("0" + date.getDate()).slice(-2),
        hour = ("0" + date.getHours()).slice(-2),
        minute = ("0" + date.getMinutes()).slice(-2),
        second = ("0" + date.getSeconds()).slice(-2);
    // 拼接
    var result = year + "-" + month + "-" + sdate + " " + hour + ":" + minute + ":" + second;
    // 返回
    return result;
}
export default {
    formatDate
}