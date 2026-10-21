// perguntas do quiz
const perguntas = [
  {
    texto: "No trabalho em grupo, você é quem...",
    alternativas: [
      { texto: "Deixa os slides bonitos", perfil: "frontend" },
      { texto: "Faz a parte que ninguém vê", perfil: "backend" },
      { texto: "Organiza tudo numa planilha", perfil: "dados" }
    ]
  },
  {
    texto: "Num jogo, o que você mais gosta?",
    alternativas: [
      { texto: "Dos gráficos", perfil: "frontend" },
      { texto: "De como as coisas funcionam", perfil: "backend" },
      { texto: "Das estatísticas", perfil: "dados" }
    ]
  },
  {
    texto: "No fim de semana você prefere...",
    alternativas: [
      { texto: "Desenhar ou editar foto", perfil: "frontend" },
      { texto: "Montar ou consertar coisas", perfil: "backend" },
      { texto: "Ver curiosidades na internet", perfil: "dados" }
    ]
  },
  {
    texto: "Qual matéria da escola você curte mais?",
    alternativas: [
      { texto: "Artes", perfil: "frontend" },
      { texto: "Física", perfil: "backend" },
      { texto: "Matemática", perfil: "dados" }
    ]
  },
  {
    texto: "Quando você baixa um app novo, você...",
    alternativas: [
      { texto: "Repara se ele é bonito e fácil de usar", perfil: "frontend" },
      { texto: "Fica pensando em como ele foi feito", perfil: "backend" },
      { texto: "Olha as notas e quantas pessoas baixaram", perfil: "dados" }
    ]
  }
];

// pontos de cada perfil
let pontos = {
  frontend: 0,
  backend: 0,
  dados: 0
};

// nome, emoji e cor de cada perfil (usado no +1 e no placar)
const infoPerfis = {
  frontend: { nome: "Front-end", emoji: "🎨", cor: "#8bc34a" },
  backend: { nome: "Back-end", emoji: "⚙️", cor: "#2e7d32" },
  dados: { nome: "Dados", emoji: "📊", cor: "#00897b" }
};

let perguntaAtual = 0;

// funcao que mostra a pergunta na tela
function mostrarPergunta() {
  let p = perguntas[perguntaAtual];

  // atualiza o progresso
  document.getElementById("progresso-texto").innerHTML =
    "Pergunta " + (perguntaAtual + 1) + " de " + perguntas.length;
  document.getElementById("barra-preenchida").style.width =
    (perguntaAtual / perguntas.length) * 100 + "%";

  document.getElementById("pergunta").innerHTML = p.texto;
  document.getElementById("botoes").innerHTML = "";

  for (let i = 0; i < p.alternativas.length; i++) {
    let botao = document.createElement("button");
    botao.innerHTML = p.alternativas[i].texto;
    botao.onclick = function() {
      responder(p.alternativas[i].perfil, botao);
    };
    document.getElementById("botoes").appendChild(botao);
  }

  animarCaixa();
}

// quando clica em uma resposta
function responder(perfil, botao) {
  pontos[perfil] = pontos[perfil] + 1;
  perguntaAtual = perguntaAtual + 1;

  // trava os botoes para nao clicar duas vezes
  let todos = document.querySelectorAll("#botoes button");
  for (let i = 0; i < todos.length; i++) {
    todos[i].disabled = true;
  }

  // pinta o botao escolhido e mostra o +1 subindo
  botao.classList.add("escolhido");
  let maisUm = document.createElement("span");
  maisUm.className = "mais-um";
  maisUm.innerHTML = "+1 " + infoPerfis[perfil].emoji;
  botao.appendChild(maisUm);

  // espera um pouquinho antes de ir para a proxima
  setTimeout(function() {
    if (perguntaAtual < perguntas.length) {
      mostrarPergunta();
    } else {
      mostrarResultado();
    }
  }, 700);
}

// monta o placar com uma barra para cada perfil
function montarPlacar() {
  let html = "<div class='placar'><h3>Sua pontuação</h3>";

  for (let perfil in infoPerfis) {
    let info = infoPerfis[perfil];
    html +=
      "<div class='linha-placar'>" +
        "<div class='nome'>" +
          "<span>" + info.emoji + " " + info.nome + "</span>" +
          "<strong><span id='porcento-" + perfil + "'>0</span>%</strong>" +
        "</div>" +
        "<div class='barra-placar'>" +
          "<div id='barra-" + perfil + "' style='background-color: " + info.cor + "'></div>" +
        "</div>" +
      "</div>";
  }

  return html + "</div>";
}

// faz as barras crescerem e os numeros contarem de 0 ate a porcentagem
function animarPlacar() {
  for (let perfil in infoPerfis) {
    let porcentagem = Math.round((pontos[perfil] / perguntas.length) * 100);
    let numero = document.getElementById("porcento-" + perfil);
    let atual = 0;

    document.getElementById("barra-" + perfil).style.width = porcentagem + "%";

    let contador = setInterval(function() {
      if (atual >= porcentagem) {
        clearInterval(contador);
        return;
      }
      atual = atual + 1;
      numero.innerHTML = atual;
    }, 10);
  }
}

// mostra o resultado final
function mostrarResultado() {
  let vencedor = "frontend";

  // ve qual tem mais pontos
  // se der empate fica o que apareceu primeiro
  if (pontos.backend > pontos[vencedor]) {
    vencedor = "backend";
  }
  if (pontos.dados > pontos[vencedor]) {
    vencedor = "dados";
  }

  let emoji = "";
  let titulo = "";
  let texto = "";

  if (vencedor == "frontend") {
    emoji = "🎨";
    titulo = "Você é Front-end!";
    texto = "O front-end faz a parte do site que as pessoas veem, como as telas, botões e menus.";
  }
  if (vencedor == "backend") {
    emoji = "⚙️";
    titulo = "Você é Back-end!";
    texto = "O back-end faz a parte que fica por trás do site, como salvar os dados e fazer o login funcionar.";
  }
  if (vencedor == "dados") {
    emoji = "📊";
    titulo = "Você é de Dados!";
    texto = "Quem trabalha com dados analisa muitas informações para ajudar a empresa a tomar decisões.";
  }

  document.getElementById("progresso-texto").innerHTML = "Resultado";
  document.getElementById("barra-preenchida").style.width = "100%";
  document.getElementById("pergunta").innerHTML =
    "<div class='emoji'>" + emoji + "</div>" + titulo;
  document.getElementById("botoes").innerHTML =
    "<p>" + texto + "</p>" +
    montarPlacar() +
    "<div class='propaganda'>" +
      "<img src='logo-unifacear-300x200.png' alt='Logo UNIFACEAR' " +
        "onerror=\"this.outerHTML='<div class=logo-texto>UNIFACEAR</div>'\">" +
      "<h3>Transforme isso em profissão!</h3>" +
      "<p>Você tem perfil para a área de TI. Venha estudar Tecnologia na " +
      "<strong>UNIFACEAR</strong>, em Araucária, e comece a construir o seu futuro!</p>" +
    "</div>" +
    "<button class='botao-reiniciar' onclick='reiniciar()'>Jogar de novo</button>";

  animarCaixa();

  // espera a tela aparecer para comecar a animacao do placar
  setTimeout(animarPlacar, 300);
}

// zera tudo para a proxima pessoa jogar
function reiniciar() {
  pontos = { frontend: 0, backend: 0, dados: 0 };
  perguntaAtual = 0;
  mostrarPergunta();
}

// faz a caixa aparecer de novo com animacao
function animarCaixa() {
  let caixa = document.getElementById("caixa");
  caixa.style.animation = "none";
  caixa.offsetHeight;
  caixa.style.animation = "";
}

mostrarPergunta();
