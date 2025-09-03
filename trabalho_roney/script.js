// ===== Dados da aplicação =====
    let alunos = []; // Lista de alunos: cada um é { nome: "texto", notas: [n, n, ...] }

    // ===== Funções utilitárias =====
    function buscarAluno(nome) {
      for (let i = 0; i < alunos.length; i++) {
        if (alunos[i].nome.toLowerCase() === nome.toLowerCase()) {
          return alunos[i];
        }
      }
      return null;
    }

    function calcularMedia(aluno) {
      if (aluno.notas.length === 0) return null;
      let soma = 0;
      for (let i = 0; i < aluno.notas.length; i++) {
        soma += aluno.notas[i];
      }
      return soma / aluno.notas.length;
    }

    function adicionarAluno() {
      let nome = prompt("Nome do aluno:");
      if (!nome) return;
      if (buscarAluno(nome)) {
        alert("Aluno já existe!");
      } else {
        alunos.push({ nome: nome, notas: [] });
        alert("Aluno adicionado!");
      }
    }

    function listarAlunos() {
      if (alunos.length === 0) {
        alert("Nenhum aluno cadastrado.");
      } else {
        let lista = "";
        for (let i = 0; i < alunos.length; i++) {
          lista += alunos[i].nome + " — " + alunos[i].notas.length + " notas\n";
        }
        alert(lista);
      }
    }

    function registrarNotas() {
      let nome = prompt("Nome do aluno:");
      let aluno = buscarAluno(nome);
      if (!aluno) {
        alert("Aluno não encontrado.");
        return;
      }

      let notasStr = prompt("Digite notas separadas por vírgula (0 a 10):");
      if (!notasStr) return;
      let partes = notasStr.split(",");
      for (let i = 0; i < partes.length; i++) {
        let valor = parseFloat(partes[i]);
        if (!isNaN(valor) && valor >= 0 && valor <= 10) {
          aluno.notas.push(valor);
        }
      }
      alert("Notas registradas!");
    }

    function calcularMediaAluno() {
      let nome = prompt("Nome do aluno:");
      let aluno = buscarAluno(nome);
      if (!aluno) {
        alert("Aluno não encontrado.");
        return;
      }
      let m = calcularMedia(aluno);
      if (m === null) {
        alert("Aluno sem notas.");
      } else {
        alert("Média de " + aluno.nome + ": " + m.toFixed(2));
      }
    }

    function mostrarAprovados() {
      let lista = "";
      for (let i = 0; i < alunos.length; i++) {
        let m = calcularMedia(alunos[i]);
        if (m !== null && m >= 7) {
          lista += alunos[i].nome + " — Média " + m.toFixed(2) + "\n";
        }
      }
      if (lista === "") lista = "Nenhum aluno aprovado.";
      alert(lista);
    }

    function estatisticasTurma() {
      let soma = 0, qtd = 0, maior = null, menor = null;
      for (let i = 0; i < alunos.length; i++) {
        let m = calcularMedia(alunos[i]);
        if (m !== null) {
          soma += m;
          qtd++;
          if (maior === null || m > maior.media) maior = { nome: alunos[i].nome, media: m };
          if (menor === null || m < menor.media) menor = { nome: alunos[i].nome, media: m };
        }
      }
      if (qtd === 0) {
        alert("Sem dados.");
        return;
      }
      let mediaGeral = soma / qtd;
      alert(
        "Média geral: " + mediaGeral.toFixed(2) + "\n" +
        "Maior média: " + maior.nome + " (" + maior.media.toFixed(2) + ")\n" +
        "Menor média: " + menor.nome + " (" + menor.media.toFixed(2) + ")"
      );
    }

    function ordenarPorMedia() {
      let copia = [];
      for (let i = 0; i < alunos.length; i++) {
        let m = calcularMedia(alunos[i]);
        if (m !== null) {
          copia.push({ nome: alunos[i].nome, media: m });
        }
      }
      for (let i = 0; i < copia.length - 1; i++) {
        for (let j = 0; j < copia.length - i - 1; j++) {
          if (copia[j].media < copia[j + 1].media) {
            let temp = copia[j];
            copia[j] = copia[j + 1];
            copia[j + 1] = temp;
          }
        }
      }
      if (copia.length === 0) {
        alert("Nenhum aluno com notas.");
        return;
      }
      let lista = "";
      for (let i = 0; i < copia.length; i++) {
        lista += copia[i].nome + " — Média " + copia[i].media.toFixed(2) + "\n";
      }
      alert(lista);
    }

    function removerAluno() {
      let nome = prompt("Nome do aluno:");
      let indice = -1;
      for (let i = 0; i < alunos.length; i++) {
        if (alunos[i].nome.toLowerCase() === nome.toLowerCase()) {
          indice = i;
        }
      }
      if (indice >= 0) {
        alunos.splice(indice, 1);
        alert("Aluno removido.");
      } else {
        alert("Aluno não encontrado.");
      }
    }

    function menu() {
      let opcao;
      do {
        opcao = prompt(
          "GERENCIADOR DE TURMA\n" +
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

        if (opcao === null){
            break
        }

        if (opcao === "1") adicionarAluno();
        else if (opcao === "2") listarAlunos();
        else if (opcao === "3") registrarNotas();
        else if (opcao === "4") calcularMediaAluno();
        else if (opcao === "5") mostrarAprovados();
        else if (opcao === "6") estatisticasTurma();
        else if (opcao === "7") ordenarPorMedia();
        else if (opcao === "8") removerAluno();
      } while (opcao !== "0");
      alert("Saindo...");
    }