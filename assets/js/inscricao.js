/*
 * Formulário de inscrição: máscara e validação, regras dos checkboxes,
 * envio para config.endpoint (contrato no README) e estados de resposta.
 * Com endpoint "mock", ?simular=ok|cpf_duplicado|esgotado|invalido|erro escolhe a resposta.
 */
(function () {
  "use strict";

  var config = window.CSC_CONFIG || {};
  var form = document.getElementById("formulario");
  if (!form) return;

  var resumo = document.getElementById("resumo-erros");
  var resumoLista = resumo.querySelector("ul");
  var estado = document.getElementById("estado");
  var botaoEnviar = document.getElementById("enviar");
  var textoBotao = botaoEnviar.textContent;
  var statusEnvio = document.getElementById("status-envio");
  var avisoRecursos = document.getElementById("aviso-recursos");
  var CONTATO = '<span class="marcador">[PREENCHER: contato]</span>';

  function $(id) { return document.getElementById(id); }
  function soNumeros(v) { return (v || "").replace(/\D/g, ""); }
  function escapar(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function anunciar(regiao, texto) {
    regiao.textContent = "";
    window.setTimeout(function () { regiao.textContent = texto; }, 60);
  }

  /* ---------- CPF: máscara que não trava digitação nem colagem ---------- */
  function formatarCpf(d) {
    var r = d.slice(0, 3);
    if (d.length > 3) r += "." + d.slice(3, 6);
    if (d.length > 6) r += "." + d.slice(6, 9);
    if (d.length > 9) r += "-" + d.slice(9, 11);
    return r;
  }
  var cpf = $("cpf");
  cpf.addEventListener("input", function () {
    var pos = cpf.selectionStart || 0;
    var digitosAntes = soNumeros(cpf.value.slice(0, pos)).length;
    var digitos = soNumeros(cpf.value).slice(0, 11);
    var novo = formatarCpf(digitos);
    if (novo === cpf.value) return;
    cpf.value = novo;
    // devolve o cursor para depois do mesmo número de dígitos
    var p = 0, contados = 0;
    while (p < novo.length && contados < digitosAntes) {
      if (/\d/.test(novo[p])) contados += 1;
      p += 1;
    }
    try { cpf.setSelectionRange(p, p); } catch (e) { /* alguns teclados não permitem */ }
  });

  function cpfValido(d) {
    if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
    for (var t = 9; t < 11; t++) {
      var soma = 0;
      for (var i = 0; i < t; i++) soma += parseInt(d[i], 10) * (t + 1 - i);
      var dv = (soma * 10) % 11 % 10;
      if (dv !== parseInt(d[t], 10)) return false;
    }
    return true;
  }

  /* ---------- Recursos: "Não preciso" exclui os outros ---------- */
  var nenhum = $("recurso-nenhum");
  var recursos = Array.prototype.slice.call(form.querySelectorAll('input[name="recursos"]'));
  var outrosRecursos = recursos.filter(function (r) { return r !== nenhum; });

  nenhum.addEventListener("change", function () {
    if (!nenhum.checked) return;
    var desmarcados = outrosRecursos.filter(function (r) { return r.checked; });
    desmarcados.forEach(function (r) { r.checked = false; });
    if (desmarcados.length) anunciar(avisoRecursos, "Os outros recursos de acessibilidade foram desmarcados.");
  });
  outrosRecursos.forEach(function (r) {
    r.addEventListener("change", function () {
      if (r.checked && nenhum.checked) {
        nenhum.checked = false;
        anunciar(avisoRecursos, "A opção Não preciso de recursos de acessibilidade foi desmarcada.");
      }
    });
  });

  /* ---------- Erros ---------- */
  // Campo do servidor -> elemento que recebe o foco e o erro
  var ALVOS = {
    nome: "nome", cpf: "cpf", email: "email", telefone: "telefone",
    recursos: "recurso-ad",
    como_soube: "como_soube", consentimento_lgpd: "consentimento_lgpd", autorizacao_imagem_voz: "autorizacao_imagem_voz"
  };
  var ROTULOS = {
    nome: "Nome completo", cpf: "CPF", email: "E-mail", telefone: "Telefone com DDD",
    recursos: "Recursos de acessibilidade",
    como_soube: "Como você soube da sessão", consentimento_lgpd: "Uso dos dados",
    autorizacao_imagem_voz: "Autorização de imagem e voz"
  };

  function camposDo(nome) {
    if (nome === "recursos") return recursos;
    var el = $(ALVOS[nome] || nome);
    return el ? [el] : [];
  }

  function limparErros() {
    resumo.hidden = true;
    resumoLista.innerHTML = "";
    form.querySelectorAll("[aria-invalid]").forEach(function (el) {
      el.removeAttribute("aria-invalid");
      var ids = (el.getAttribute("aria-describedby") || "").split(" ").filter(function (id) { return id && id.indexOf("erro-") !== 0; });
      if (ids.length) el.setAttribute("aria-describedby", ids.join(" "));
      else el.removeAttribute("aria-describedby");
    });
    form.querySelectorAll(".erro-campo").forEach(function (p) { p.hidden = true; p.textContent = ""; });
    form.querySelectorAll(".grupo--erro").forEach(function (g) { g.classList.remove("grupo--erro"); });
  }

  function mostrarErros(erros) {
    // erros: [{ campo, mensagem }]
    erros.forEach(function (erro) {
      var idErro = "erro-" + erro.campo;
      var p = $(idErro);
      if (p) {
        p.textContent = erro.mensagem;
        p.hidden = false;
      }
      camposDo(erro.campo).forEach(function (el) {
        el.setAttribute("aria-invalid", "true");
        if (p) {
          var ids = (el.getAttribute("aria-describedby") || "").split(" ").filter(Boolean);
          if (ids.indexOf(idErro) === -1) ids.push(idErro);
          el.setAttribute("aria-describedby", ids.join(" "));
        }
        var grupo = el.closest("fieldset");
        if (grupo) grupo.classList.add("grupo--erro");
      });

      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + (ALVOS[erro.campo] || erro.campo);
      a.textContent = (ROTULOS[erro.campo] ? ROTULOS[erro.campo] + ": " : "") + erro.mensagem;
      li.appendChild(a);
      resumoLista.appendChild(li);
    });
    resumo.hidden = false;
    resumo.focus();
  }

  resumoLista.addEventListener("click", function (ev) {
    var a = ev.target.closest("a");
    if (!a) return;
    var alvo = $(a.getAttribute("href").slice(1));
    if (!alvo) return;
    ev.preventDefault();
    alvo.focus();
    alvo.scrollIntoView({ block: "center" });
  });

  /* ---------- Validação (ao enviar, não a cada tecla) ---------- */
  function validar() {
    var erros = [];
    var nome = $("nome").value.trim();
    if (!nome) erros.push({ campo: "nome", mensagem: "Digite o seu nome completo." });
    else if (nome.split(/\s+/).filter(function (p) { return p.length > 0; }).length < 2)
      erros.push({ campo: "nome", mensagem: "Digite o seu nome completo, com nome e sobrenome." });

    if (!cpfValido(soNumeros(cpf.value)))
      erros.push({ campo: "cpf", mensagem: "Digite um CPF válido, com 11 números." });

    var email = $("email").value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      erros.push({ campo: "email", mensagem: "Digite um e-mail válido, por exemplo nome@exemplo.com.br." });

    var tel = soNumeros($("telefone").value);
    if (!/^[1-9][1-9]\d{8,9}$/.test(tel))
      erros.push({ campo: "telefone", mensagem: "Digite um telefone válido, com DDD e só números. Exemplo: 11999999999." });

    if (!recursos.some(function (r) { return r.checked; }))
      erros.push({ campo: "recursos", mensagem: "Marque pelo menos um recurso de acessibilidade ou a opção “Não preciso de recursos de acessibilidade”." });

    if (!$("consentimento_lgpd").checked)
      erros.push({ campo: "consentimento_lgpd", mensagem: "Para concluir a inscrição, marque que concorda com o uso dos seus dados." });

    if (!$("autorizacao_imagem_voz").checked)
      erros.push({ campo: "autorizacao_imagem_voz", mensagem: "Para concluir a inscrição, marque a autorização de uso de imagem e voz." });

    return erros;
  }

  /* ---------- Dados no formato do contrato ---------- */
  function agoraComFuso() {
    var d = new Date();
    var off = -d.getTimezoneOffset();
    var sinal = off >= 0 ? "+" : "-";
    function dois(n) { return String(Math.floor(Math.abs(n))).padStart(2, "0"); }
    return d.getFullYear() + "-" + dois(d.getMonth() + 1) + "-" + dois(d.getDate()) +
      "T" + dois(d.getHours()) + ":" + dois(d.getMinutes()) + ":" + dois(d.getSeconds()) +
      sinal + dois(off / 60) + ":" + dois(off % 60);
  }

  function montarDados() {
    function marcados(nome) {
      return Array.prototype.slice.call(form.querySelectorAll('input[name="' + nome + '"]:checked')).map(function (c) { return c.value; });
    }
    var rec = marcados("recursos");
    if (rec.indexOf("nenhum") !== -1) rec = ["nenhum"];
    return {
      evento: config.evento || "crime-sem-castigo-2026-11-15",
      nome: $("nome").value.trim().replace(/\s+/g, " "),
      cpf: soNumeros(cpf.value),
      email: $("email").value.trim(),
      telefone: soNumeros($("telefone").value),
      recursos: rec,
      // A pergunta sobre necessidade de acesso saiu do formulário; os campos seguem vazios para manter o contrato
      necessidades: [],
      necessidade_outra: "",
      como_soube: $("como_soube").value,
      consentimento_lgpd: $("consentimento_lgpd").checked,
      autorizacao_imagem_voz: $("autorizacao_imagem_voz").checked,
      origem: "lp-crimesemcastigo",
      enviado_em: agoraComFuso()
    };
  }

  /* ---------- Envio ---------- */
  function simular() {
    var opcao = new URLSearchParams(location.search).get("simular") || "ok";
    var respostas = {
      ok: { status: 201, corpo: { status: "ok" } },
      cpf_duplicado: { status: 409, corpo: { status: "cpf_duplicado" } },
      esgotado: { status: 410, corpo: { status: "esgotado" } },
      invalido: { status: 422, corpo: { status: "invalido", campos: { email: "O servidor não aceitou este e-mail. Confira e tente de novo." } } },
      erro: { status: 500, corpo: { status: "erro" } }
    };
    var r = respostas[opcao] || respostas.ok;
    return new Promise(function (resolve) {
      window.setTimeout(function () { resolve({ status: r.status, corpo: r.corpo }); }, 1200);
    });
  }

  function enviar(dados) {
    if (config.endpoint === "mock") {
      if (window.console) console.info("[mock] dados enviados:", dados);
      window.__ultimoEnvio = dados;
      return simular();
    }
    return fetch(config.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(dados)
    }).then(function (resp) {
      return resp.json().catch(function () { return {}; }).then(function (corpo) {
        return { status: resp.status, corpo: corpo };
      });
    });
  }

  function interpretar(r) {
    var s = r.corpo && r.corpo.status;
    if (r.status === 201 && (!s || s === "ok")) return "ok";
    if (r.status === 409) return "cpf_duplicado";
    if (r.status === 410) return "esgotado";
    if (r.status === 422) return "invalido";
    return "erro";
  }

  function mostrarEstado(tipo, dados) {
    var titulo, corpo;
    if (tipo === "ok") {
      titulo = "Inscrição recebida!";
      corpo = "<p>Enviamos um e-mail de confirmação para <strong>" + escapar(dados.email) + "</strong>. Se não encontrar, confira a caixa de spam.</p>" +
        '<p><a class="botao botao--secundario" href="../">Voltar para a página da sessão</a></p>';
    } else if (tipo === "cpf_duplicado") {
      titulo = "Este CPF já tem inscrição";
      corpo = "<p>Este CPF já tem inscrição para esta sessão. Se não recebeu o e-mail de confirmação, fale com a gente: " + CONTATO + ".</p>" +
        '<p><a href="../">Voltar para a página da sessão</a></p>';
    } else if (tipo === "esgotado") {
      titulo = "Vagas esgotadas";
      corpo = "<p>As vagas para esta sessão estão esgotadas. Obrigado pelo interesse!</p>" +
        '<p><a href="../">Voltar para a página da sessão</a></p>';
    } else {
      titulo = "Não conseguimos enviar a sua inscrição";
      corpo = "<p>Não conseguimos enviar a sua inscrição agora. Tente de novo em alguns minutos ou fale com a gente: " + CONTATO + ".</p>" +
        "<p>Os dados que você preencheu continuam no formulário abaixo.</p>";
    }
    estado.innerHTML = '<h2 id="estado-titulo" tabindex="-1">' + titulo + "</h2>" + corpo;
    estado.hidden = false;
    // No erro, o formulário continua preenchido e visível; nos outros casos, ele some
    form.hidden = tipo !== "erro";
    if (tipo !== "erro") {
      document.querySelectorAll(".obrigatorios").forEach(function (el) { el.hidden = true; });
    }
    $("estado-titulo").focus();
  }

  var enviando = false;
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (enviando) return;
    limparErros();
    estado.hidden = true;

    var erros = validar();
    if (erros.length) {
      mostrarErros(erros);
      return;
    }

    var dados = montarDados();

    // Campo-armadilha preenchido: robô. Simula sucesso sem enviar.
    if ($("site").value) {
      mostrarEstado("ok", dados);
      return;
    }

    enviando = true;
    botaoEnviar.disabled = true;
    botaoEnviar.textContent = "Enviando…";
    anunciar(statusEnvio, "Enviando a sua inscrição. Aguarde.");

    enviar(dados).catch(function () { return { status: 0, corpo: {} }; }).then(function (r) {
      var tipo = interpretar(r);
      enviando = false;
      botaoEnviar.disabled = false;
      botaoEnviar.textContent = textoBotao;
      statusEnvio.textContent = "";
      if (tipo === "invalido") {
        // 422: mostra no resumo os erros que o servidor mandou
        var campos = (r.corpo && r.corpo.campos) || {};
        var lista = Object.keys(campos).map(function (k) { return { campo: k, mensagem: String(campos[k]) }; });
        if (!lista.length) lista = [{ campo: "nome", mensagem: "Confira os dados e tente de novo." }];
        mostrarErros(lista);
        return;
      }
      mostrarEstado(tipo, dados);
    });
  });
})();
