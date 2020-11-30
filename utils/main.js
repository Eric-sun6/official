/**
 * @function 生成 URLSearchParams参数
 * @param  {Object} 参数对象
 * @return {Object} URLSearchParams对象
 */
function createSearchParams (json) {
    let param = new URLSearchParams();
    for (var key in json) {
        param.append(key, json[key]);
    }
    return param;
}

/**
 * @function 设置字典 Map
 * @param  {Array} 原数组
 * @param  {String} 作为 key 的的字段
 * @param  {String} 作为 value 的的字段
 * @return {Object} 获取到得新的字典
 */
function setDictMap (arr, key, value) {
    key = key || 'dictValue';
    value = value || 'name';
    let json = {};
    // 遍历数组
    arr.forEach((item) => {
        // 生成 {key:value} 对象 比赋值给json
        json[item[key]] = item[value];
    });
    return json;
}

/**
 * @function 通过参数名称得到参数值
 * @param  string 参数
 * @return string 格式化后的数据
 */
function GetQueryValue (queryName) {
    let query = decodeURI(window.location.search.substring(1));
    let queryArr = query.split("&");
    for (let i = 0; i < queryArr.length; i++) {
        let pair = queryArr[i].split("=");
        if (pair[0] == queryName) { return pair[1]; }
    }
    return null;
}
/**
 * @function dataFormat
 * @param  {Object} 参数
 * @param  {Array} 原数组
 * @return 格式化后的数据
 */
function dataFormat (options, sNodes) {
    let key = options.data.simpleData.idKey;
    let parentKey = options.data.simpleData.pIdKey;
    let childKey = options.data.key.children;
    let name = options.data.key.name;
    // 如果没有 key 或者 key 为空或者没有 sNodes 返回空数组
    if (!key || key === '' || !sNodes) return [];
    let r = [];
    let tmpMap = {};
    // 循环数组， 并将数据中每一项用参数设置的key值作为key存入到tmpMap对象中
    for (let i = 0, l = sNodes.length; i < l; i++) {
        sNodes[i].value = sNodes[i][options.data.simpleData.idKey]
        sNodes[i].label = sNodes[i][options.data.key.name]
        if (!tmpMap[sNodes[i][key]]) {
            sNodes[i].label = sNodes[i][name]
            tmpMap[sNodes[i][key]] = sNodes[i];
        }
    }

    for (let i = 0, l = sNodes.length; i < l; i++) {
        // 如果当前元素有parentId 则作是子节点 如果没有则为父节点
        if (tmpMap[sNodes[i][parentKey]] && sNodes[i][key] !== sNodes[i][parentKey]) {
            let item = tmpMap[sNodes[i][parentKey]];
            // 如果没有children数组 创建children数组
            if (!item[childKey]) {
                item[childKey] = []
            }
            // 标记为子节点
            sNodes[i].isParent = false;
            sNodes[i].open = false
            // 将当前元素添加到父节点的 children数组中
            item[childKey].push(sNodes[i]);
        } else {
            // 标记为父节点
            sNodes[i].isParent = true;
            sNodes[i].open = true;
            r.push(sNodes[i]);
        }
    }
    return {
        map: tmpMap,
        list: r
    };
}

function toGMT8 (data) {
    return new Date(data.toString().replace('GMT+0900 (中国夏令时间)', 'GMT+0800 (中国标准时间)'))
}

function getMatchPort (value, seaPort) {
    var foreignSeaport = []
    if (value === '') {
        return seaPort
    } else {
        for (var index = 0, len = seaPort.length; index < len; index++) {
            if (seaPort[index].eng.indexOf(value.toUpperCase()) !== -1 || seaPort[index].chn.indexOf(value) !== -1 || (seaPort[index].alias != null && seaPort[index].alias.indexOf(value) !== -1)) {
                foreignSeaport.push(seaPort[index])
            }
        }
        return foreignSeaport;
    }
}

function getMatchSiteForQucikOrder (value, list) {
    var filterList = []
    if (value === '' || value === '(' || value === ')' || value === ' ') {
        return list
    } else {
        for (var index = 0, len = list.length; index < len; index++) {
            if (list[index].label.indexOf(value) !== -1 || list[index].label.indexOf(value) !== -1 || (list[index].alias != null && list[index].alias != '' && list[index].alias.indexOf(value) !== -1)) {
                filterList.push(list[index])
            }
        }
        return filterList;
    }
}

function openDownloadDialog (url, saveName) {
    if (typeof url == 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url);
    }
    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || '';
    var event;
    if (window.MouseEvent) event = new MouseEvent('click');
    else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
}

function contrastFeeDetailObject (oldObj, newObj) {
    var names = Object.getOwnPropertyNames(oldObj)
    for (var index in names) {
        var key = names[index]
        if (key != 'id' && key != 'platfromExpenseId' && key != 'platformExpenseCode' && key != '__ob__' && key != 'edit') {
            if (oldObj[key] != newObj[key]) {
                return true
            }
        }
    }
}

function dayBegin (time) {
    time.setHours(0)
    time.setMinutes(0)
    time.setSeconds(0)
    return time
}

function orderByContainer (arr) {
    return _.sortBy(arr, function (item) {
        switch (item.containerSize + item.containerType) {
            case '20GP':
                return 0
                break
            case '40GP':
                return 1
                break
            case '40HC':
                return 2
                break
            default:
                return 9
        }
    });
}

function getZSCWebSite () {
    if (location.host.indexOf('localhost') != -1) {
        return "http://localhost:9999/#/"
    } else if (location.host.indexOf('www') != -1) {
        return 'http://' + location.host.replace('www', 'zmall') + "/#/"
    } else {
        return 'https://zmall.' + location.host + "/#/"
    }
}

export {
    createSearchParams,
    setDictMap,
    dataFormat,
    toGMT8,
    getMatchPort,
    getMatchSiteForQucikOrder,
    openDownloadDialog,
    contrastFeeDetailObject,
    dayBegin,
    orderByContainer,
    getZSCWebSite,
    GetQueryValue
}
