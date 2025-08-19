//import Toastify from "toastify-js";
//import "toastify-js/src/toastify.css";

// Função para criar e adicionar um card
const addFrutiferaCard = (item) => {
    const container = document.getElementById('arvoresContainer');

    const cardHTML = `
<div class="col-md-4">
    <div class="card h-100 shadow-sm">
        <img src="${item.imagemURL}">
        <div class="card-body">
            <p><strong>Nome popular:</strong>>${item.nomePopular}</p>
            <p><strong>Nome científico:</strong> ${item.nomeCientifico}</p>
            <p><strong>Produção média:</strong> ${item.producaoMedia} Kg</p>
            <p><strong>Plantio:</strong> ${item.dataPlantio}</p>
        </div>
    </div>
</div>
`;

    container.insertAdjacentHTML('beforeend', cardHTML);
};

// Carregar frutíferas do localStorage ao abrir a página
const carregarCards = () => {
    const frutiferas = JSON.parse(localStorage.getItem('frutiferas')) ?? [];
    const container = document.getElementById('arvoresContainer');
    container.innerHTML = ''; // limpa os cards antes de carregar

    frutiferas.forEach((item, index) => addFrutiferaCard(item, index));
};

// Limpar formulário
const limparForm = () => {
    document.getElementById('imagemURL').value = '';
    document.getElementById('nomePopular').value = '';
    document.getElementById('nomeCientifico').value = '';
    document.getElementById('producaoMedia').value = '';
    document.getElementById('dataPlantio').value = '';
};

// Salvar nova frutífera
document.getElementById('frutiferaForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const frutiferas = JSON.parse(localStorage.getItem('frutiferas')) ?? [];

    const item = {
        imagemURL: document.getElementById('imagemURL').value,
        nomePopular: document.getElementById('nomePopular').value,
        nomeCientifico: document.getElementById('nomeCientifico').value,
        producaoMedia: document.getElementById('producaoMedia').value,
        dataPlantio: document.getElementById('dataPlantio').value,
    };

    frutiferas.push(item);
    localStorage.setItem('frutiferas', JSON.stringify(frutiferas));

    addFrutiferaCard(item, frutiferas.length - 1);
    limparForm();

    const modalEl = document.getElementById('frutiferaModal');
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.hide();

    Toastify({
        text: 'Frutífera adicionada com sucesso!',
        duration: 3000,
        gravity: 'top',
        position: 'right',
        backgroundColor: '#198754'
    }).showToast();
});

// Inicializa os cards ao carregar a página
window.addEventListener('load', carregarCards);
