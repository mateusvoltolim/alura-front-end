import { ListNegociacoes } from '../models/ListNegociacoes';
import { Mensagem } from '../models/Mensagem';
import { Negociacao } from '../models/Negociacao';
import { NegociacaoService } from '../services/NegociacaoService'
import { MensagemView } from '../views/MensagemView';
import { NegociacaoView } from '../views/NegociacaoView';
import { Bind } from '../helpers/Bind';
import { DateHelper } from '../helpers/DateHelper';

class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listNegociacoes = new Bind(new ListNegociacoes(), new NegociacaoView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordenar', 'inverterOrdem');
        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagem-view')), 'texto');

        this._ordemAtual = '';
        this._negociacaoService = new NegociacaoService();
        this._init();
    }

    _init() {
        this._negociacaoService.listar()
            .then(negociacoes =>
                negociacoes.forEach(negociacao =>
                    this._listNegociacoes.adiciona(negociacao)
                )
            )
            .catch(error => this._mensagem.texto = error);

        setInterval(() => {
            this.importarNegociacoes();
        }, 3000);
    }

    adicionar(event) {
        event.preventDefault();

        this._negociacaoService.cadastrar(negociacao)
            .then(mensagem => {
                this._listNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limparFormulario();
            })
            .catch(error => this._mensagem.texto = error);
    }

    clearListNegociacoes() {
        this._negociacaoService.apagarTodos()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listNegociacoes.esvazia();
            })
            .catch(error => this._mensagem.texto = error);
    }

    importarNegociacoes() {
        this._negociacaoService.importar(this._listNegociacoes.negociacoes)
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociações do período importadas com sucesso'

            }))
            .catch(error => this._mensagem.texto = error);
    }

    ordenar(column) {
        if (this._ordemAtual == column) {
            this._listNegociacoes.inverterOrdem();
        } else {
            this._listNegociacoes.ordenar((a, b) => a[column] - b[column]);
        }
        this._ordemAtual = column;
    }

    _criarNegociacao() {
        return new Negociacao(
            DateHelper.textToDate(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    _limparFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = '0.00';
        this._inputData.focus();
    }

}

let negociacaoController = new NegociacaoController();

export function currentInstance() {
    return negociacaoController;
}