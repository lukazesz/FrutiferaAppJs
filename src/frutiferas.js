// Função para calcular a idade da árvore
const calcularIdadeArvore = (dataPlantio) => {
    let dataInicio = new Date(dataPlantio); // Variável que vai converter a data informada pelo usuário em um objeto date 
    let hoje = new Date(); // Variável que cria um objeto com a data atual

    // Variável que armazena a diferença em anos das duas datas
    let idade = hoje.getFullYear() - dataInicio.getFullYear();

    // Variáveis que irão armazenar o mês e dia atual
    let mesAtual = hoje.getMonth();
    let diaAtual = hoje.getDate();

    // Variáveis que irão armazenar o mês e dia do plantio
    let mesPlantio = dataInicio.getMonth();
    let diaPlantio = dataInicio.getDate();

    // Condicional que ajusta caso o aniversário da árvore ainda não tenha ocorrido neste ano
    if (mesAtual < mesPlantio || (mesAtual === mesPlantio && diaAtual < diaPlantio)) {
        idade--; // Reduz 1 ano se ainda não completou
    }

    return idade; // Return da idade já calculada
}

// Função para criar e adicionar um card de frutífera
const addFrutiferaCard = (item) => {
    const container = document.getElementById('arvoresContainer');

    // Constante que calcula a idade da árvore com base na data de plantio
    const idade = calcularIdadeArvore(item.dataPlantio);

    // Constante que recebe a strutura HTML do card 
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

    // Utilização do método insertAdjacentHTML para inserir o card no final container
    container.insertAdjacentHTML('beforeend', cardHTML);
};

// Função para carregar frutíferas do localStorage ao abrir a página
const carregarCards = () => {
    //Constante representando a lista de frutíferas já salvas no navegador, ou um array vazio se não houver nada
    const frutiferas = JSON.parse(localStorage.getItem('frutiferas')) ?? [];
    const container = document.getElementById('arvoresContainer');
    container.innerHTML = ''; // Limpa o container para evitar duplicações

    // Comando que vai pegar a lista frutiferas, percorrer cada frutífera salva e criar automaticamente um card na tela para ela, chamando a função addFrutiferaCard.
    frutiferas.forEach((item, index) => addFrutiferaCard(item, index));
};

// Função responsável por limpar formulário após cadastro
const limparForm = () => {
    // Reseta os valores dos campos de input usando o .value=''
    document.getElementById('imagemURL').value = '';
    document.getElementById('nomePopular').value = '';
    document.getElementById('nomeCientifico').value = '';
    document.getElementById('producaoMedia').value = '';
    document.getElementById('dataPlantio').value = '';
};

// Capturando o evento de envio do formulário
document.getElementById('frutiferaForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Evita o reload da página
    // Recupera lista que foi salva no localStorage, ou cria uma nova
    const frutiferas = JSON.parse(localStorage.getItem('frutiferas')) ?? [];

    // Constante que cria um objeto com os dados do formulário
    const item = {
        imagemURL: document.getElementById('imagemURL').value,
        nomePopular: document.getElementById('nomePopular').value,
        nomeCientifico: document.getElementById('nomeCientifico').value,
        producaoMedia: document.getElementById('producaoMedia').value,
        dataPlantio: document.getElementById('dataPlantio').value,
    };

    // Métodos para salvar no array e atualizar o localStorage
    frutiferas.push(item);
    localStorage.setItem('frutiferas', JSON.stringify(frutiferas));

    // Atualiza a tela com o novo card automaticamente
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
