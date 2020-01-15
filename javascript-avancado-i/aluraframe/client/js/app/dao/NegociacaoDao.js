class NegociacaoDao {

    constructor(connection) {
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao) {
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = () => {
                resolve();
            }

            request.onerror = event => {
                console.log(event.target.error);
                reject('Não foi possivel adicionar a negociação');
            }
        });
    }

    listarTodos() {
        return new Promise((resolve, reject) => {
            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            let negociacoes = [];
            cursor.onsuccess = event => {
                let pNegociacao = event.target.result;
                if (pNegociacao) {
                    let negociacaoJson = pNegociacao.value;
                    negociacoes.push(new Negociacao(negociacaoJson._data, negociacaoJson._quantidade, negociacaoJson._valor));
                    pNegociacao.continue();
                } else {
                   resolve(negociacoes);
                }
            }

            cursor.onerror = event => {
                console.log(e.target.error.name);
                reject('Não foi possível listar as negociações');
            }
        });
    }

    apagarTodos() {
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

                request.onsuccess = () => {
                    resolve('Negociações removidas com sucesso.');
                }

                request.onerror = event => {
                    console.log(event.target.error)
                    reject('Não foi possível remover as negociações')
                }
        });
    }
}