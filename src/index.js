import { arvoresFrutiferasCard } from './dataset/produtos.js';

let getCartao = (item) => {
    return `<div class="col-md-4 p-2">
          <div class="card h-100 shadow-sm">
            <img src="${item.src}" class="card-img-top" alt="${item.nome}">
            <div class="card-body">
              <h5 class="card-title">${item.nome}</h5>
              <p class="card-text"><strong>Nome científico:</strong> ${item.nomeCientifico}</p>
              <p class="card-text"><strong>Produção:</strong> ${item.producao}</p>
              <p class="card-text"><strong>Plantio:</strong> ${item.plantio}</p>
            </div>
          </div>
        </div>`;
};

let setCartaoCol = (cartao) => {
    let cartoesDiv = document.getElementById('cartoes');
    cartoesDiv.insertAdjacentHTML('beforeend', cartao);
};

let createCartoes = () => {
    for (let item of arvoresFrutiferasCard) {
        let cartao = getCartao(item);
        setCartaoCol(cartao);
    }
};

createCartoes();
