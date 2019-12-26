class ListNegociacoes {

    constructor() {
        this._negociacoes = [];
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }

    esvazia() {
        this._negociacoes = [];
    }

    ordenar(criterio) {
        this._negociacoes.sort(criterio);
    }

    inverterOrdem() {
        this._negociacoes.reverse();
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }

    get volumeTotal() {
        return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
    }
}