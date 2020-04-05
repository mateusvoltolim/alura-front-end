export class HttpService {

    _handleErrors(response) {
        if (response.ok) {
            return response;
        }

        throw new Error(response.statusText);
    }

    get(url) {
        return fetch(url)
            .then(response => this._handleErrors(response))
            .then(response => response.json());
    }

    post(url, data) {
        return fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(data)
        
        }).then(response => this._handleErrors(response));
    }
}