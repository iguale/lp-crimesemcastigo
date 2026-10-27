# Landing page · Sessão Acessível · Crime Sem Castigo

Página da Sessão Acessível do filme *Crime Sem Castigo* (domingo, 15/11/2026, às 10h, Espaço Petrobras de Cinema, sala 1). Lapfilme assina; a Iguale é parceira e cuida da acessibilidade.

- Página principal: `iguale.com.br/crimesemcastigo`
- Inscrição: `iguale.com.br/crimesemcastigo/inscricao`
- Declaração de acessibilidade: `iguale.com.br/crimesemcastigo/acessibilidade`

HTML, CSS e JavaScript puro, sem framework e sem etapa de build. As especificações completas estão no `CLAUDE.md`.

---

## 1. Como publicar

1. Copie **todo o conteúdo da raiz deste repositório** para a pasta `/crimesemcastigo/` do servidor da Iguale (exceto `CLAUDE.md` e `README.md`, que não precisam ir).
2. Todos os caminhos são relativos, então a página funciona em qualquer pasta. Os endereços absolutos (`canonical`, `og:url`, `og:image`) apontam para `https://iguale.com.br/crimesemcastigo/`. Se o endereço final mudar, troque nos três `index.html`.
3. Antes de publicar, ajuste `assets/js/config.js` (próxima seção) e confira a tabela de pendências (seção 5).

Para testar localmente:

```bash
python3 -m http.server 8000
# abra http://localhost:8000/
```

## 2. Configuração (`assets/js/config.js`)

| Chave | O que é | Valor atual |
|---|---|---|
| `endpoint` | URL do back-end que recebe as inscrições. `"mock"` simula as respostas | `"mock"` · `[PREENCHER]` (P09) |
| `evento` | identificador enviado no campo `evento` | `"crime-sem-castigo-2026-11-15"` |
| `youtubeId` | só o ID do vídeo convite no YouTube | `""` · `[PREENCHER]` (V1) |
| `movieReadingUrl` | link que abre Crime Sem Castigo direto no app MovieReading. Gera o QR Code do bloco `#audiodescricao-app` (só em telas a partir de 768 px) e ativa o botão "Abrir Crime Sem Castigo no MovieReading". O QR Code é desenhado na própria página pela biblioteca `assets/js/vendor/qrcode-generator-1.4.4.js` (MIT, Kazuhiko Arase) | `""` · `[PREENCHER]` |
| `appStoreUrl`, `googlePlayUrl` | links do app MovieReading nas lojas, no bloco "Como usar a audiodescrição pelo MovieReading" (`#audiodescricao-app`). Vazios, o texto dos links aparece sem link, com o marcador ao lado | `""` · `[PREENCHER]` |
| `icomUrl` | link do atendimento em Libras pelo iCom da Iguale | `""` · `[PREENCHER]` |
| `gtmId` | ID do Google Tag Manager (`GTM-XXXXXXX`). Vazio = sem analytics | `""` · `[PREENCHER]` |
| `inscricoesAbertas` | `false` esconde os botões "Fazer inscrição" e o formulário, e mostra "As inscrições estão encerradas." | `true` |

Enquanto `youtubeId` e `icomUrl` estiverem vazios, a página mostra os marcadores `[PREENCHER]` no lugar do vídeo e do botão do iCom. Quando forem preenchidos, os marcadores somem sozinhos.

### Modo de teste

Com `endpoint: "mock"`, o formulário não envia nada: espera 1,2 segundo e devolve a resposta escolhida na URL.

| URL | Resposta simulada |
|---|---|
| `inscricao/` ou `inscricao/?simular=ok` | 201 · inscrição recebida |
| `inscricao/?simular=cpf_duplicado` | 409 · CPF já inscrito |
| `inscricao/?simular=esgotado` | 410 · vagas esgotadas |
| `inscricao/?simular=invalido` | 422 · erro de validação no e-mail, vindo do servidor |
| `inscricao/?simular=erro` | 500 · falha (o formulário continua preenchido) |

O JSON que seria enviado aparece no console do navegador (`[mock] dados enviados`).

CPF válido para teste: `529.982.247-25`.

## 3. Contrato com o back-end (para a equipe de desenvolvimento)

`POST {config.endpoint}` · `Content-Type: application/json`

```json
{
  "evento": "crime-sem-castigo-2026-11-15",
  "nome": "Maria da Silva",
  "cpf": "12345678909",
  "email": "maria@exemplo.com.br",
  "telefone": "11999999999",
  "recursos": ["ad", "lse", "libras"],
  "necessidades": ["cadeira_de_rodas", "mobilidade_reduzida", "cao_guia", "outra"],
  "necessidade_outra": "",
  "como_soube": "instagram",
  "consentimento_lgpd": true,
  "autorizacao_imagem_voz": true,
  "origem": "lp-crimesemcastigo",
  "enviado_em": "2026-10-28T14:03:00-03:00"
}
```

O exemplo é fictício e serve só para mostrar o formato.

**Campos:**

- `cpf` e `telefone` vão **só com números** (o front-end tira pontos, traços, parênteses e espaços).
- `recursos`: um ou mais entre `ad`, `lse`, `libras`. Quando a pessoa marca "Não preciso de recursos de acessibilidade", vai `["nenhum"]`.
- `necessidades` e `necessidade_outra`: **a pergunta "Você tem alguma necessidade de acesso?" saiu do formulário**, então esses campos vão sempre como `[]` e `""`. Eles continuam no JSON para não quebrar o contrato; se o back-end preferir, podem ser retirados nos dois lados.
- `como_soube`: `instagram`, `whatsapp`, `email`, `instituicao`, `indicacao`, `outro` ou `""` (não respondido).
- `consentimento_lgpd` e `autorizacao_imagem_voz`: sempre `true` (o formulário não envia sem os dois marcados).
- `enviado_em`: data e hora do navegador, em ISO 8601 com o fuso da pessoa.
- **Anti-spam:** o formulário tem um campo-armadilha escondido (`site`). Se ele vier preenchido, o front-end mostra "Inscrição recebida!" e **não envia nada**. Não há CAPTCHA visual. Recomenda-se também limitar a taxa de envio por IP no back-end.

**Respostas esperadas:**

| Status | Corpo | O que a página faz |
|---|---|---|
| `201` | `{"status":"ok"}` | mostra "Inscrição recebida!" com o e-mail informado |
| `409` | `{"status":"cpf_duplicado"}` | mostra que o CPF já tem inscrição |
| `410` | `{"status":"esgotado"}` | mostra que as vagas acabaram |
| `422` | `{"status":"invalido","campos":{"email":"mensagem"}}` | volta ao formulário e mostra as mensagens no resumo de erros, ligadas aos campos |
| qualquer outro, ou falha de rede | — | mostra o erro genérico, com o formulário ainda preenchido |

No `422`, as chaves de `campos` devem usar os mesmos nomes do JSON (`nome`, `cpf`, `email`, `telefone`, `recursos`, `necessidade_outra`, `consentimento_lgpd`, `autorizacao_imagem_voz` etc.). As mensagens aparecem para a pessoa exatamente como vierem, então escreva em português claro, dizendo o que fazer (ex.: "Digite um e-mail válido.").

Se o back-end ficar em outro domínio, ele precisa liberar CORS para `https://iguale.com.br` (método `POST`, cabeçalho `Content-Type`).

**Responsabilidade do back-end:** gravar a inscrição, controlar CPF duplicado e o limite de vagas, e enviar o e-mail de confirmação.

### E-mail de confirmação (Anexo C do `CLAUDE.md`)

Envie em texto real (não imagem), com versão em texto simples, uma coluna, corpo com pelo menos 14 px e links descritivos.

- **Assunto:** Inscrição confirmada: Sessão Acessível de Crime Sem Castigo
- **Pré-cabeçalho:** Domingo, 15/11, às 10h, no Espaço Petrobras de Cinema
- **Corpo:** o texto completo está no Anexo C do `CLAUDE.md`. O contato para dúvidas ainda é `[PREENCHER]` (P11).
- **Logos:** use os arquivos PNG de `assets/img/logos/` (PNG funciona melhor em clientes de e-mail que WebP), cada um com texto alternativo: "Lapfilme", "Governo do Estado de São Paulo – Secretaria da Cultura, Economia e Indústria Criativas", "Lei Paulo Gustavo", "Ministério da Cultura". Os logos são claros, para fundo escuro.

## 4. Estrutura

```
├── index.html                  # página principal
├── inscricao/index.html        # formulário
├── acessibilidade/index.html   # declaração de acessibilidade
├── assets/
│   ├── css/estilos.css         # tema (paleta do cartaz, seção 4 do CLAUDE.md)
│   ├── js/config.js            # configuração (seção 2 deste README)
│   ├── js/principal.js         # menu no celular, vídeo sob clique, inscrições abertas/encerradas, iCom, GTM
│   ├── js/inscricao.js         # máscara e validação, regras dos checkboxes, envio, estados, modo de teste
│   ├── js/barra-acessibilidade.js  # barra da Iguale Digital e menu flutuante "Acessibilidade"
│   ├── img/cartaz/             # cartaz, abertura, título, textura e imagem de compartilhamento
│   │   └── camadas/            # camadas do cartaz em versão web, guardadas para uso futuro
│   ├── img/logos/              # régua de logos recortada (WebP para a página, PNG para o e-mail)
│   └── img/icones/             # AD, LSE e Libras (PNG oficiais enviados pela Iguale), cadeira de rodas e acessibilidade (SVG)
└── id_a11y/id_a11y.css         # modos de contraste da barra
```

### Imagens

| Arquivo | Uso |
|---|---|
| `cartaz/abertura-{800,1600}.{webp,jpg}` | composição da abertura, montada com as camadas do cartaz (paisagem, casa e rosto central ao fundo; os dois homens à frente), sem textos |
| `cartaz/titulo-crime-sem-castigo-*` | camada do título, dentro do `h1`, com `alt="Crime Sem Castigo"` |
| `cartaz/cartaz-crime-sem-castigo-{800,1600}.{webp,jpg}` | cartaz inteiro na seção "O filme", com o texto alternativo do Anexo A |
| `cartaz/cartaz-crime-sem-castigo-3000.jpg` | versão grande para recortes (não é carregada pela página) |
| `cartaz/og-crime-sem-castigo-1200x630.jpg` | imagem de compartilhamento (Open Graph e Twitter) e capa do vídeo |
| `cartaz/textura-papel.{webp,jpg}` | textura de papel do fundo, escurecida para não atrapalhar a leitura |
| `cartaz/camadas/*` | personagens separados, rosto central, paisagem e linhas de texto do cartaz, em versão web, para os cards de personagens ou outras peças |

Os PNGs originais das camadas (de 8 a 19 MB cada) foram convertidos e tirados da pasta publicada. Eles continuam no histórico do git (commit `d802bed`), se for preciso recuperar. O original do cartaz, de cerca de 65 MB, fica fora do repositório.

**Ajustes de layout pedidos depois da primeira versão (diferem do `CLAUDE.md`):**

- O vídeo convite não tem mais seção própria: o botão "Vídeo convite acessível", na abertura, abre uma janela (`<dialog>`) com o vídeo e a descrição em texto. Esc, o botão "Fechar" ou um clique fora fecham a janela, e o foco volta para o botão.
- Ordem das seções e do menu: O filme · A sessão · Inscrição · Programação · Local · Dúvidas · Contato.
- Detalhes em vermelho e branco: botões e selos vermelhos com texto branco (6,5:1), cards de recurso brancos com faixa vermelha, seção de inscrição em faixa clara e um traço vermelho decorativo sob os títulos. O vermelho nunca aparece como texto sobre fundo escuro (daria 2,6:1).
- Selo "16" na cor da classificação indicativa de 16 anos e detalhe verde na "Entrada gratuita" (7,4:1 sobre o fundo).
- Textos dos cards de recurso adaptados dos de Gramado.
- Dúvidas frequentes sem as perguntas sobre acompanhantes, cadeira de rodas e o que levar no dia.
- Painel "Acessibilidade" ampliado, em quatro grupos: **Leitura** (tamanho do texto, espaçar o texto pelos valores da WCAG 1.4.12, fonte mais legível com Atkinson Hyperlegible carregada só quando ativada, guia de leitura só em telas com mouse), **Cores** (contrastes e destacar links e botões), **Libras** (VLibras e iCom) e **Ajuda** (atalhos de teclado e "Restaurar tudo ao padrão"). As escolhas ficam no `localStorage` (`id_a11y_fonte`, `id_a11y_contraste`, `id_a11y_opcoes`).
- Ícones de AD, LSE e Libras: PNGs oficiais enviados pela Iguale (o fundo branco virou transparente) e usados como máscara (ganham a cor do contexto e funcionam nos modos de contraste).
- Logos da Iguale e do Espaço Petrobras de Cinema juntos no rodapé, fora dos grupos "Uma produção" e "Realização".
- Crédito "Os recursos de acessibilidade desta sessão foram produzidos pela Iguale." abaixo dos cards de recurso.
- Ilustração "Cinema Snacks and Accessible Tickets" (enviada pela Iguale) ao lado da inscrição, só a partir de telas médias e escondida nos modos alto contraste e preto e amarelo.
- Botão "Vídeo sinopse acessível" em "O filme", que abre uma janela igual à do vídeo convite.
- Cards de recurso: box vermelho com o ícone em branco e o nome do recurso abaixo.
- Crédito da Iguale em destaque: logo da Iguale ao lado do texto em fonte maior, sem fundo.

**Decisões sobre o cartaz:**

- O **raio vermelho isolado** (`SIMBOLO.png`) não foi usado nem guardado: pela regra da seção 4 do `CLAUDE.md`, ele aparece só dentro do título e do cartaz.
- As linhas de texto do cartaz ("Lapfilme apresenta", "A vida clandestina de um médico nazista", créditos) entram como **texto HTML**, não como imagem.
- O `CLAUDE.md` fala em "fotos em preto e branco", mas no cartaz só o rosto central é P&B; os dois homens, a mata e a casa estão em cores, em tons sépia. A abertura mantém as cores do cartaz.

### Kit de acessibilidade

Os arquivos `id_a11y` do projeto de Gramado não estavam disponíveis, então o kit foi implementado do zero com as mesmas funções: tamanho do texto (aumentar, diminuir, original), os seis modos de contraste e os atalhos `[1]` conteúdo e `[2]` menu (`accesskey` + `Alt+1`/`Alt+2`). A escolha fica no `localStorage`, com `try/catch`. Se os arquivos originais chegarem, basta trocar `id_a11y/` e `assets/js/barra-acessibilidade.js`, mantendo as classes `a11y-*` no `<html>` ou adaptando o CSS.

## 5. Pendências (`[PREENCHER]` e `[CONFIRMAR]`)

Todos os marcadores aparecem visíveis na página, com borda tracejada, até serem trocados.

| Marcador | Onde trocar | Pendência |
|---|---|---|
| Aprovação do logo do Espaço Petrobras de Cinema na régua (o arquivo já está no rodapé) e versão maior ou em SVG desse logo (o enviado tem 57 px de altura) | `assets/img/logos/espaco-petrobras-cinema.*` | P05 |
| Regras de aplicação da régua de logos | `index.html`, rodapé (`.rodape__regras`); ajustar ordem, rótulos "Uma produção"/"Realização" e tamanhos | P05 |
| ID do vídeo no YouTube | `assets/js/config.js` → `youtubeId` | V1 |
| Vídeo sinopse acessível: ID no YouTube, recursos do vídeo e descrição em texto | `assets/js/config.js` → `youtubeIdSinopse`; `index.html`, janela `#video-sinopse` | — |
| Versão da ilustração de pipoca e ingressos com transparência de verdade (o PNG enviado tinha o quadriculado gravado na imagem; o fundo foi removido automaticamente e a ponta direita da tampa do copo perdeu um pouco do contorno) | `assets/img/ilustracoes/` | — |
| Autodescrição do(a) intérprete | `index.html`, seção "Convite em vídeo" (Anexo B) | V1 |
| Personagens: nome, descritivo, intérprete e imagem. **O bloco "Personagens principais" está fora da página por enquanto** (guardado num comentário HTML em "O filme"; para voltar, é só tirar o comentário) | `index.html`, seção "O filme" → 3 cards `.personagem`; as camadas em `assets/img/cartaz/camadas/` podem servir de imagem | P22 |
| Confirmar com o cinema o trecho "Como chegar de transporte público". Metrô: Consolação, Linha 2-Verde, a cerca de 250 m; Paulista, Linha 4-Amarela, ligada por corredor (fonte: [Radar 360](https://radar360.com.br/cine-espaco-augusta/)). Ônibus: **faltam as linhas que param mais perto do cinema** (marcador `[CONFIRMAR]` na página); hoje o texto cita as vias e leva ao site da SPTrans | `index.html`, seção "Local" | P03 |
| Capacidade da sala 1 (241 lugares e 5 espaços) | `index.html`, seção "Local" | P03 |
| Contato para dúvidas (e-mail e/ou WhatsApp) | `index.html` (Contato), `acessibilidade/index.html` (Fale com a gente), `assets/js/inscricao.js` (constante `CONTATO`, usada nos estados "CPF duplicado" e "erro"), e-mail de confirmação | P11 |
| Aviso de privacidade (texto final e link) | `inscricao/index.html`, checkbox `consentimento_lgpd` | P16 |
| Autorização de imagem e voz (texto final, quem recebe, por quanto tempo) | `inscricao/index.html`, checkbox `autorizacao_imagem_voz`; `index.html`, FAQ "A sessão vai ser gravada?" | P16 |
| Link do filme no MovieReading (QR Code e botão) | `assets/js/config.js` → `movieReadingUrl` | — |
| Versão negativa (branca) oficial do logo do MovieReading. A do rodapé foi gerada a partir do logo colorido, trocando as cores por branco | `assets/img/logos/moviereading.*` | — |
| Links do MovieReading na App Store e no Google Play | `assets/js/config.js` → `appStoreUrl` e `googlePlayUrl` | — |
| Link do iCom da Iguale | `assets/js/config.js` → `icomUrl` | — |
| Endpoint do back-end | `assets/js/config.js` → `endpoint` | P09 |
| ID do Google Tag Manager | `assets/js/config.js` → `gtmId` | — |
| **[CONFIRMAR: validação do Braille]** — `⠨⠉⠗⠊⠍⠑ ⠨⠎⠑⠍ ⠨⠉⠁⠎⠞⠊⠛⠕` | `index.html`, abertura (`.braille__celas`) | P34 |
| Favicon da Iguale | `<head>` das três páginas (linha comentada) | — |
| **[CONFIRMAR: texto alternativo do cartaz e da descrição do vídeo]** — o Anexo A dizia "Em preto e branco"; o texto foi ajustado para "Em tons sépia, o rosto [...] em preto e branco", porque só o rosto central é P&B. O mesmo ajuste foi feito no Anexo B | `index.html` (abertura, cartaz em "O filme", descrição do vídeo) e `og:image:alt` | — |
| Resultado dos testes com NVDA e VoiceOver | `acessibilidade/index.html`, seção "Avaliação" | — |

## 6. Testes feitos

Com Chromium (Playwright) e axe-core 4.10, nas três páginas:

- **axe** (regras WCAG 2.0/2.1/2.2 A e AA + boas práticas): 0 violações nas três páginas, em cada um dos seis modos de contraste.
- **Reflow:** sem rolagem horizontal em 320 px e em 640 px (equivale a 1280 px com zoom de 200%).
- **Formulário:** envio vazio (resumo com foco, `aria-invalid`, mensagens ligadas por `aria-describedby`, links do resumo levam ao campo), máscara do CPF digitando e colando, dígitos verificadores, regra "Não preciso" nos dois sentidos com anúncio em `aria-live`, campo "Conte qual", botão "Enviando…" desabilitado, os cinco estados com foco no título, e o JSON conferido contra o contrato.
- **Teclado:** atalhos `[1]`/`[2]`, menu no celular (`aria-expanded`, Esc), painel "Acessibilidade" (Esc fecha e devolve o foco), escolha de contraste e texto guardada depois de recarregar.
- **Configuração:** `inscricoesAbertas: false`, `youtubeId` (o `iframe` do `youtube-nocookie.com` só aparece depois do clique) e `icomUrl`.
- **Terminologia:** nenhuma ocorrência de "deficiente", "portador", "pessoas especiais" ou "linguagem de sinais", e nenhum texto inteiro em caixa alta no HTML. A sinopse oficial cita o título em caixa alta; ele está escrito normalmente no HTML e fica em caixa alta pelo CSS, então o visual continua igual ao texto oficial.

**Ainda falta fazer (manual):** Lighthouse Acessibilidade (não estava disponível no ambiente de desenvolvimento), NVDA ou VoiceOver nas duas páginas, e teste em celulares reais, incluindo o widget do VLibras, que é de terceiros e não entrou na verificação do axe.
