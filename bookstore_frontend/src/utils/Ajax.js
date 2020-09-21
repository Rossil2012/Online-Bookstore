export function getRequest(url, params, callback) {
    if (params) {
        let paramsArray = [];
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }

    fetch(url, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        }).then((json) => {
            callback(json);
        }
    ).catch((error) => {
        alert(error)
    })
}

export function postRequest(url, json, callback) {
    let opts = {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };

    fetch(url, opts)
        .then((response) => {
            console.log(response);
            return response.json();
        }).then((json) => {
        callback(json);
    }).catch((error) => {
        console.log(error);
    });
}