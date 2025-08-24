// Função para calcular a idade da árvore
function calcularIdadeArvore(dataPlantio) {
    let dataInicio = new Date(dataPlantio); // Data informada pelo usuário
    let hoje = new Date(); // Data atual

    // Diferença em anos
    let idade = hoje.getFullYear() - dataInicio.getFullYear();

    // Ajuste caso o aniversário da árvore ainda não tenha ocorrido neste ano
    let mesAtual = hoje.getMonth();
    let diaAtual = hoje.getDate();
    let mesPlantio = dataInicio.getMonth();
    let diaPlantio = dataInicio.getDate();

    if (mesAtual < mesPlantio || (mesAtual === mesPlantio && diaAtual < diaPlantio)) {
        idade--;
    }

    return idade;
}

// Função para criar e adicionar um card de frutífera
const addFrutiferaCard = (item) => {
    const container = document.getElementById('arvoresContainer');

    // Calcula a idade da árvore com base na data de plantio
    const idade = calcularIdadeArvore(item.dataPlantio);

    // Estrutura HTML do card
    const cardHTML = `
<div class="col-md-4">
    <div class="card h-100 shadow-sm">
        <img src="${item.imagemURL}">
        <div class="card-body">
            <p><strong>Nome popular:</strong> ${item.nomePopular}</p>
            <p><strong>Nome científico:</strong> ${item.nomeCientifico}</p>
            <p><strong>Produção média:</strong> ${item.producaoMedia} Kg</p>
            <p><strong>Plantio:</strong> ${item.dataPlantio}</p>
            <p><strong>Idade da árvore:</strong> ${idade} ano(s)</p>
        </div>
    </div>
</div>
`;

    // Insere o card no container
    container.insertAdjacentHTML('beforeend', cardHTML);
};

// Carregar frutíferas do localStorage ao abrir a página
const carregarCards = () => {
    const frutiferas = JSON.parse(localStorage.getItem('frutiferas')) ?? [];
    const container = document.getElementById('arvoresContainer');
    container.innerHTML = ''; // Limpa os cards antes de carregar

    // Adiciona um card para cada frutífera salva
    frutiferas.forEach((item, index) => addFrutiferaCard(item, index));
};

// Limpar formulário após cadastro
const limparForm = () => {
    document.getElementById('imagemURL').value = '';
    document.getElementById('nomePopular').value = '';
    document.getElementById('nomeCientifico').value = '';
    document.getElementById('producaoMedia').value = '';
    document.getElementById('dataPlantio').value = '';
};

// Salvar nova frutífera no localStorage
document.getElementById('frutiferaForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Evita o reload da página
    // Recupera lista existente ou cria uma nova
    const frutiferas = JSON.parse(localStorage.getItem('frutiferas')) ?? [];

    // Cria objeto com os dados do formulário
    const item = {
        imagemURL: document.getElementById('imagemURL').value,
        nomePopular: document.getElementById('nomePopular').value,
        nomeCientifico: document.getElementById('nomeCientifico').value,
        producaoMedia: document.getElementById('producaoMedia').value,
        dataPlantio: document.getElementById('dataPlantio').value,
    };

    // Salva no array e no localStorage
    frutiferas.push(item);
    localStorage.setItem('frutiferas', JSON.stringify(frutiferas));

    // Atualiza a interface com o novo card
    addFrutiferaCard(item, frutiferas.length - 1);
    limparForm();

    // API do próprio bootstrap para feechar o modal após salvar (mais indicadapara a ultima versão do bootstrap que o jquery)
    const modalEl = document.getElementById('frutiferaModal');
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.hide();

    // Toastify para mostrar a notificação
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
