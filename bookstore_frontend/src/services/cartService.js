import {GlobalState} from "../utils/GlobalState";
import {postRequest} from "../utils/Ajax";
import {history} from "../utils/history";

export function getCart(callback) {
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

    postRequest(GlobalState.get('url') + '/getCartItemsAll', data, handler);
}

export function submit(callback) {
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
            callback(data.opt === '1');
        }
    };

    postRequest(GlobalState.get('url') + '/submitCart', data, handler);
}

export function addCartItem(bid, amount, callback) {
    let data = {};
    data['token'] = GlobalState.get('token');
    if (!data['token']) {
        history.push('/login');
    }
    data['bid'] = bid;
    data['amount'] = amount;
    const handler = (data) => {
        console.log(data);
        if (data.verify === '0') {
            history.push('/login');
        } else {
            callback(data.opt === '1');
        }
    };
    postRequest(GlobalState.get('url') + '/setCartItem', data, handler);
}

export function removeCartItem(bid, callback) {
    let data = {};
    data['token'] = GlobalState.get('token');
    if (!data['token']) {
        history.push('/login');
    }
    data['bid'] = bid;
    const handler = (data) => {
        console.log(data);
        if (data.verify === '0') {
            history.push('/login');
        } else {
            callback(bid, data.opt === '1');
        }
    };
    postRequest(GlobalState.get('url') + '/removeCartItem', data, handler);
}