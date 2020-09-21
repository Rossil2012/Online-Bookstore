import {postRequest} from "../utils/Ajax";
import {GlobalState} from "../utils/GlobalState";
import {history} from "../utils/history";

export function login(username, password, callback) {
    let data = {};
    data['username'] = username;
    data['password'] = password;

    postRequest(GlobalState.get('url') + '/login', data, callback);
}

export function register(username, password, email, callback) {
    let data = {};
    data['username'] = username;
    data['password'] = password;
    data['email'] = email;

    postRequest(GlobalState.get('url') + '/register', data, callback);
}

export function getUsersAll(callback) {
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

    postRequest(GlobalState.get('url') + '/getUsersAll', data, callback);
}

export function prohibitUser(uid, callback) {
    let data = {};
    data['token'] = GlobalState.get('token');
    if (!data['token']) {
        history.push('/login');
    }
    data['uid'] = uid;

    const handler = (data) => {
        if (data.verify === '0') {
            history.push('/login');
        }
        else {
            callback(data.opt === '1');
        }
    };

    postRequest(GlobalState.get('url') + '/prohibitUser', data, handler);
}

export function permitUser(uid, callback) {
    let data = {};
    data['token'] = GlobalState.get('token');
    if (!data['token']) {
        history.push('/login');
    }
    data['uid'] = uid;

    const handler = (data) => {
        if (data.verify === '0') {
            history.push('/login');
        }
        else {
            callback(data.opt === '1');
        }
    };

    postRequest(GlobalState.get('url') + '/permitUser', data, handler);
}