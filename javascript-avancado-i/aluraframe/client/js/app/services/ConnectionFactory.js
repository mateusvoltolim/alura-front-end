var ConnectionFactory = (function () {
    const stores = ['negociacoes'];
    const version = 3;
    const dbName = 'aluraframe';
    var connection = null;
    var close = null;

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
                    if (!connection) {
                        connection = event.target.result;
                        close = connection.close.bind(connection);
                        connection.close = function () {
                            throw new Error("Você não pode fechar diretamente a conexão");
                        }
                    }
                    resolve(event.target.result);
                };

                openRequest.onerror = event => {
                    console.log(event.target.error)
                    reject(event.target.error.name);
                };
            });
        }

        static closeConnections() {
            if (connection) {
                close();
                connection = null;
            }
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
})();