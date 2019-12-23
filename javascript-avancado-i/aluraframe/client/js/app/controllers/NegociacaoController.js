class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        let self = this;
        this._listNegociacoes = new Proxy(new ListNegociacoes(), {
            get(target, prop, receiver) {
                if (['adiciona', 'esvazia'].includes(prop) && typeof (target[prop]) == typeof (Function)) {
                    return function () {
                        Reflect.apply(target[prop], target, arguments);
                        self._negociacoesView.update(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            }
        });

        this._negociacoesView = new NegociacaoView($('#negociacoesView'));
        this._negociacoesView.update(this._listNegociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagem-view'));
        this._mensagemView.update(this._mensagem);
    }

    adicionar(event) {
        event.preventDefault();
        this._listNegociacoes.adiciona(this._criarNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._mensagemView.update(this._mensagem);

        this._limparFormulario();
    }

    clearListNegociacoes() {
        this._listNegociacoes.esvazia();

        this._mensagem.texto = 'Negociações apagadas com sucesso';
        this._mensagemView.update(this._mensagem);
    }

    _criarNegociacao() {
        return new Negociacao(
            DateHelper.textToDate(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limparFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = '0.00';
        this._inputData.focus();
    }

}
