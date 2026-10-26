/*
 * Barra de acessibilidade da Iguale Digital (equivalente ao kit id_a11y de Gramado)
 * - tamanho do texto: aumentar, diminuir e voltar ao original
 * - modos de contraste (estilos em id_a11y/id_a11y.css)
 * - atalhos [1] conteúdo e [2] menu (accesskey + Alt+1 / Alt+2)
 * - menu flutuante "Acessibilidade", que também tem espaçamento do texto,
 *   fonte legível, guia de leitura, destaque de links e "restaurar tudo"
 * A escolha fica guardada no localStorage. Este arquivo é carregado no <head>
 * para aplicar a preferência antes de a página aparecer.
 */
(function () {
  "use strict";

  var html = document.documentElement;
  var CHAVE_FONTE = "id_a11y_fonte";
  var CHAVE_CONTRASTE = "id_a11y_contraste";
  var CHAVE_OPCOES = "id_a11y_opcoes";
  var TAMANHOS = [87.5, 100, 112.5, 125, 150, 175, 200];
  var PADRAO = 1;
  var CONTRASTES = [
    { id: "alto-contraste", nome: "Alto contraste" },
    { id: "preto-amarelo", nome: "Preto e amarelo" },
    { id: "monocromatico", nome: "Monocromático" },
    { id: "cinza-invertido", nome: "Escala de cinza invertida" },
    { id: "cores-invertidas", nome: "Cores invertidas" },
    { id: "original", nome: "Cores originais" }
  ];

  // Liga/desliga do painel. "grupo" diz em que bloco do painel o botão aparece.
  var OPCOES = [
    { id: "espacamento", nome: "Espaçar o texto", grupo: "leitura", ligado: "Espaçamento do texto ativado.", desligado: "Espaçamento do texto desativado." },
    { id: "fonte-legivel", nome: "Fonte mais legível", grupo: "leitura", ligado: "Fonte mais legível ativada.", desligado: "Fonte original de volta." },
    { id: "guia", nome: "Guia de leitura", grupo: "leitura", soMouse: true, ligado: "Guia de leitura ativado. Ele acompanha o mouse e o foco do teclado.", desligado: "Guia de leitura desativado." },
    { id: "links", nome: "Destacar links e botões", grupo: "cores", ligado: "Links e botões destacados.", desligado: "Destaque de links desativado." }
  ];

  function ler(chave) {
    try { return window.localStorage.getItem(chave); } catch (e) { return null; }
  }
  function gravar(chave, valor) {
    try { window.localStorage.setItem(chave, valor); } catch (e) { /* sem armazenamento: só vale nesta visita */ }
  }

  var indiceFonte = parseInt(ler(CHAVE_FONTE), 10);
  if (isNaN(indiceFonte) || indiceFonte < 0 || indiceFonte >= TAMANHOS.length) indiceFonte = PADRAO;
  var contraste = ler(CHAVE_CONTRASTE) || "original";
  if (!CONTRASTES.some(function (c) { return c.id === contraste; })) contraste = "original";
  var opcoes = {};
  try { opcoes = JSON.parse(ler(CHAVE_OPCOES) || "{}") || {}; } catch (e) { opcoes = {}; }

  function aplicarFonte() {
    html.style.fontSize = indiceFonte === PADRAO ? "" : TAMANHOS[indiceFonte] + "%";
  }
  function aplicarContraste() {
    CONTRASTES.forEach(function (c) { html.classList.remove("a11y-" + c.id); });
    if (contraste !== "original") html.classList.add("a11y-" + contraste);
  }
  function carregarFonteLegivel() {
    if (document.getElementById("a11y-fonte-legivel")) return;
    var link = document.createElement("link");
    link.id = "a11y-fonte-legivel";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap";
    document.head.appendChild(link);
  }
  function aplicarOpcoes() {
    OPCOES.forEach(function (o) { html.classList.toggle("a11y-" + o.id, !!opcoes[o.id]); });
    if (opcoes["fonte-legivel"]) carregarFonteLegivel();
  }
  aplicarFonte();
  aplicarContraste();
  aplicarOpcoes();
  html.classList.add("js");

  /* ---------- Depois que o HTML carrega ---------- */
  function anunciar(texto) {
    var regiao = document.querySelector("[data-a11y-anuncio]");
    if (!regiao) return;
    regiao.textContent = "";
    window.setTimeout(function () { regiao.textContent = texto; }, 60);
  }

  function mudarFonte(acao) {
    if (acao === "mais") indiceFonte = Math.min(indiceFonte + 1, TAMANHOS.length - 1);
    else if (acao === "menos") indiceFonte = Math.max(indiceFonte - 1, 0);
    else indiceFonte = PADRAO;
    aplicarFonte();
    gravar(CHAVE_FONTE, String(indiceFonte));
    anunciar("Tamanho do texto: " + String(TAMANHOS[indiceFonte]).replace(".", ",") + "%.");
  }

  function mudarContraste(id) {
    contraste = id;
    aplicarContraste();
    gravar(CHAVE_CONTRASTE, id);
    document.querySelectorAll("[data-a11y-contraste]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-a11y-contraste") === id ? "true" : "false");
    });
    var nome = CONTRASTES.filter(function (c) { return c.id === id; })[0].nome;
    anunciar(nome + " ativado.");
  }

  function mudarOpcao(id) {
    var o = OPCOES.filter(function (x) { return x.id === id; })[0];
    opcoes[id] = !opcoes[id];
    aplicarOpcoes();
    gravar(CHAVE_OPCOES, JSON.stringify(opcoes));
    document.querySelectorAll('[data-a11y-opcao="' + id + '"]').forEach(function (b) {
      b.setAttribute("aria-pressed", opcoes[id] ? "true" : "false");
    });
    if (id === "guia") atualizarGuia();
    anunciar(opcoes[id] ? o.ligado : o.desligado);
  }

  function restaurarTudo() {
    indiceFonte = PADRAO;
    contraste = "original";
    opcoes = {};
    aplicarFonte();
    aplicarContraste();
    aplicarOpcoes();
    gravar(CHAVE_FONTE, String(PADRAO));
    gravar(CHAVE_CONTRASTE, "original");
    gravar(CHAVE_OPCOES, "{}");
    document.querySelectorAll("[data-a11y-contraste]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-a11y-contraste") === "original" ? "true" : "false");
    });
    document.querySelectorAll("[data-a11y-opcao]").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
    atualizarGuia();
    anunciar("Tudo de volta ao padrão: texto, cores, espaçamento, fonte e destaques.");
  }

  /* Guia de leitura: faixa clara que acompanha o mouse (e o foco do teclado) e escurece o resto da tela */
  var guia = null;
  var temMouse = window.matchMedia ? window.matchMedia("(hover: hover) and (pointer: fine)") : { matches: true };
  function moverGuia(y) {
    if (guia) guia.style.transform = "translateY(" + Math.round(y - guia.offsetHeight / 2) + "px)";
  }
  function aoMoverMouse(ev) { moverGuia(ev.clientY); }
  function aoFocar(ev) {
    var r = ev.target.getBoundingClientRect && ev.target.getBoundingClientRect();
    if (r && r.height) moverGuia(r.top + r.height / 2);
  }
  function atualizarGuia() {
    var ligar = !!opcoes.guia && temMouse.matches;
    if (ligar && !guia) {
      guia = criar("div", { "class": "a11y-guia-faixa", "aria-hidden": "true" });
      document.body.appendChild(guia);
      moverGuia(window.innerHeight / 2);
      document.addEventListener("mousemove", aoMoverMouse, { passive: true });
      document.addEventListener("focusin", aoFocar);
    } else if (!ligar && guia) {
      guia.remove();
      guia = null;
      document.removeEventListener("mousemove", aoMoverMouse);
      document.removeEventListener("focusin", aoFocar);
    }
  }

  function criar(tag, atributos, texto) {
    var el = document.createElement(tag);
    Object.keys(atributos || {}).forEach(function (k) { el.setAttribute(k, atributos[k]); });
    if (texto) el.textContent = texto;
    return el;
  }

  function botaoFonte(acao, curto, longo, mostrarCurto) {
    var b = criar("button", { type: "button", "data-a11y-fonte": acao });
    if (mostrarCurto) {
      b.appendChild(criar("span", { "aria-hidden": "true" }, curto));
      b.appendChild(criar("span", { "class": "visualmente-oculto" }, longo));
    } else {
      b.textContent = longo;
    }
    return b;
  }

  function botoesContraste(lista) {
    CONTRASTES.forEach(function (c) {
      var b = criar("button", { type: "button", "data-a11y-contraste": c.id, "aria-pressed": c.id === contraste ? "true" : "false" }, c.nome);
      var item = criar("li");
      item.appendChild(b);
      lista.appendChild(item);
    });
  }

  function botoesOpcoes(lista, grupo) {
    OPCOES.forEach(function (o) {
      if (o.grupo !== grupo) return;
      if (o.soMouse && !temMouse.matches) return;
      var b = criar("button", { type: "button", "data-a11y-opcao": o.id, "aria-pressed": opcoes[o.id] ? "true" : "false" }, o.nome);
      var item = criar("li");
      item.appendChild(b);
      lista.appendChild(item);
    });
  }

  var contador = 0;
  function montarControles(alvo) {
    var tipo = alvo.getAttribute("data-a11y-controles");
    contador += 1;
    var wrap = criar("div", { "class": "a11y-controles a11y-controles--" + tipo });

    var grupoFonte = criar("div", { "class": "a11y-controles__grupo", role: "group" });
    var grupoContraste = criar("div", { "class": "a11y-controles__grupo" });

    if (tipo === "barra") {
      grupoFonte.setAttribute("aria-label", "Tamanho do texto");
      grupoFonte.appendChild(botaoFonte("mais", "A+", "Aumentar o texto", true));
      grupoFonte.appendChild(botaoFonte("normal", "A", "Voltar o texto ao tamanho original", true));
      grupoFonte.appendChild(botaoFonte("menos", "A−", "Diminuir o texto", true));

      var idLista = "a11y-contrastes-" + contador;
      var abre = criar("button", { type: "button", "class": "a11y-controles__abre", "aria-expanded": "false", "aria-controls": idLista }, "Contraste");
      var lista = criar("ul", { id: idLista, "class": "a11y-controles__lista", hidden: "" });
      botoesContraste(lista);
      grupoContraste.classList.add("a11y-controles__suspenso");
      grupoContraste.appendChild(abre);
      grupoContraste.appendChild(lista);
      ligarAbreFecha(abre, lista, grupoContraste);
    } else {
      // Leitura: tamanho do texto + espaçamento, fonte legível e guia de leitura
      var idLeitura = "a11y-rotulo-leitura-" + contador;
      var idFonte = "a11y-rotulo-fonte-" + contador;
      grupoFonte.setAttribute("aria-labelledby", idLeitura);
      grupoFonte.appendChild(criar("h3", { id: idLeitura, "class": "a11y-controles__titulo" }, "Leitura"));
      var linhaFonte = criar("div", { "class": "a11y-controles__linha", role: "group", "aria-labelledby": idFonte });
      linhaFonte.appendChild(criar("p", { id: idFonte, "class": "a11y-controles__rotulo" }, "Tamanho do texto"));
      linhaFonte.appendChild(botaoFonte("mais", "", "Aumentar"));
      linhaFonte.appendChild(botaoFonte("normal", "", "Original"));
      linhaFonte.appendChild(botaoFonte("menos", "", "Diminuir"));
      grupoFonte.appendChild(linhaFonte);
      var listaLeitura = criar("ul", { "class": "a11y-controles__lista a11y-controles__lista--aberta" });
      botoesOpcoes(listaLeitura, "leitura");
      grupoFonte.appendChild(listaLeitura);

      // Cores: contrastes + destacar links
      var idCores = "a11y-rotulo-cores-" + contador;
      grupoContraste.setAttribute("role", "group");
      grupoContraste.setAttribute("aria-labelledby", idCores);
      grupoContraste.appendChild(criar("h3", { id: idCores, "class": "a11y-controles__titulo" }, "Cores"));
      var listaPainel = criar("ul", { "class": "a11y-controles__lista a11y-controles__lista--aberta" });
      botoesContraste(listaPainel);
      grupoContraste.appendChild(listaPainel);
      var listaCores = criar("ul", { "class": "a11y-controles__lista a11y-controles__lista--aberta a11y-controles__lista--extra" });
      botoesOpcoes(listaCores, "cores");
      grupoContraste.appendChild(listaCores);
    }
    wrap.appendChild(grupoFonte);
    wrap.appendChild(grupoContraste);
    alvo.appendChild(wrap);
  }

  /* Abre e fecha um painel (sem prender o foco); Esc e clique fora fecham. */
  var abertos = [];
  function ligarAbreFecha(botao, painel, container) {
    var registro = { botao: botao, painel: painel, container: container };
    abertos.push(registro);
    botao.addEventListener("click", function () {
      var abrir = botao.getAttribute("aria-expanded") !== "true";
      fecharTodos(registro);
      definir(registro, abrir);
    });
  }
  function definir(r, abrir) {
    r.botao.setAttribute("aria-expanded", abrir ? "true" : "false");
    r.painel.hidden = !abrir;
  }
  function fecharTodos(exceto) {
    abertos.forEach(function (r) { if (r !== exceto) definir(r, false); });
  }

  function iniciar() {
    document.querySelectorAll("[data-a11y-controles]").forEach(montarControles);
    atualizarGuia();

    document.addEventListener("click", function (ev) {
      var f = ev.target.closest("[data-a11y-fonte]");
      if (f) { mudarFonte(f.getAttribute("data-a11y-fonte")); return; }
      var c = ev.target.closest("[data-a11y-contraste]");
      if (c) { mudarContraste(c.getAttribute("data-a11y-contraste")); return; }
      var o = ev.target.closest("[data-a11y-opcao]");
      if (o) { mudarOpcao(o.getAttribute("data-a11y-opcao")); return; }
      if (ev.target.closest("[data-a11y-restaurar]")) { restaurarTudo(); return; }
      var v = ev.target.closest("[data-a11y-vlibras]");
      if (v) {
        var botaoVlibras = document.querySelector("[vw-access-button]");
        if (botaoVlibras && botaoVlibras.offsetParent !== null) botaoVlibras.click();
        else anunciar("O VLibras não carregou. Tente recarregar a página.");
        return;
      }
      abertos.forEach(function (r) {
        if (r.botao.getAttribute("aria-expanded") === "true" && !r.container.contains(ev.target)) definir(r, false);
      });
    });

    var flutuante = document.querySelector("[data-flutuante]");
    if (flutuante) {
      ligarAbreFecha(
        flutuante.querySelector(".flutuante__botao"),
        flutuante.querySelector(".flutuante__painel"),
        flutuante
      );
    }

    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape") {
        abertos.forEach(function (r) {
          if (r.botao.getAttribute("aria-expanded") === "true") {
            var focoDentro = r.container.contains(document.activeElement);
            definir(r, false);
            if (focoDentro) r.botao.focus();
          }
        });
        return;
      }
      // Atalhos [1] conteúdo e [2] menu: Alt+1 e Alt+2 (complementa o accesskey)
      if (ev.altKey && !ev.ctrlKey && !ev.metaKey && (ev.key === "1" || ev.key === "2" || ev.code === "Digit1" || ev.code === "Digit2")) {
        var alvo = document.getElementById(ev.code === "Digit2" || ev.key === "2" ? "menu" : "conteudo");
        if (alvo) {
          ev.preventDefault();
          if (!alvo.hasAttribute("tabindex")) alvo.setAttribute("tabindex", "-1");
          alvo.focus();
          alvo.scrollIntoView();
        }
      }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
