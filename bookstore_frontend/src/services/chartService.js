export function filterUsersAll(raw, filter) {
    let data = new Map();
    raw.forEach((ite) => {
        let tmpArr = [0, 0];
        ite.asOrderList.forEach((iite) => {
            iite.forEach((iiite) => {
                if (filter(iiite.date)) {
                    tmpArr[0] += iiite.amount;
                    tmpArr[1] += iiite.amount * iiite.price;
                }
            })
        });
        data.set(ite.username, tmpArr);
    });

    let ret = [];
    data.forEach((val, key, obj) => {
        let tmp = {};
        tmp['name'] = key;
        tmp['drilldown'] = key;
        tmp['y'] = val[1];
        tmp['sales'] = val[0];
        ret.push(tmp);
    });

    return ret.sort((a, b) => {
        return b.y - a.y;
    });
}

export function filterUsersDrillDown(raw, filter) {
    let data = new Map();
    raw.forEach((ite) => {
        ite.asOrderList.forEach((iite) => {
            iite.forEach((iiite) => {
                if (filter(iiite.date)) {
                    let tmpArr = [];
                    let findIdx = 0;
                    let tmp = [];
                    if (data.has(ite.username)) {
                        tmpArr = data.get(ite.username);
                        if ((findIdx = tmpArr.findIndex((ite) => ite[0] === iiite.name)) !== -1) {
                            tmpArr[findIdx][1] += iiite.amount;
                            tmpArr[findIdx][2] += iiite.price * iiite.amount;
                        } else {
                            tmp[0] = iiite.name;
                            tmp[1] = iiite.amount;
                            tmp[2] = iiite.price * iiite.amount;
                            tmpArr.push(tmp);
                        }
                        data.set(ite.username, tmpArr);
                    } else {
                        tmp[0] = iiite.name;
                        tmp[1] = iiite.amount;
                        tmp[2] = iiite.price * iiite.amount;
                        tmpArr.push(tmp);
                        data.set(ite.username, tmpArr);
                    }
                }
            })
        })
    });

    const cmp = (a, b) => {
        return b[2] - a[2];
    };

    let ret = [];
    data.forEach((val, key, obj) => {
        let tmp = {};
        tmp['id'] = key;
        tmp['data'] = val.sort(cmp).map((ite) => {
            let tmp = {};
            tmp['name'] = ite[0];
            tmp['y'] = ite[2];
            tmp['sales'] = ite[1];
            return tmp;
        });
        tmp['name'] = key;
        ret.push(tmp);
    });
    console.log(ret);

    return ret;
}

export function filterSalesAll(raw, filter) {
    let data = new Map();
    raw.forEach((ite) => {
        ite.asOrderList.forEach((iite) => {
            iite.forEach((iiite) => {
                if (filter(iiite.date)) {
                    let tmpArr = [];
                    if (data.has(iiite.type)) {
                        tmpArr = data.get(iiite.type);
                        tmpArr[0] += iiite.amount;
                        tmpArr[1] += iiite.amount * iiite.price;
                        data.set(iiite.type, tmpArr);
                    } else {
                        tmpArr[0] = iiite.amount;
                        tmpArr[1] = iiite.amount * iiite.price;
                        data.set(iiite.type, tmpArr);
                    }
                }
            })
        })
    });

    let ret = [];
    data.forEach((val, key, obj) => {
        let tmp = {};
        tmp['name'] = key;
        tmp['drilldown'] = key;
        tmp['y'] = val[1];
        tmp['sales'] = val[0];
        ret.push(tmp);
    });

    const cmp = (a, b) => {
        return b.y - a.y;
    };

    return ret.sort(cmp);
}

export function filterSalesDrillDown(raw, filter) {
    let data = new Map();
    raw.forEach((ite) => {
        ite.asOrderList.forEach((iite) => {
            iite.forEach((iiite) => {
                if (filter(iiite.date)) {
                    let tmpArr = [];
                    let findIdx = 0;
                    let tmp = [];
                    if (data.has(iiite.type)) {
                        tmpArr = data.get(iiite.type);
                        if ((findIdx = tmpArr.findIndex((ite) => ite[0] === iiite.name)) !== -1) {
                            tmpArr[findIdx][1] += iiite.amount;
                            tmpArr[findIdx][2] += iiite.price * iiite.amount;
                        } else {
                            tmp[0] = iiite.name;
                            tmp[1] = iiite.amount;
                            tmp[2] = iiite.price * iiite.amount;
                            tmpArr.push(tmp);
                        }
                        data.set(iiite.type, tmpArr);
                    } else {
                        tmp[0] = iiite.name;
                        tmp[1] = iiite.amount;
                        tmp[2] = iiite.price * iiite.amount;
                        tmpArr.push(tmp);
                        data.set(iiite.type, tmpArr);
                    }
                }
            })
        })
    });

    const cmp = (a, b) => {
        return b[2] - a[2];
    };

    let ret = [];
    data.forEach((val, key, obj) => {
        let tmp = {};
        tmp['id'] = key;
        tmp['data'] = val.sort(cmp).map((ite) => {
            let tmp = {};
            tmp['name'] = ite[0];
            tmp['y'] = ite[2];
            tmp['sales'] = ite[1];
            return tmp;
        });
        tmp['name'] = key;
        ret.push(tmp);
    });
    console.log(ret);

    return ret;
}