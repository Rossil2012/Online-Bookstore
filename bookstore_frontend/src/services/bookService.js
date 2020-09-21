import {GlobalState} from "../utils/GlobalState";
import {history} from "../utils/history";
import {postRequest} from "../utils/Ajax";

export function getBookData(url) {
    return new Promise(function (resolve, reject) {
        const handler = function () {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(this.statusText);
            }
        };
        const client = new XMLHttpRequest();
        client.open("GET", url, true);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();
    });
}

export function like(bid, isLike) {
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
        }
    };

    if (isLike) {
        postRequest(GlobalState.get('url') + '/likeBook', data, handler);
    } else {
        postRequest(GlobalState.get('url') + '/dislikeBook', data, handler);
    }
}

export function isLiked(bid, callback) {
    let data = {};
    data['token'] = GlobalState.get('token');
    if (!data['token']) {
        return;
    }
    data['bid'] = bid;
    const handler = (data) => {
        callback(data.opt === '1');
    };

    postRequest(GlobalState.get('url') + '/getLikedBookOne', data, handler);
}

export function deleteBook(bid, callback) {
    let data = {};
    data['token'] = GlobalState.get('token');
    if (!data['token']) {
        history.push('/login');
    }
    data['bid'] = bid;
    const handler = (data) => {
        if (data.verify === '0') {
            history.push('/login');
        } else {
            callback(bid, data.opt === '1');
        }
    };

    postRequest(GlobalState.get('url') + '/deleteBook', data, handler);
}

export function updateBook(json, callback) {
    json['token'] = GlobalState.get('token');
    if (!json['token']) {
        history.push('/login');
    }
    const handler = (data) => {
        if (data.verify === '0') {
            history.push('/login');
        } else {
            callback(data.opt === '1');
        }
    };

    postRequest(GlobalState.get('url') + '/updateBook', json, handler);
}

