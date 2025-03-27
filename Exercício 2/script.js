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

function cadastrar(){
    const valores = ['nome', 'idade', 'curso', 'NF'];
    const aluno = {nome: '', idade: '', curso: '', NF: ''};

    valores.forEach((valor, _) => {
        getValor = document.getElementById(valor).value;
        aluno[valor] = getValor;
    });

    addAlunoTabela(aluno);
}

function addAlunoTabela(aluno){
    const tabela = document.getElementById('tabela');
    const linha = tabela.insertRow(1);

    const colunas = ['nome', 'idade', 'curso', 'NF'];
    colunas.forEach((coluna, index) => {
        const celula = linha.insertCell(index);
        celula.innerHTML = aluno[coluna];
    });

    const botoes = [
        { texto: 'Editar', evento: () => editarAluno(linha) },
        { texto: 'Excluir', evento: () => excluirAluno(linha) }
    ];

    botoes.forEach((comando, index) => {
        const celula = linha.insertCell(colunas.length + index);
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

