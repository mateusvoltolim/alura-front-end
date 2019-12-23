class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listNegociacoes = new Bind(new ListNegociacoes(), new NegociacaoView($('#negociacoesView')), 'adiciona', 'esvazia');
        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagem-view')), 'texto');
    }

    adicionar(event) {
        event.preventDefault();
        this._listNegociacoes.adiciona(this._criarNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._limparFormulario();
    }

    clearListNegociacoes() {
        this._listNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
    }

    importarNegociacoes() {
        let negociacaoService = new NegociacaoService();
        negociacaoService.obterNegociacoesDaSemana().then(
            negociacoes => { 
                negociacoes.forEach(negociacao => this._listNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações da semana importadas com sucesso'
            }

        ).catch(error => this._mensagem.texto = error);

        // negociacaoService.obterNegociacoesDaSemana((error, negociacoes) => {
        //     if (error) {
        //         this._mensagem.texto = error;
        //         return;
        //     }

        //     negociacoes.forEach(negociacao => this._listNegociacoes.adiciona(negociacao));
        //     this._mensagem.texto = 'Negociações importadas com sucesso';
        // });

        // negociacaoService.obterNegociacoesDaSemanaAnterior((error, negociacoes) => {
        //     if (error) {
        //         this._mensagem.texto = error;
        //         return;
        //     }

        //     negociacoes.forEach(negociacao => this._listNegociacoes.adiciona(negociacao));
        //     this._mensagem.texto = 'Negociações importadas com sucesso';
        // });

        // negociacaoService.obterNegociacoesDaSemanaRetrasada((error, negociacoes) => {
        //     if (error) {
        //         this._mensagem.texto = error;
        //         return;
        //     }

        //     negociacoes.forEach(negociacao => this._listNegociacoes.adiciona(negociacao));
        //     this._mensagem.texto = 'Negociações importadas com sucesso';
        // });
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
