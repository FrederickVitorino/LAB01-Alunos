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

function getListaAlunos() {
    const tabela = document.getElementById('tabela');
    let listaAlunos = [];

    for (let i = 1; i < tabela.rows.length; i++) {
        const aluno = new Aluno(
            tabela.rows[i].cells[0].innerHTML,
            parseInt(tabela.rows[i].cells[1].innerHTML),
            tabela.rows[i].cells[2].innerHTML,
            parseFloat(tabela.rows[i].cells[3].innerHTML)
        );
        listaAlunos.push(aluno);
    }
    return listaAlunos;
}

function atualizarRelatorios(){
    const listaAlunos = getListaAlunos();
    const qtdAlunos = listaAlunos.length;

    calcularMediaNF(listaAlunos, qtdAlunos);
    calcularMediaIdade(listaAlunos, qtdAlunos);
    calcularAlunosCurso(listaAlunos);
}

function calcularMediaNF(listaAlunos, qtdAlunos){
    let somaNF = 0;
    listaAlunos.forEach(aluno => {
        somaNF += parseFloat(aluno.NF);
    });
    const mediaNF = (somaNF / qtdAlunos).toFixed(2);
    document.getElementById('mediaNF').innerHTML = mediaNF;
}

function calcularMediaIdade(listaAlunos, qtdAlunos){
    let somaIdade = 0;
    listaAlunos.forEach(aluno => {
        somaIdade += parseInt(aluno.idade);
    });
    const mediaIdade = (somaIdade / qtdAlunos).toFixed(2);
    document.getElementById('mediaIdade').innerHTML = mediaIdade;
}

function calcularAlunosCurso(listaAlunos) {
    const cursos = ['Java', 'Python', 'JavaScript'];
    
    const qtdAlunosCurso = listaAlunos.reduce((acc, aluno) => {
        const index = cursos.indexOf(aluno.curso);
        if (index !== -1) {
            acc[index]++;
        }
        return acc;
    }, Array(cursos.length).fill(0));

    cursos.forEach((curso, index) => {
        document.getElementById(`qt${curso}`).innerHTML = qtdAlunosCurso[index];
    });
}

function validarCampos() {
    const nome = document.getElementById('nome').value;
    const idade = parseInt(document.getElementById('idade').value);
    const curso = document.getElementById('curso').value;
    const NF = parseFloat(document.getElementById('NF').value);

    if (nome === '' || isNaN(idade) || curso === '' || isNaN(NF)) {
        alert('Preencha todos os campos!');
        return false;
    } else if (idade < 0 || idade > 100) {
        alert('Idade inválida!');
        return false;
    } else if (NF < 0 || NF > 10) {
        alert('Nota Final inválida!');
        return false;
    }

    return true;
}

document.getElementById('cadastrar').addEventListener('click', function(event){
    event.preventDefault();
    if(!validarCampos()){
        return;
    }

    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const curso = document.getElementById('curso').value;
    const NF = document.getElementById('NF').value;

    const aluno = new Aluno(nome, idade, curso, NF);

    document.getElementById('formulario').reset();
    alert(`Aluno(a) ${aluno.nome} adicionado(a) com sucesso!`);
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
    aluno = null;
    atualizarRelatorios();
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

function atualizarTabela(alunos) {
    const tabela = document.getElementById("tabela");

    while (tabela.rows.length > 1){
        tabela.deleteRow(1);
    }
    alunos.forEach(aluno => addAlunoTabela(aluno));
}

let listaOriginalAlunos = [];

function filtrarAprovados(){
    listaOriginalAlunos = getListaAlunos();
    const alunosAprovados = listaOriginalAlunos.filter(aluno => aluno.NF >= 7);
    atualizarTabela(alunosAprovados);
    document.getElementById('filtrar').disabled = true;
    document.getElementById('limpar').disabled = false;
}

function restaurarTabela(){
    atualizarTabela(listaOriginalAlunos);
    document.getElementById('filtrar').disabled = false;
    document.getElementById('limpar').disabled = true;
}

function ordenarAlunos(){
    let listaAlunos = getListaAlunos();
    listaAlunos.sort((a, b) => b.nome.localeCompare(a.nome));
    atualizarTabela(listaAlunos);
}
