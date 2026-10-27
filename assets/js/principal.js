/*
 * Comportamentos comuns: menu no celular, vídeos convite e sinopse sob clique,
 * inscrições abertas/encerradas, link do iCom, <details> por âncora e Google Tag Manager.
 * Usado nas três páginas; cada parte só age se o elemento existir.
 */
(function () {
  "use strict";

  var config = window.CSC_CONFIG || {};

  /* ---------- Menu no celular ---------- */
  function iniciarMenu() {
    var botao = document.querySelector(".menu__botao");
    var lista = document.getElementById("menu-lista");
    if (!botao || !lista) return;
    var celular = window.matchMedia("(max-width: 55.99em)");

    function definir(aberto) {
      botao.setAttribute("aria-expanded", aberto ? "true" : "false");
      lista.classList.toggle("menu__lista--aberta", aberto);
    }
    function atualizar() {
      botao.hidden = !celular.matches;
      definir(false);
    }
    botao.addEventListener("click", function () {
      definir(botao.getAttribute("aria-expanded") !== "true");
    });
    lista.addEventListener("click", function (ev) {
      if (ev.target.closest("a") && celular.matches) definir(false);
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && botao.getAttribute("aria-expanded") === "true") {
        definir(false);
        botao.focus();
      }
    });
    if (celular.addEventListener) celular.addEventListener("change", atualizar);
    else celular.addListener(atualizar);
    atualizar();
  }

  /* ---------- Vídeos (convite e sinopse): cada um abre numa janela; o iframe só carrega depois do clique na capa ---------- */
  function iniciarVideos() {
    document.querySelectorAll("dialog[data-video-config]").forEach(iniciarJanelaDeVideo);
  }

  function iniciarJanelaDeVideo(janela) {
    var caixa = janela.querySelector("[data-video]");
    var capa = caixa.querySelector("[data-video-capa]");
    var pendente = caixa.querySelector("[data-video-pendente]");
    var titulo = janela.querySelector(".janela__titulo");
    var id = (config[janela.getAttribute("data-video-config")] || "").trim();
    var origem = null;

    function abrir(ev) {
      origem = ev.currentTarget;
      if (typeof janela.showModal === "function") janela.showModal();
      else janela.setAttribute("open", "");
      titulo.focus();
    }
    function fechar() {
      if (typeof janela.close === "function") janela.close();
      else { janela.removeAttribute("open"); aoFechar(); }
    }
    function aoFechar() {
      // para o vídeo: troca o iframe de volta pela capa
      var iframe = caixa.querySelector("iframe");
      if (iframe) iframe.replaceWith(capa);
      if (origem) origem.focus();
    }

    document.querySelectorAll('[data-video-abrir="' + janela.id + '"]').forEach(function (b) { b.addEventListener("click", abrir); });
    janela.querySelector("[data-video-fechar]").addEventListener("click", fechar);
    janela.addEventListener("close", aoFechar);
    // clique no fundo escurecido, fora da caixa, também fecha
    janela.addEventListener("click", function (ev) { if (ev.target === janela) fechar(); });

    if (!id) {
      var idPendente = janela.id + "-pendente";
      capa.setAttribute("aria-disabled", "true");
      capa.setAttribute("aria-describedby", idPendente);
      if (pendente) pendente.id = idPendente;
      return;
    }
    if (pendente) pendente.hidden = true;

    capa.addEventListener("click", function () {
      var iframe = document.createElement("iframe");
      iframe.className = "video__iframe";
      iframe.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) +
        "?autoplay=1&rel=0&cc_load_policy=1&cc_lang_pref=pt&hl=pt-BR";
      iframe.title = janela.getAttribute("data-video-titulo");
      iframe.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture; fullscreen");
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      capa.replaceWith(iframe);
      iframe.focus();
    });
  }

  /* ---------- Inscrições abertas ou encerradas ---------- */
  function iniciarInscricoes() {
    var abertas = config.inscricoesAbertas !== false;
    document.querySelectorAll("[data-inscricao-aberta]").forEach(function (el) { el.hidden = !abertas; });
    document.querySelectorAll("[data-inscricao-encerrada]").forEach(function (el) { el.hidden = abertas; });
  }

  /* ---------- Link do iCom ---------- */
  function iniciarIcom() {
    var url = (config.icomUrl || "").trim();
    document.querySelectorAll("[data-icom]").forEach(function (link) {
      if (url) link.href = url;
      else link.hidden = true;
    });
    document.querySelectorAll("[data-icom-pendente]").forEach(function (m) { m.hidden = !!url; });
  }

  /* ---------- Links do MovieReading nas lojas: viram link quando a URL está no config ---------- */
  function iniciarLojas() {
    var todas = true;
    document.querySelectorAll("[data-loja]").forEach(function (link) {
      var url = (config[link.getAttribute("data-loja")] || "").trim();
      if (url) link.href = url;
      else todas = false;
    });
    document.querySelectorAll("[data-loja-pendente]").forEach(function (m) { m.hidden = todas; });
  }

  /* ---------- Abre o <details> quando a âncora aponta para dentro dele ---------- */
  function abrirDetalhesDaAncora() {
    if (!location.hash) return;
    var alvo;
    try { alvo = document.querySelector(location.hash); } catch (e) { return; }
    var detalhe = alvo && alvo.closest("details");
    if (detalhe) detalhe.open = true;
  }

  /* ---------- Âncora no endereço (ex.: #audiodescricao-app, usada no e-mail marketing) ----------
     As fontes e as imagens mudam a altura da página depois da primeira rolagem;
     quando tudo carrega, rola de novo até o alvo, se a pessoa ainda não tiver rolado. */
  function corrigirAncoraInicial() {
    if (!location.hash) return;
    var alvo;
    try { alvo = document.querySelector(location.hash); } catch (e) { return; }
    if (!alvo) return;
    var rolouSozinha = false;
    function marcar() { rolouSozinha = true; }
    ["wheel", "touchstart", "keydown"].forEach(function (t) { window.addEventListener(t, marcar, { once: true, passive: true }); });
    function ir() { if (!rolouSozinha) alvo.scrollIntoView({ block: "start", behavior: "instant" }); }
    var fontes = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    fontes.then(function () {
      if (document.readyState === "complete") ir();
      else window.addEventListener("load", ir, { once: true });
    });
  }

  /* ---------- Google Tag Manager (só se o ID estiver preenchido) ---------- */
  function iniciarGtm() {
    var id = (config.gtmId || "").trim();
    if (!/^GTM-[A-Z0-9]+$/.test(id)) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtm.js?id=" + id;
    document.head.appendChild(s);
  }

  function iniciar() {
    iniciarMenu();
    iniciarVideos();
    iniciarInscricoes();
    iniciarIcom();
    iniciarLojas();
    abrirDetalhesDaAncora();
    corrigirAncoraInicial();
    window.addEventListener("hashchange", abrirDetalhesDaAncora);
    iniciarGtm();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
