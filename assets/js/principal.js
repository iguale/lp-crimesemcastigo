/*
 * Comportamentos comuns: menu no celular, vídeo convite sob clique,
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

  /* ---------- Vídeo: o iframe só carrega depois do clique na capa ---------- */
  function iniciarVideo() {
    var caixa = document.querySelector("[data-video]");
    if (!caixa) return;
    var capa = caixa.querySelector("[data-video-capa]");
    var pendente = caixa.querySelector("[data-video-pendente]");
    var id = (config.youtubeId || "").trim();

    if (!id) {
      capa.setAttribute("aria-disabled", "true");
      capa.setAttribute("aria-describedby", "video-pendente");
      if (pendente) pendente.id = "video-pendente";
      return;
    }
    if (pendente) pendente.hidden = true;

    capa.addEventListener("click", function () {
      var iframe = document.createElement("iframe");
      iframe.className = "video__iframe";
      iframe.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) +
        "?autoplay=1&rel=0&cc_load_policy=1&cc_lang_pref=pt&hl=pt-BR";
      iframe.title = "Vídeo convite da Sessão Acessível de Crime Sem Castigo, com Libras e legendas";
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

  /* ---------- Abre o <details> quando a âncora aponta para dentro dele ---------- */
  function abrirDetalhesDaAncora() {
    if (!location.hash) return;
    var alvo;
    try { alvo = document.querySelector(location.hash); } catch (e) { return; }
    var detalhe = alvo && alvo.closest("details");
    if (detalhe) detalhe.open = true;
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
    iniciarVideo();
    iniciarInscricoes();
    iniciarIcom();
    abrirDetalhesDaAncora();
    window.addEventListener("hashchange", abrirDetalhesDaAncora);
    iniciarGtm();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
