import { currentInstance } from './controllers/NegociacaoController';

document.querySelector('.form').onsubmit = currentInstance().adicionar.bind(currentInstance);
document.querySelector('[type=button]').onclick = currentInstance().clearListNegociacoes.bind(currentInstance);