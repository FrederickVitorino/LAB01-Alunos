class Aluno {
    constructor(nome, idade, curso, NF) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.NF = NF;
    }

    isAprovado(){
        if(this.NF >= 7){return true;}
        return false;
    }

    toString(){
        return `Nome: ${this.nome} Idade: ${this.idade} Curso: ${this.curso} Nota Final: ${this.NF}`;
    }
}

function cadastrar() {
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const curso = document.getElementById('curso').value;
    const NF = document.getElementById('NF').value;

    const aluno = new Aluno(nome, idade, curso, NF);

    addAlunoTabela(aluno);
}

function addAlunoTabela(aluno){
    const tabela = document.getElementById('tabela');
    const linha = tabela.insertRow(1);

    const valores = [aluno.nome, aluno.idade, aluno.curso, aluno.NF];
    valores.forEach((valor, index) => {
        const celula = linha.insertCell(index);
        celula.innerHTML = valor;
    });

    createButtons(linha);
}

function createButtons(linha){
    const botoes = [
        { texto: 'Editar', evento: () => editarAluno(linha) },
        { texto: 'Excluir', evento: () => excluirAluno(linha) }
    ];

    botoes.forEach((comando, index) => {
        const celula = linha.insertCell(4 + index);
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.innerHTML = comando.texto;
        botao.onclick = comando.evento;
        celula.appendChild(botao);
    });
}

function editarAluno(linha){
    return true;
}

function excluirAluno(linha){
    return true;
}

