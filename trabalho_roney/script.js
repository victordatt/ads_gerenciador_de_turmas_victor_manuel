let alunos = []; // cria uma lista de alunos vazia

function adicionarAluno() { // funçao pra adicionar aluno
  let nome = prompt("Nome do aluno:"); // entrada pra colocar nome do aluno
  if (nome === null) { alert("Operação cancelada"); return; } // se clicar em cancelar a função para
  if (nome === "") { alert("Tem que escrever algo"); return; } // impede nome vazio

  nome = nome.trim(); // remove os espaços

  let existe = false; // nao existe aluno
  for (let i = 0; i < alunos.length; i++) { 
    if (alunos[i].nome.toLowerCase() === nome.toLowerCase()) { // se tiver aluno com o mesmo nome adicionado
      existe = true; // ja existe
    }
  }

  if (existe) { // se ja existe
    alert("Já tem aluno com esse nome"); // avisa que ja existe aluno com esse nome
  } else { // se nao existe
    alunos.push({ nome: nome, notas: [] }); // adiciona novo aluno
    alert("Show papae: aluno adicionado"); // avisa que foi adicionado
  }
}

function buscarAluno(nome) { // função pra procurar aluno pelo nome
  for (let i = 0; i < alunos.length; i++) {
    if (alunos[i].nome.toLowerCase() === String(nome).toLowerCase()) { // se o aluno buscado existir
      return alunos[i]; // retorna o aluno
    }
  } 
  return null; // se nao, null
}

function calcularMedia(aluno) { // função pra calcular media
  if (aluno.notas.length === 0) return null; // se não tem notas, nao tem como fazer algo entao null
  let soma = 0; // variavel pra guarda a soma das notas
  for (let i = 0; i < aluno.notas.length; i++) {
    soma += aluno.notas[i]; // soma as notas
  }
  return soma / aluno.notas.length; // retorna a media
}

function listarAlunos() { // funçao pra listar os alunos
  if (alunos.length === 0) { // se a quantidade de alunos for 0
    alert("Sem aluno"); // avisa que nao tem alunos
  } else { // se tiver aluno
    let lista = ""; // cria variavel para listar os alunos
    for (let i = 0; i < alunos.length; i++) {
      lista += alunos[i].nome + " — " + alunos[i].notas.length + " notas\n"; // adiciona nome e quantidade de notas
    } 
    alert(lista); // lista os alunos
  }
}

function registrarNotas() { // funçao para registrar notas de um aluno
  let nome = prompt("Nome do aluno:"); // entrada para o nome do aluno
  if (nome === null) { alert("Operação cancelada"); return; } // se clicar em cancelar a função para
  let aluno = buscarAluno(nome); // procura o aluno com a funçao criada anteriormente
  if (!aluno) { alert("Esse aluno não existe"); return; } // se nao achou, sai e avisa

  let notasString = prompt("Digite notas separadas por vírgula (0 a 10):"); // entrada das notas
  if (notasString === null) { alert("Operação cancelada."); return; } // se clicar em cancelar a função para
  let virgulas = notasString.split(","); // separa em virgula
  let adicionou = 0; // variavel para colocar a quantidade de notas adicionadas
  for (let i = 0; i < virgulas.length; i++) {
    let notasSeparadas = virgulas[i].trim(); // tira os espaços
    if (notasSeparadas !== "") { // ignora os vazios
      let valor = parseFloat(notasSeparadas); // de String para Float
      if (!isNaN(valor) && valor >= 0 && valor <= 10) { // ve se é número entre 0 e 10
        aluno.notas.push(valor); // adiciona a nota
        adicionou++; // conta mais uma nota
      }
    }
  }
  if (adicionou > 0) { alert(adicionou + " Notas adicionadas "); } // se algo foi adicionado, avisa
  else { alert("Nenhuma nota adicionada"); } // se nao, avisa tambem
}

function mostrarMedia() { // funçao para mostrar a media de algum aluno
  let nome = prompt("Nome do aluno:"); // entrada pra colocar nome do aluno
  if (nome === null) { alert("Operação cancelada"); return; } // se clicar em cancelar a função para
  let aluno = buscarAluno(nome); // procura o aluno com a funçao criada anteriormente
  if (!aluno) { alert("Esse aluno não existe"); return; } // se nao tiver, sai

  let media = calcularMedia(aluno); // calcula a media com a funçao criada anteriormente
  if (media === null) { alert("Aluno sem notas"); } // se nao tem notas, avisa
  else { alert("Média de " + aluno.nome + ": " + m.toFixed(2)); } // se tiver notas mostra a media
}

function mostrarAprovados() { // funçao pra mostrar aprovados (nota acima de 7)
  let lista = ""; // variavel para exibir
  for (let i = 0; i < alunos.length; i++) {
    let media = calcularMedia(alunos[i]); // calcula a media com a funçao criada anteriormente
    if (media !== null && m >= 7) { // se tem nota e ta na media
      lista += alunos[i].nome + " — Média " + media.toFixed(2) + "\n"; // adiciona na variavel e prepara o aviso
    }
  } 
  if (lista === "") { lista = "Nenhum aluno aprovado"; } // se nao tem nota, avisa que ninguem foi aprovado
  alert(lista); // avisador
}

function estatisticasTurma() { // funçao para mostrar média geral, maior média e menor média
  let soma = 0; // variavel pra somar as medias
  let quantidade = 0; // variavel para guardar quantos alunos tem media
  let maior = null; // variavel para guardar nome e media maior
  let menor = null; // variavel para guardar nome e media menor

  for (let i = 0; i < alunos.length; i++) {
    let media = calcularMedia(alunos[i]); // calcula a media com a funçao criada anteriormente
    if (media !== null) { // se a media for diferente de nula
      soma += media; // adiciona a media na soma
      quantidade++; // conta mais um valido
      if (maior === null || media > maior.media) { maior = { nome: alunos[i].nome, media: media }; } // atualiza maior
      if (menor === null || media < menor.media) { menor = { nome: alunos[i].nome, media: media }; } // atualiza menor
    }
  }

  if (quantidade === 0) { alert("Sem dados"); return; } // se ninguém tinha média, sai e avisa

  let mediaGeral = soma / quantidade; // calcula a média geral
  alert( // mostra tudo bonitinho
    "Média geral: " + mediaGeral.toFixed(2) + "\n" +
    "Maior média: " + maior.nome + " (" + maior.media.toFixed(2) + ")\n" +
    "Menor média: " + menor.nome + " (" + menor.media.toFixed(2) + ")"
  );
}

function ordenarPorMedia() { // funçao para ordenar alunos por media (do maior para o menor)
  let lista2 = []; // lista auxiliar criada para armazenar alunos com medias

  for (let i = 0; i < alunos.length; i++) {
    let media = calcularMedia(alunos[i]); // calcula a media do aluno com a funçao criada anteriormente
    if (media !== null) { // se tiver notas (for a media for diferente de nula)
      lista2.push({ nome: alunos[i].nome, media: media }); // adiciona na lista auxiliar
    }
  }

  for (let i = 0; i < lista2.length - 1; i++) { 
    for (let j = 0; j < lista2.length - i - 1; j++) { 
      if (lista2[j].media < lista2[j + 1].media) { // se o próximo tem média maior
        let numTemp = lista2[j]; // guarda o atual
        lista2[j] = lista2[j + 1]; // troca as posições
        lista2[j + 1] = numTemp; // finaliza a troca
      }
    }
  }

  if (lista2.length === 0) { alert("Nenhum aluno tem notas"); return; } // se não tem medias, sai e avisa

  let lista = ""; // lista principal que vai exibir a ordem de medias
  for (let i = 0; i < lista2.length; i++) {
    lista += lista2[i].nome + " — Média " + lista2[i].media.toFixed(2) + "\n"; // texto pra mostrar a ordem
  }
  alert(lista); // mostra a ordem
} //

function removerAluno() { // funçao para remover aluno pelo nome
  let nome = prompt("Nome do aluno:"); // entrada para colocar nome do aluno
  if (nome === null) { alert("Operação cancelada"); return; } // se clicar em cancelar a função para
  let indice = -1; // -1 indica “ainda não achei o aluno”
  for (let i = 0; i < alunos.length; i++) {
    if (alunos[i].nome.toLowerCase() === nome.toLowerCase()) { // se o nome for igual ao que foi digitado
      indice = i; // guarda a posição encontrada
    }
  }
  if (indice >= 0) { // se achou (indice mudou de -1 pra 0 é pq encontrou)
    alunos.splice(indice, 1); // remove 1 item na posição "indice" (se o aluno estiver em tal posição ele é removido)
    alert("Aluno removido"); // avisa que foi removido
  } else { // se não achou (indice continuou -1)
    alert("Aluno não existe"); // avisa que nao existe
  }
}

function menu() { // funçao do menu principal
  let opcao; // guarda a opçao que o usuario escolheu
  do { // repete ate querer sair
    opcao = prompt( // entrada para escolha
      "=== GERENCIADOR DE TURMA ===\n" +
      "1. Adicionar aluno\n" +
      "2. Listar alunos\n" +
      "3. Registrar notas\n" +
      "4. Calcular média\n" +
      "5. Mostrar aprovados\n" +
      "6. Estatísticas da turma\n" +
      "7. Ordenar por média\n" +
      "8. Remover aluno\n" +
      "0. Sair"
    );

    if (opcao === null) {
      break;
    }

    if (opcao === "1") { adicionarAluno(); } 
    else if (opcao === "2") { listarAlunos(); }
    else if (opcao === "3") { registrarNotas(); }
    else if (opcao === "4") { calcularMediaAluno(); }
    else if (opcao === "5") { mostrarAprovados(); }
    else if (opcao === "6") { estatisticasTurma(); } 
    else if (opcao === "7") { ordenarPorMedia(); } 
    else if (opcao === "8") { removerAluno(); }
    else if (opcao !== "0") { alert("Essa opção não existe"); } 
  } while (opcao !== "0");

  if (opcao === "0") { alert("Saindo..."); }
}
