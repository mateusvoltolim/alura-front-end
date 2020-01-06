var stores = ['negociacoes'];
var version = 3;
var dbName = 'aluraframe';

class ConnectionFactory {

    constructor() {
        throw new Error("Não é possível criar instâncias de ConnectionFactory");
    }

    static getConnection() {
        return new Promise((resolve, reject) => {
            let openRequest = window.indexedDB.open(dbName, version);
            openRequest.onupgradeneeded = event => {
                ConnectionFactory._createStores(event.target.result);
            };

            openRequest.onsuccess = event => {
                resolve(event.target.result);
            };

            openRequest.onerror = event => {
                console.log(event.target.error)
                reject(event.target.error.name);
            };
        });
    }

    static _createStores(connection) {
        stores.forEach(store => {
            if (connection.objectStoreNames.contains(store)) {
                connection.deleteObjectStore(store);
            }

            connection.createObjectStore(store, { autoIncrement: true });
        });
    }

}