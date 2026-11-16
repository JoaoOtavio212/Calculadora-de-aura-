
const situacoes = [
  {nome:"Tirar uma nota alta sem nem esperar",pontos:1000,tipo:"positiva",tag:"MODO GÊNIO"},
  {nome:"Fazer uma jogada impossível no jogo",pontos:900,tipo:"positiva",tag:"HIGHLIGHT"},
  {nome:"Fazer todo mundo rir",pontos:650,tipo:"positiva",tag:"ENTRETENIMENTO"},
  {nome:"Defender um amigo quando precisou",pontos:850,tipo:"positiva",tag:"LEALDADE"},
  {nome:"Mandar a resposta perfeita na hora certa",pontos:700,tipo:"positiva",tag:"PRECISÃO"},
  {nome:"Conseguir algo que ninguém acreditava",pontos:1100,tipo:"positiva",tag:"LENDÁRIO"},
  {nome:"Ajudar alguém sem esperar nada em troca",pontos:600,tipo:"positiva",tag:"RESPEITO"},
  {nome:"Chegar com um estilo impecável",pontos:500,tipo:"positiva",tag:"PRESENÇA"},
  {nome:"Mandar um 67 no momento mais aleatório",pontos:550,tipo:"positiva",tag:"67 MOMENT"},
  {nome:"Ter uma sorte absurda",pontos:800,tipo:"positiva",tag:"SORTE"},
  {nome:"Resolver um problema que ninguém conseguia",pontos:900,tipo:"positiva",tag:"INTELIGÊNCIA"},
  {nome:"Receber um elogio inesperado",pontos:450,tipo:"positiva",tag:"CARISMA"},
  {nome:"Fazer uma boa ação discretamente",pontos:700,tipo:"positiva",tag:"BOA AURA"},
  {nome:"Ganhar uma partida muito disputada",pontos:750,tipo:"positiva",tag:"VITÓRIA"},
  {nome:"Manter a calma numa situação difícil",pontos:650,tipo:"positiva",tag:"CONTROLE"},
  {nome:"Ser escolhido para liderar o grupo",pontos:600,tipo:"positiva",tag:"LIDERANÇA"},
  {nome:"Lembrar de algo importante na hora certa",pontos:400,tipo:"positiva",tag:"MEMÓRIA"},
  {nome:"Fazer uma entrada cinematográfica",pontos:500,tipo:"positiva",tag:"CINEMA"},
  {nome:"Acenar para alguém que não estava acenando",pontos:-100,tipo:"negativa",tag:"MICÃO"},
  {nome:"Fazer uma piada e ninguém rir",pontos:-100,tipo:"negativa",tag:"SILÊNCIO"},
  {nome:"Chamar a professora de mãe",pontos:-180,tipo:"negativa",tag:"CLÁSSICO"},
  {nome:"Responder 'você também' para 'bom apetite'",pontos:-120,tipo:"negativa",tag:"AUTOMÁTICO"},
  {nome:"Errar o cumprimento com alguém",pontos:-90,tipo:"negativa",tag:"DESENCONTRO"},
  {nome:"Tropeçar tentando fazer pose",pontos:-150,tipo:"negativa",tag:"QUASE CINEMA"},
  {nome:"Mandar mensagem para o grupo errado",pontos:-180,tipo:"negativa",tag:"OPS"},
  {nome:"Esquecer o que ia falar no meio da frase",pontos:-70,tipo:"negativa",tag:"BUGOU"}
];

const lista = document.getElementById("situacoes");
const quantidades = situacoes.map(() => 1);
let filtroAtual = "todas";

function criarSituacoes() {
  lista.innerHTML = "";

  situacoes.forEach((s, i) => {
    if (
      filtroAtual !== "todas" &&
      s.tipo !== (filtroAtual === "positivas" ? "positiva" : "negativa")
    ) return;

    const card = document.createElement("article");
    card.className = "situation";
    card.dataset.index = i;

    const sinal = s.pontos > 0 ? "+" : "";
    const cor = s.pontos > 0 ? "positive" : "negative";

    card.innerHTML = `
      <div class="situation-top">
        <input type="checkbox" id="check-${i}" aria-label="Selecionar ${s.nome}">
        <label class="situation-name" for="check-${i}">${s.nome}</label>
        <span class="points ${cor}">${sinal}${s.pontos.toLocaleString("pt-BR")}</span>
      </div>
      <div class="situation-bottom">
        <span class="tag">${s.tag}</span>
        <div class="counter">
          <button type="button" class="decrease" data-index="${i}" disabled>−</button>
          <span id="numero-${i}">1</span>
          <button type="button" class="increase" data-index="${i}" disabled>+</button>
        </div>
      </div>
    `;

    lista.appendChild(card);
  });
}

criarSituacoes();

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filtroAtual = btn.dataset.filter;
    criarSituacoes();
  });
});

lista.addEventListener("change", e => {
  if (!e.target.matches('input[type="checkbox"]')) return;

  const index = Number(e.target.id.split("-")[1]);
  const card = e.target.closest(".situation");

  card.classList.toggle("selected", e.target.checked);

  card.querySelectorAll("button").forEach(b => {
    b.disabled = !e.target.checked;
  });

  atualizarContagem();
});

lista.addEventListener("click", e => {
  const btn = e.target.closest("button[data-index]");
  if (!btn) return;

  const i = Number(btn.dataset.index);
  const checkbox = document.getElementById(`check-${i}`);

  if (!checkbox || !checkbox.checked) return;

  if (btn.classList.contains("increase")) {
    quantidades[i] = Math.min(99, quantidades[i] + 1);
  }

  if (btn.classList.contains("decrease")) {
    quantidades[i] = Math.max(1, quantidades[i] - 1);
  }

  document.getElementById(`numero-${i}`).textContent = quantidades[i];
});

function atualizarContagem() {
  const total = situacoes.reduce((n, s, i) => {
    return n + (document.getElementById(`check-${i}`)?.checked ? 1 : 0);
  }, 0);

  document.getElementById("selectedCount").textContent = total;
}

function obterRank(total) {
  if (total <= 500) {
    return {
      nome: "🤡 BETA",
      mensagem: "Toda lenda começa em algum lugar. Bora construir essa aura!"
    };
  }

  if (total <= 2000) {
    return {
      nome: "🥶 BETINHA",
      mensagem: "A aura está crescendo. Já dá pra sentir a evolução!"
    };
  }

  if (total <= 5000) {
    return {
      nome: "😎 SIGMA",
      mensagem: "Respeitável! Sua presença já está sendo notada."
    };
  }

  if (total <= 10000) {
    return {
      nome: "🗿 SIGMA BOY",
      mensagem: "Poucos chegam nesse nível. Simplesmente gelado!"
    };
  }

  return {
    nome: "🐺 LOBO ALFA",
    mensagem: "ABSOLUTE AURA! Você entrou para a lenda."
  };
}

function calcularAura() {
  let total = 0;

  situacoes.forEach((s, i) => {
    if (document.getElementById(`check-${i}`)?.checked) {
      total += s.pontos * quantidades[i];
    }
  });

  document.getElementById("totalAura").textContent =
    total.toLocaleString("pt-BR");

  const rank = obterRank(total);

  document.getElementById("classificacao").textContent = rank.nome;
  document.getElementById("mensagemResultado").textContent = rank.mensagem;

  const proximosRanks = [
    {limite: 501, nome: "BETINHA"},
    {limite: 2001, nome: "SIGMA"},
    {limite: 5001, nome: "SIGMA BOY"},
    {limite: 10001, nome: "LOBO ALFA"}
  ];

  const proximo = proximosRanks.find(r => total < r.limite);

  const progresso = proximo
    ? Math.max(0, Math.min(100, (total / proximo.limite) * 100))
    : 100;

  document.getElementById("progressBar").style.width = `${progresso}%`;
  document.getElementById("progressText").textContent = `${Math.round(progresso)}%`;

  document.getElementById("nextRank").textContent = proximo
    ? `Faltam ${(proximo.limite - total).toLocaleString("pt-BR")} pontos para ${proximo.nome}`
    : "Você alcançou o rank máximo!";
}

document.getElementById("calcularBtn").addEventListener("click", calcularAura);

document.getElementById("limparBtn").addEventListener("click", () => {
  situacoes.forEach((s, i) => {
    const check = document.getElementById(`check-${i}`);

    if (check) {
      check.checked = false;
      const card = check.closest(".situation");
      card.classList.remove("selected");

      card.querySelectorAll("button").forEach(b => {
        b.disabled = true;
      });
    }

    quantidades[i] = 1;

    const numero = document.getElementById(`numero-${i}`);
    if (numero) numero.textContent = "1";
  });

  document.getElementById("totalAura").textContent = "0";
  document.getElementById("classificacao").textContent = "🤡 BETA";
  document.getElementById("mensagemResultado").textContent =
    "Toda lenda começa em algum lugar. Bora construir essa aura!";

  document.getElementById("progressBar").style.width = "0%";
  document.getElementById("progressText").textContent = "0%";
  document.getElementById("nextRank").textContent = "Próximo nível: BETINHA";

  atualizarContagem();
});

const resultadosAura = [
  {pontos:100,emoji:"🙂",mensagem:"Um bônus tranquilo pra começar o dia."},
  {pontos:250,emoji:"✨",mensagem:"A sorte resolveu dar uma força!"},
  {pontos:400,emoji:"😎",mensagem:"Aura positiva detectada."},
  {pontos:500,emoji:"🗿",mensagem:"O modo Sigma foi ativado."},
  {pontos:650,emoji:"🥶",mensagem:"Hoje você está gelado demais!"},
  {pontos:800,emoji:"🔥",mensagem:"Uma energia lendária está no ar."},
  {pontos:1000,emoji:"⚡",mensagem:"DIA ABSURDO! Bônus de respeito."},
  {pontos:1200,emoji:"🐺",mensagem:"O lobo alfa está entre nós!"},
  {pontos:1500,emoji:"👑",mensagem:"VOCÊ É O ESCOLHIDO!"},
  {pontos:2000,emoji:"💎",mensagem:"RECOMPENSA MÍTICA! AURA NAS ALTURAS!"},
  {pontos:-50,emoji:"🥲",mensagem:"Um pequeno tropeço. Quase nem conta."},
  {pontos:-100,emoji:"🤡",mensagem:"O universo mandou um micro mico."}
];

document.getElementById("girarBtn").addEventListener("click", () => {
  const box = document.getElementById("roletaBox");
  const btn = document.getElementById("girarBtn");
  const emoji = document.getElementById("roletaEmoji");
  const resultado = document.getElementById("roletaResultado");
  const mensagem = document.getElementById("roletaMensagem");

  btn.disabled = true;
  btn.textContent = "SORTEANDO...";
  box.classList.add("spinning");

  resultado.textContent = "??? AURA";
  mensagem.textContent = "O destino está escolhendo...";

  const sorteado = resultadosAura[
    Math.floor(Math.random() * resultadosAura.length)
  ];

  setTimeout(() => {
    box.classList.remove("spinning");
    emoji.textContent = sorteado.emoji;

    const sinal = sorteado.pontos > 0 ? "+" : "";

    resultado.textContent =
      `${sinal}${sorteado.pontos.toLocaleString("pt-BR")} AURA`;

    resultado.style.color =
      sorteado.pontos >= 0 ? "var(--green)" : "var(--red)";

    mensagem.textContent = sorteado.mensagem;

    btn.disabled = false;
    btn.textContent = "Sortear novamente ✦";
  }, 1500);
});
