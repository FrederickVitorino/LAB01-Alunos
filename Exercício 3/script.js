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

document.getElementById('cadastrar').addEventListener('click', function(event){
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const curso = document.getElementById('curso').value;
    const NF = document.getElementById('NF').value;

    const aluno = new Aluno(nome, idade, curso, NF);

    document.getElementById('formulario').reset();
    addAlunoTabela(aluno);
});

function addAlunoTabela(aluno){
    const tabela = document.getElementById('tabela');
    const linha = tabela.insertRow(1);

    const valores = [aluno.nome, aluno.idade, aluno.curso, aluno.NF];
    valores.forEach((valor, index) => {
        const celula = linha.insertCell(index);
        celula.innerHTML = valor;
    });

    createButtons(linha);
    alert(`Aluno(a) ${aluno.nome} adicionado(a) com sucesso!`);
}

function createButtons(linha){
    const botoes = ['Editar', 'Excluir'];

    botoes.forEach((comando, index) => {
        const celula = linha.insertCell(4 + index);
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.innerHTML = comando;
        botao.addEventListener('click', function(){
            if(comando === 'Editar'){
                const colunas = ['nome', 'idade', 'curso', 'NF'];
                colunas.forEach((coluna, index) => {
                    document.getElementById(coluna).value = linha.cells[index].innerHTML;
                });
                linha.remove();
                alert('Edite os dados no formulário e clique em "Cadastrar" para salvar as alterações.');
            } else{
                linha.remove();
                alert('Aluno(a) excluído(a) com sucesso!');
            }
        });
        celula.appendChild(botao);
    });
}