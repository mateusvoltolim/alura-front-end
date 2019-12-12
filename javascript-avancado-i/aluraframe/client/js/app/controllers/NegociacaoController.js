class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listNegociacoes = new ListNegociacoes();
        this._negociacoesView = new NegociacaoView($('#negociacoesView'));
        this._negociacoesView.update(this._listNegociacoes);
    }

    adicionar(event) {
        event.preventDefault();
        this._listNegociacoes.adiciona(this._criarNegociacao());
        this._negociacoesView.update(this._listNegociacoes);
        this._limparFormulario();
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
        this._inputQuantidade.value = 1 ;
        this._inputValor.value = '0.00';
        this._inputData.focus();
    }

}
