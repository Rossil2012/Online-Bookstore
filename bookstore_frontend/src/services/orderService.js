import {postRequest} from "../utils/Ajax";
import {GlobalState} from "../utils/GlobalState";
import {history} from "../utils/history";

export function getOrdersOneUser(callback) {
    let data = {};
    data['token'] = GlobalState.get('token');
    if (!data['token']) {
        history.push('/login');
    }

    const handler = (data) => {
        if (data.verify === '0') {
            history.push('/login');
        }
        else {
            callback(data);
        }
    };

    postRequest(GlobalState.get('url') + '/getOrdersOneUser', data, handler);
}

export function getOrdersAllUsers(callback) {
    let data = {};
    data['token'] = GlobalState.get('token');
    if (!data['token']) {
        history.push('/login');
    }

    const handler = (data) => {
        if (data.verify === '0') {
            history.push('/login');
        }
        else {
            callback(data);
        }
    };

    postRequest(GlobalState.get('url') + '/getOrdersAllUsers', data, handler);
}

export function getOrderCollectionsAllUsers(callback) {
    let data = {};
    data['token'] = GlobalState.get('token');
    if (!data['token']) {
        history.push('/login');
    }

    const handler = (data) => {
        if (data.verify === '0') {
            history.push('/login');
        }
        else {
            callback(data);
        }
    };

    postRequest(GlobalState.get('url') + '/getOrderCollectionsAllUsers', data, handler);
}

export function getOrderCollectionsOneUser(callback) {
    let data = {};
    data['token'] = GlobalState.get('token');
    if (!data['token']) {
        history.push('/login');
    }

    const handler = (data) => {
        if (data.verify === '0') {
            history.push('/login');
        }
        else {
            callback(data);
        }
    };

    postRequest(GlobalState.get('url') + '/getOrderCollectionsOneUser', data, handler);
}

export function getOrderItemsOneOrder(oid, index, callback) {
    let data = {};
    data['token'] = GlobalState.get('token');
    if (!data['token']) {
        history.push('/login');
    }
    data['oid'] = oid;

    const handler = (data) => {
        if (data.verify === '0') {
            history.push('/login');
        }
        else {
            callback(index, data);
        }
    };

    postRequest(GlobalState.get('url') + '/getOrderItemsOneOrder', data, handler);
}

export function dateCmp(a, b) {
    let arrA = a.split('/'), arrB = b.split('/');
    return arrA[0] * 10000 + arrA[1] * 100 + arrA[2] >= arrB[0] * 10000 + arrB[1] * 100 + arrB[2];
}

export const orderColumns = [{
    title: 'Order ID',
    field: 'oid'
}, {
    title: 'Date',
    field: 'date',
    customSort: (a, b) => dateCmp(a.date, b.date),
    customFilterAndSearch: (text, data) => {
        let filterReg = /^(\d{4})\/(\d{1,2})\/(\d{1,2})-(\d{4})\/(\d{1,2})\/(\d{1,2})$/;
        if (text.match(filterReg)) {
            let split = text.split('-');
            console.log(dateCmp(data.date, split[0]));
            console.log(dateCmp(data.date, split[1]));
            if (dateCmp(data.date, split[0]) && dateCmp(split[1], data.date)) {
                return true;
            }
        }
        return false;
    }
}, {
    title: 'Cost',
    field: 'cost',
    type: 'numeric'
}];

export function orderDataFilter(raw) {
    let data = [];
    raw.forEach((cur) => {
        let date = new Date(cur.date);
        data.push({
            oid: cur.oid,
            cost: cur.cost,
            date: date.getUTCFullYear() + '/' + (date.getUTCMonth() + 1) + '/' + date.getUTCDate()
        })
    });

    return data;
}