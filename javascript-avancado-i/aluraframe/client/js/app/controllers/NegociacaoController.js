class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listNegociacoes = new Bind(new ListNegociacoes(), new NegociacaoView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordenar', 'inverterOrdem');
        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagem-view')), 'texto');

        this._ordemAtual = '';

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listarTodos())
            .then(negociacoes => negociacoes.forEach(negociacao =>
                this._listNegociacoes.adiciona(negociacao)))
            .catch(error => this._mensagem.texto = error);
    }

    adicionar(event) {
        event.preventDefault();
        ConnectionFactory
            .getConnection()
            .then(connection => {
                let negociacao = this._criarNegociacao();
                new NegociacaoDao(connection)
                    .adiciona(negociacao)
                    .then(() => {
                        this._listNegociacoes.adiciona(negociacao);
                        this._mensagem.texto = 'Negociação adicionada com sucesso';
                        this._limparFormulario();
                    });
            })
            .catch(error => this._mensagem.texto = error);
    }

    clearListNegociacoes() {
        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagarTodos())
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listNegociacoes.esvazia();
            })
            .catch(error => this._mensagem.texto = error);
    }

    importarNegociacoes() {
        new NegociacaoService().obterNegociacoes()
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
