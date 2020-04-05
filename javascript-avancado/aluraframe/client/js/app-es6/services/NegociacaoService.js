import { HttpService } from './HttpService';
import { ConnectionFactory } from './ConnectionFactory';
import { NegociacaoDao } from '../dao/NegociacaoDao';
import { Negociacao } from '../models/Negociacao';

export class NegociacaoService {

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

    cadastrar(negociacao) {
        return ConnectionFactory
            .getConnection()
            .then(connection =>
                new NegociacaoDao(connection)
            )
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação adicionada com sucesso')
            .catch(error => {
                console.log(error);
                throw new Error('Não foi possível adicionar a negociação');
            });
    }

    listar() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listarTodos())
            .catch(error => {
                console.log(error);
                throw new Error('Não foi possível obter as negociações');
            });
    }

    apagarTodos() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagarTodos())
            .then(() => 'Negociações apagadas com sucesso')
            .catch(error => {
                console.log(error);
                throw new Error('Não foi possível apagar as negociações');
            });
    }

    importar(listaAtual) {
        return this.obterNegociacoes()
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                    !listaAtual.some(neg =>
                        neg.isEquals(negociacao)
                    )
                )
            )
            .catch(error => {
                console.log(error);
                throw new Error('Não foi possível buscar negociações para importar');
            });
    }

}
