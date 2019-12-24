class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {
        return this._http.get('negociacoes/semana')
            .then(negociacoes => { return negociacoes.map(object => new Negociacao(new Date(object.data), object.quantidade, object.valor)); })
            .catch(() => { throw new Error('Não foi possível obter as negociações da semana.'); });
    }

    obterNegociacoesDaSemanaAnterior() {
        return this._http.get('negociacoes/anterior')
            .then(negociacoes => { return negociacoes.map(object => new Negociacao(new Date(object.data), object.quantidade, object.valor)); })
            .catch(() => { throw new Error('Não foi possível obter as negociações da semana anterior.'); });
    }

    obterNegociacoesDaSemanaRetrasada() {
        return this._http.get('negociacoes/retrasada')
            .then(negociacoes => { return negociacoes.map(object => new Negociacao(new Date(object.data), object.quantidade, object.valor)); })
            .catch(() => { throw new Error('Não foi possível obter as negociações da semana retrasada.'); });
    }

    obterNegociacoes() {
        return Promise.all(
            [
                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada()
            ])
            .then(negociacoes => negociacoes.reduce((arrayJoined, array) => arrayJoined.concat(array), []))
            .catch(error => { throw new Error(error); });
    }

}
