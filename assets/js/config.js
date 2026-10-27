/*
 * Configuração da landing page · Sessão Acessível · Crime Sem Castigo
 * Tudo o que muda entre teste e produção fica aqui. Veja o README.md.
 */
window.CSC_CONFIG = {
  // URL do back-end que recebe as inscrições (POST JSON, contrato no README).
  // "mock" simula as respostas do servidor; use ?simular=ok|cpf_duplicado|esgotado|invalido|erro na URL.
  // [PREENCHER: URL do endpoint · pendência P09]
  endpoint: "mock",

  // Identificador do evento enviado no campo "evento".
  evento: "crime-sem-castigo-2026-11-15",

  // ID do vídeo convite no YouTube (só o ID, por exemplo "dQw4w9WgXcQ").
  // [PREENCHER: ID do vídeo · pendência V1]
  youtubeId: "",

  // ID do vídeo sinopse acessível no YouTube (botão "Vídeo sinopse acessível", em "O filme").
  // [PREENCHER: ID do vídeo sinopse]
  youtubeIdSinopse: "",

  // Botão "Clique para baixar o MovieReading" (passo 1 do bloco de audiodescrição).
  // Se houver um link único de download (que já leva à loja certa), use downloadUrl.
  // Sem ele, o botão leva à App Store no iPhone/iPad e à Google Play no Android
  // (no computador, usa o link da Google Play, ou o da App Store se só ele existir).
  // [PREENCHER: link para baixar o MovieReading]
  downloadUrl: "",
  appStoreUrl: "",
  googlePlayUrl: "",

  // Link que abre a página de Crime Sem Castigo direto no app MovieReading.
  // Gera o QR Code do bloco de audiodescrição e o botão "Abrir Crime Sem Castigo no MovieReading".
  // [PREENCHER: link do filme no MovieReading]
  movieReadingUrl: "",

  // Link do atendimento em Libras pelo iCom da Iguale.
  // [PREENCHER: link do iCom da Iguale]
  icomUrl: "",

  // ID do Google Tag Manager (por exemplo "GTM-XXXXXXX"). Vazio = sem analytics.
  // [PREENCHER: ID]
  gtmId: "",

  // false esconde o botão "Fazer inscrição" e mostra "As inscrições estão encerradas."
  inscricoesAbertas: true
};
