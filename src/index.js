// Importando os dados das árvores frutíferas do arquivo produto.js
import { arvoresFrutiferasCard } from './dataset/produtos.js';

// Função que vai receber o objeto "item" e retornar a estrutura do html do card como uma string
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

// Função responsável por inserir o card dentro do container html 
let setCartaoCol = (cartao) => {
    let cartoesDiv = document.getElementById('cartoes');
    cartoesDiv.insertAdjacentHTML('beforeend', cartao);
};

//Função responsável por percorrrer a lista de árvores frutíferas e criar os cards
let createCartoes = () => {
    // Loop que percorre cada item do array que foi importado
    for (let item of arvoresFrutiferasCard) {
        let cartao = getCartao(item);
        setCartaoCol(cartao);
    }
};

// Chamando a função principal para mostrar os cards ao carregar o script
createCartoes();
