
// ======================================
// AURA CALCULATOR - SITUAÇÕES
// ======================================

const situacoes = [
    {
        nome: "Fazer uma prova sem estudar e tirar 10",
        pontos: 1000
    },
    {
        nome: "Fazer uma jogada impossível",
        pontos: 800
    },
    {
        nome: "Chegar na escola com estilo absurdo",
        pontos: 500
    },
    {
        nome: "Mandar um 67 do nada",
        pontos: 500
    },
    {
        nome: "Fazer todo mundo rir com uma piada",
        pontos: 400
    },
    {
        nome: "Defender um amigo",
        pontos: 700
    },
    {
        nome: "Dar uma resposta perfeita na hora certa",
        pontos: 500
    },
    {
        nome: "Conseguir algo que ninguém acreditava",
        pontos: 1000
    },
    {
        nome: "Chegar atrasado e entrar como se nada tivesse acontecido",
        pontos: 200
    },
    {
        nome: "Ajudar alguém sem esperar nada em troca",
        pontos: 300
    },
    {
        nome: "Tropeçar na frente da pessoa que você gosta",
        pontos: -500
    },
    {
        nome: "Acenar para alguém que não estava acenando para você",
        pontos: -400
    },
    {
        nome: "Chamar a professora de mãe",
        pontos: -800
    },
    {
        nome: "Fazer uma piada e ninguém rir",
        pontos: -300
    },
    {
        nome: "Cair na própria pegadinha",
        pontos: -400
    },
    {
        nome: "Mandar mensagem e receber apenas um 'ata'",
        pontos: -200
    },
    {
        nome: "Falar achando que o microfone estava desligado",
        pontos: -600
    },
    {
        nome: "Escorregar tentando pagar de estiloso",
        pontos: -700
    },
    {
        nome: "Errar o cumprimento com alguém",
        pontos: -300
    },
    {
        nome: "Responder 'você também' quando alguém diz bom apetite",
        pontos: -500
    }
];

// ======================================
// CRIAR LISTA DE SITUAÇÕES
// ======================================

const lista = document.getElementById("situacoes");

situacoes.forEach((situacao, index) => {

    const card = document.createElement("div");

    card.className = "situacao";

    const sinal = situacao.pontos > 0 ? "+" : "";

    const cor = situacao.pontos > 0
        ? "positivo"
        : "negativo";

    card.innerHTML = `
        <div class="situacao-topo">
            <input
                type="checkbox"
                id="check-${index}"
                aria-label="Selecionar ${situacao.nome}"
            >

            <label
                for="check-${index}"
                class="situacao-nome"
            >
                ${situacao.nome}
            </label>
        </div>

        <div class="quantidade">
            <span class="pontos ${cor}">
                ${sinal}${situacao.pontos} aura
            </span>

            <div class="controles">
                <button
                    type="button"
                    class="diminuir"
                    data-index="${index}"
                    aria-label="Diminuir quantidade"
                    disabled
                >−</button>

                <span class="numero" id="numero-${index}">1</span>

                <button
                    type="button"
                    class="aumentar"
                    data-index="${index}"
                    aria-label="Aumentar quantidade"
                    disabled
                >+</button>
            </div>
        </div>
    `;

    lista.appendChild(card);

});

// ======================================
// CONTROLES DE QUANTIDADE
// ======================================

const quantidades = situacoes.map(() => 1);

lista.addEventListener("click", (event) => {

    const botao = event.target.closest("button");

    if (!botao) return;

    const index = Number(botao.dataset.index);

    const checkbox = document.getElementById(`check-${index}`);

    if (!checkbox.checked) return;

    if (botao.classList.contains("aumentar")) {
        quantidades[index]++;
    }

    if (botao.classList.contains("diminuir")) {
        quantidades[index] = Math.max(
            1,
            quantidades[index] - 1
        );
    }

    document.getElementById(`numero-${index}`)
        .textContent = quantidades[index];

});

lista.addEventListener("change", (event) => {

    if (event.target.type !== "checkbox") return;

    const index = Number(event.target.id.split("-")[1]);

    const card = event.target.closest(".situacao");

    const botoes = card.querySelectorAll("button");

    botoes.forEach(botao => {
        botao.disabled = !event.target.checked;
    });

    card.classList.toggle(
        "selecionada",
        event.target.checked
    );

});

// ======================================
// CALCULAR A AURA
// ======================================

const calcularBtn = document.getElementById("calcularBtn");

calcularBtn.addEventListener("click", calcularAura);

function calcularAura() {

    let total = 0;

    situacoes.forEach((situacao, index) => {

        const checkbox = document.getElementById(`check-${index}`);

        if (checkbox.checked) {

            total += situacao.pontos * quantidades[index];

        }

    });

    document.getElementById("totalAura").textContent =
        total.toLocaleString("pt-BR");

    mostrarClassificacao(total);

}

// ======================================
// CLASSIFICAÇÕES
// ======================================

function mostrarClassificacao(total) {

    const classificacao = document.getElementById("classificacao");

    const mensagem = document.getElementById("mensagemResultado");

    if (total <= 500) {

        classificacao.textContent = "🤡 BETA";

        mensagem.textContent =
            "Irmão, precisamos recuperar essa aura KKKKK.";

    } else if (total <= 2000) {

        classificacao.textContent = "🥶 BETINHA";

        mensagem.textContent =
            "Está começando a entender como funciona a aura.";

    } else if (total <= 5000) {

        classificacao.textContent = "😎 SIGMA";

        mensagem.textContent =
            "Respeitável! Você está evoluindo.";

    } else if (total <= 10000) {

        classificacao.textContent = "🗿 SIGMA BOY";

        mensagem.textContent =
            "Poucos conseguem chegar nesse nível.";

    } else {

        classificacao.textContent = "🐺 LOBO ALFA";

        mensagem.textContent =
            "ABSOLUTE AURA! Você é uma lenda.";

    }

}

// ======================================
// LIMPAR CALCULADORA
// ======================================

document.getElementById("limparBtn").addEventListener("click", () => {

    situacoes.forEach((situacao, index) => {

        document.getElementById(`check-${index}`).checked = false;

        document.getElementById(`numero-${index}`).textContent = "1";

        quantidades[index] = 1;

        const card = document.getElementById(`check-${index}`)
            .closest(".situacao");

        card.classList.remove("selecionada");

        card.querySelectorAll("button").forEach(botao => {
            botao.disabled = true;
        });

    });

    document.getElementById("totalAura").textContent = "0";

    document.getElementById("classificacao").textContent = "🤡 BETA";

    document.getElementById("mensagemResultado").textContent =
        "Sua jornada de aura está começando!";

});

// ======================================
// AURA DO DIA - RESULTADOS ALEATÓRIOS
// ======================================

const resultadosAura = [

    {
        pontos: -1000,
        emoji: "💀",
        mensagem: "Hoje não foi seu dia... força, guerreiro!"
    },

    {
        pontos: -500,
        emoji: "🤡",
        mensagem: "A aura foi de arrasta pra cima."
    },

    {
        pontos: -200,
        emoji: "😭",
        mensagem: "Um dia meio complicado para sua aura."
    },

    {
        pontos: 100,
        emoji: "🥱",
        mensagem: "Um dia normal. Nada de especial."
    },

    {
        pontos: 300,
        emoji: "😎",
        mensagem: "Hoje você está com uma aura interessante."
    },

    {
        pontos: 500,
        emoji: "🗿",
        mensagem: "O Sigma está acordado!"
    },

    {
        pontos: 800,
        emoji: "🥶",
        mensagem: "Hoje você está simplesmente gelado!"
    },

    {
        pontos: 1000,
        emoji: "🔥",
        mensagem: "UM DIA ABSURDO! A aura está nas alturas!"
    },

    {
        pontos: 1500,
        emoji: "🐺",
        mensagem: "O LOBO ALFA FOI ENCONTRADO!"
    },

    {
        pontos: 2000,
        emoji: "👑",
        mensagem: "VOCÊ É O ESCOLHIDO! AURA MÁXIMA!"
    }

];

// ======================================
// GIRAR A AURA DO DIA
// ======================================

const girarBtn = document.getElementById("girarBtn");

girarBtn.addEventListener("click", girarAura);

function girarAura() {

    const caixa = document.querySelector(".roleta-box");

    const emoji = document.getElementById("roletaEmoji");

    const resultado = document.getElementById("roletaResultado");

    const mensagem = document.getElementById("roletaMensagem");

    girarBtn.disabled = true;

    girarBtn.textContent = "SORTEANDO...";

    caixa.classList.add("girando");

    resultado.textContent = "??? AURA";

    mensagem.textContent = "O destino está decidindo...";

    // Sortear um resultado
    const sorteado = resultadosAura[
        Math.floor(Math.random() * resultadosAura.length)
    ];

    // Mostrar resultado depois da animação
    setTimeout(() => {

        caixa.classList.remove("girando");

        emoji.textContent = sorteado.emoji;

        const sinal = sorteado.pontos > 0 ? "+" : "";

        resultado.textContent =
            `${sinal}${sorteado.pontos.toLocaleString("pt-BR")} AURA`;

        resultado.style.color =
            sorteado.pontos >= 0 ? "#65e6a0" : "#ff747e";

        mensagem.textContent = sorteado.mensagem;

        girarBtn.disabled = false;

        girarBtn.textContent = "GIRAR NOVAMENTE";

    }, 1800);

}


