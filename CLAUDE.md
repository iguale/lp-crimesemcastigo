# Landing page – Sessão Acessível · Crime Sem Castigo

Instruções para montar o projeto no Claude Code. Versão 1 · 25/10/2026 · Iguale.

**Como usar:** este arquivo fica na raiz do repositório com o nome `CLAUDE.md`, e o Claude Code o lê no início de cada sessão. Para a primeira sessão, use:
> Leia o CLAUDE.md inteiro e monte o projeto seguindo tudo o que está nele. Antes de escrever código, me mostre o plano de pastas e as seções.

Tudo marcado com `[PREENCHER]` ou `[CONFIRMAR]` ainda não foi definido. **Não invente esses dados:** deixe o marcador visível no HTML e liste todos no README.

---

## 1. Contexto

- **Evento:** Sessão Acessível do filme *Crime Sem Castigo*.
- **Data e hora:** domingo, 15/11/2026. A casa abre às 9h30, e a sessão começa às 10h.
- **Local:** Espaço Petrobras de Cinema, sala 1 – Rua Augusta, 1475 – Consolação, São Paulo (SP).
- **Quem faz:** a Lapfilme (produtora do filme) assina; a Iguale é parceira e cuida da acessibilidade.
- **Recursos da sessão:** abertos para todo o público. A audiodescrição sai no som da sala; Libras e legendas descritivas aparecem na tela. Depois do filme, bate-papo de cerca de 30 minutos sobre acessibilidade no cinema.
- **Ingresso:** gratuito, com inscrição prévia. Cada pessoa faz a própria inscrição (não existe campo de acompanhante). Há combo de pipoca e refrigerante gratuito.
- **Endereço da página:** `iguale.com.br/crimesemcastigo`, com a inscrição em `iguale.com.br/crimesemcastigo/inscricao`.
- **Referência:** a página do 54º Festival de Cinema de Gramado (moviereading.com.br/festival-cinema-gramado/) e o cadastro dela. Use a mesma lógica de organização e de acessibilidade, com três diferenças:
  - **Sem MovieReading:** não há app nem tutorial. Não mencione aplicativo nem fone em nenhum lugar da página.
  - **Sessão única:** a programação é um dia só, não uma grade por dia.
  - **Visual do filme:** o visual parte do cartaz de *Crime Sem Castigo*, não da identidade do MovieReading.

## 2. Escopo técnico

- **Stack:** HTML5, CSS e JavaScript puro, sem framework e sem etapa de build, como o projeto de Gramado. A página precisa funcionar como arquivos estáticos dentro de `/crimesemcastigo/` (todos os caminhos relativos).
- **Só front-end:** o back-end (gravação das inscrições e envio do e-mail de confirmação) fica com a equipe de desenvolvimento. O formulário envia para um endpoint configurável e segue o contrato da seção 7.
- **Configuração em um lugar só:** `assets/js/config.js` reúne endpoint, ID do vídeo no YouTube, link do iCom, ID do Google Tag Manager e a chave `inscricoesAbertas`.
- **Modo de teste:** com `endpoint: "mock"`, o formulário simula as respostas do servidor. O parâmetro `?simular=ok|cpf_duplicado|esgotado|erro` na URL escolhe qual delas.
- **Kit de acessibilidade igual ao de Gramado:**
  - **Barra da Iguale Digital (`id_a11y`):** tamanho do texto, modos de contraste e atalhos `[1]` conteúdo e `[2]` menu. Copie os arquivos da pasta `id_a11y` do projeto de Gramado. Se eles não estiverem disponíveis, implemente o equivalente: aumentar, diminuir e voltar o tamanho do texto, e os contrastes "Alto contraste", "Preto e amarelo", "Monocromático", "Escala de cinza invertida", "Cores invertidas" e "Cores originais". A escolha é guardada em `localStorage` (envolta em try/catch).
  - **Menu flutuante "Acessibilidade"**, como em Gramado.
  - **VLibras:** plugin oficial (`https://vlibras.gov.br/app/vlibras-plugin.js`), com o snippet padrão.
  - **Botão do iCom:** "Atendimento em Libras pelo iCom (abre em nova aba)", com link geral da Iguale, sem vínculo com o MovieReading: `[PREENCHER: link do iCom da Iguale]`.
- **Fontes (Google Fonts, com fallback):**
  - Corpo: **Geist**, a mesma de Gramado.
  - Sobretítulos e títulos de seção: **Oswald**, condensada como as linhas de texto do cartaz.
  - O nome do filme entra como imagem (a camada do título exportada do cartaz), com texto alternativo.
- **Analytics:** Google Tag Manager só se `gtmId` estiver preenchido. `[PREENCHER: ID]`.

## 3. Estrutura de pastas

```
crimesemcastigo/
├── index.html                 # página principal
├── inscricao/index.html       # formulário
├── acessibilidade/index.html  # declaração de acessibilidade da página (como o acessibilidade.html de Gramado)
├── assets/
│   ├── css/estilos.css
│   ├── js/config.js
│   ├── js/principal.js        # menu, vídeo, detalhes
│   ├── js/inscricao.js        # validação, envio, estados
│   ├── js/barra-acessibilidade.js
│   ├── img/cartaz/            # cartaz inteiro e camadas exportadas (a Iguale coloca aqui)
│   ├── img/logos/             # régua de logos (a Iguale coloca aqui)
│   └── img/icones/            # AD, LSE, Libras e cadeira de rodas em SVG
├── id_a11y/                   # kit da barra (copiado de Gramado)
└── README.md                  # como publicar, onde trocar cada [PREENCHER]
```

**Imagens:**
- As versões web do cartaz já vêm prontas: `cartaz-crime-sem-castigo-800` e `-1600` (WebP e JPG) e `-3000.jpg` para recortes e para a imagem de compartilhamento. Use `srcset` e `sizes`. O original, de cerca de 65 MB, fica fora do repositório.
- Use as camadas exportadas do cartaz (rosto central, personagens, paisagem e casa, título) para compor a abertura. Se houver só o cartaz inteiro, use-o inteiro ao lado do texto.

## 4. Identidade visual

O foco é o cartaz. A paleta abaixo foi tirada dele e conferida em contraste WCAG:

| Token | Cor | Uso |
|---|---|---|
| `--grafite` | `#1E1C1A` | fundo escuro principal |
| `--sepia-escuro` | `#3A342E` | fundos de seção e cards no tema escuro |
| `--sepia` | `#5E5548` | faixas e fundos de apoio (texto branco sobre ele: 7,3:1) |
| `--areia` | `#C9BCA4` | botões e destaques sobre fundo escuro (texto `--grafite` sobre ela: 9,1:1) |
| `--papel` | `#F2EFE8` | texto sobre fundo escuro (14,8:1 sobre `--grafite`) e fundo claro |
| `--vermelho` | `#B3261E` | só detalhes mínimos sobre `--papel` (5,7:1) |

**Regras de cor:**
- **Nada de texto vermelho sobre fundo escuro:** `#E03A2F` sobre `--grafite` dá 3,9:1 e reprova.
- **O raio vermelho do título fica só no cartaz.** Não o transforme em ícone, divisória ou elemento solto: o filme trata de nazismo, e o motivo isolado pode ser lido de forma indevida.
- **Contraste mínimo:** 4,5:1 para texto comum e 3:1 para texto grande e ícones. Nenhuma informação pode depender só da cor.
- **Tema:** escuro por padrão, como o cartaz. Os modos de contraste da barra sobrescrevem tudo.

**Clima e componentes:**
- **Clima:** sépia e grafite, textura de papel envelhecido no fundo (sutil, sem prejudicar a leitura) e fotos em preto e branco. Sóbrio, sem exagero, sem animações chamativas. Respeite `prefers-reduced-motion`.
- **Título em Braille:** entra como elemento da identidade, perto do título do filme. Proposta de transcrição, que ainda precisa ser validada por revisor(a) de Braille: `⠨⠉⠗⠊⠍⠑ ⠨⠎⠑⠍ ⠨⠉⠁⠎⠞⠊⠛⠕`.
  - Marque com `aria-hidden="true"` e acrescente um texto só para leitor de tela: "Título do filme também escrito em Braille".
  - Inclua `[CONFIRMAR: validação do Braille]` no README.
- **Cards de recurso:** como em Gramado (selo AD, LSE ou LIBRAS, título e texto curto), com a paleta acima.

## 5. Página principal (`index.html`)

Use HTML semântico: `header`, `nav` com `aria-label="Navegação principal"`, `main id="conteudo"`, uma `section` com `h2` para cada bloco e `footer`. Há um único `h1`.

**Menu (âncoras):** O filme · A sessão · Programação · Local · Inscrição · Dúvidas. No celular, o menu vira um botão com `aria-expanded`.

### 5.1 Abertura
- Sobretítulo: "Lapfilme apresenta"
- `h1`: "Sessão Acessível" + o título *Crime Sem Castigo* como imagem do cartaz. O texto alternativo é "Crime Sem Castigo" (o `h1` lido fica "Sessão Acessível de Crime Sem Castigo").
- Linha de serviço: "Domingo, 15 de novembro de 2026, às 10h · Espaço Petrobras de Cinema, sala 1 · São Paulo"
- Texto: "Uma sessão com audiodescrição, Libras e legendas descritivas abertas para todo o público, seguida de um bate-papo sobre acessibilidade no cinema."
- Selos: ícones AD, LSE e Libras (com texto, não só ícone) · "Entrada gratuita" · "Classificação indicativa: 16 anos"
- Botões: "Fazer inscrição" (leva para `inscricao/`) e "Ver o convite em vídeo" (âncora).
- Cartaz, ou composição com as camadas. Texto alternativo do cartaz inteiro: veja o Anexo A.

### 5.2 Convite em vídeo
- `h2`: "Convite em vídeo"
- Texto: "Assista ao convite com Libras e legendas."
- Vídeo do YouTube via `youtube-nocookie.com`, com o ID em `config.js` (`[PREENCHER: ID do vídeo]`). O `iframe` leva o `title` "Vídeo convite da Sessão Acessível de Crime Sem Castigo, com Libras e legendas". Ele só carrega depois de um clique na capa, que é um botão com texto.
- Logo abaixo, um `details` com o `summary` "Descrição do vídeo (audiodescrição em texto)" e o texto do Anexo B.

### 5.3 O filme
- `h2`: "O filme"
- Sinopse oficial, sem alterar o texto:
  > Baseado em fatos reais, CRIME SEM CASTIGO revela a vida clandestina do médico nazista Josef Mengele, durante os 18 anos em que viveu no Brasil (1961-1979). Acusado pela morte de 400.000 pessoas no campo de concentração de Auschwitz, o criminoso de guerra mais procurado do mundo, outrora um carrasco a sangue frio, se torna um fugitivo paranoico movido por um objetivo singular e primordial: sobreviver a qualquer custo.
- Ficha, em `dl`:
  - Gênero: ficção, drama
  - Duração: 105 minutos
  - Direção: Luiz Alberto Pereira
  - Roteiro: Paulo Marcelo do Vale e Luiz Alberto Pereira
  - Produção: Lapfilme
  - Elenco: Peter Ketnath, Fabiana Gugli, Petrônio Gontijo, Miguel Giunchetti, Gustavo Morôni, André Hendges, Wolfgang Pannek, Martha Meola e Frederico Vittola
  - Classificação indicativa: 16 anos
- Subseção "Personagens": cards com imagem (texto alternativo descritivo), nome do personagem, intérprete e um breve descritivo. **Conteúdo `[PREENCHER]`**: a Lapfilme envia nome, descritivo, intérprete e imagem. Monte o componente com 3 cards de exemplo marcados `[PREENCHER]`.

### 5.4 A sessão
- `h2`: "Acessibilidade na sessão"
- Texto de abertura: "Os recursos de acessibilidade estarão abertos para todo o público, direto na tela e no som da sala."
- Três cards:
  - **AD · Audiodescrição:** "A narração das informações visuais do filme sai no som da sala."
  - **LSE · Legendas descritivas:** "Falas, sons e músicas aparecem em legendas na tela."
  - **LIBRAS · Língua Brasileira de Sinais:** "A interpretação em Libras aparece na tela."
- Bloco "No local": "Uma equipe da Iguale recebe o público, com atendimento em Libras. A abertura e o bate-papo têm interpretação em Libras e audiodescrição ao vivo."

### 5.5 Programação
- `h2`: "Programação"
- Lista com horários (use `<time>`):
  - **9h30:** abertura da casa e recepção
  - **10h:** boas-vindas e exibição do filme (105 minutos)
  - **Depois do filme:** bate-papo sobre acessibilidade no cinema (cerca de 30 minutos)

### 5.6 Local
- `h2`: "Local"
- "Espaço Petrobras de Cinema – Sala 1"
- "Rua Augusta, 1475 – Consolação, São Paulo (SP)", com o link "Abrir o endereço no Google Maps (abre em nova aba)".
- Acessibilidade do local:
  - "A sala tem 241 lugares, incluindo 5 espaços reservados para pessoas em cadeira de rodas." `[CONFIRMAR: se esses números são da sala 1]`
  - "Acesso e banheiro acessível: `[PREENCHER]`"
  - "Como chegar de transporte público: `[PREENCHER]`"

### 5.7 Inscrição
- `h2`: "Inscrição"
- "A entrada é gratuita, com inscrição prévia. As vagas são limitadas."
- "Cada pessoa faz a própria inscrição, inclusive acompanhantes."
- "Depois de enviar o formulário, você recebe um e-mail de confirmação."
- "Tem combo de pipoca e refrigerante gratuito."
- Botão "Fazer inscrição". Se `inscricoesAbertas` for `false`, o botão some e entra o aviso "As inscrições estão encerradas."

### 5.8 Dúvidas frequentes
`h2` "Dúvidas frequentes", com `details` e `summary` (acessíveis por teclado sem JavaScript):
- **Quem pode se inscrever?** A sessão é aberta a todo o público, com atenção especial às pessoas com deficiência.
- **Acompanhantes precisam se inscrever?** Sim. Cada pessoa faz a própria inscrição, incluindo acompanhantes.
- **A inscrição tem custo?** Não. A entrada é gratuita.
- **Como sei que minha inscrição foi feita?** Você recebe um e-mail de confirmação logo depois de enviar o formulário. Se não encontrar, confira a caixa de spam ou lixo eletrônico.
- **A que horas devo chegar?** A casa abre às 9h30, e a sessão começa às 10h.
- **Qual é a classificação indicativa?** 16 anos.
- **O cinema tem espaço para cadeira de rodas?** Sim, a sala tem espaços reservados. Informe no formulário se você usa cadeira de rodas, para a equipe organizar o seu lugar.
- **Preciso levar alguma coisa?** `[PREENCHER: documento na entrada?]`
- **A sessão vai ser gravada?** Sim. Teremos fotos e vídeos no local para a divulgação da sessão. Ao se inscrever, você autoriza o uso da sua imagem e da sua voz nessas gravações. `[CONFIRMAR: texto final com o jurídico]`

### 5.9 Contato
- "Ficou com alguma dúvida? Fale com a gente: `[PREENCHER: e-mail e/ou WhatsApp]`"
- O link do iCom fica visível aqui também.

### 5.10 Rodapé
- **Régua de logos obrigatória**, com texto alternativo em cada logo: Lapfilme · Governo do Estado de São Paulo – Secretaria da Cultura, Economia e Indústria Criativas · Lei Paulo Gustavo · Ministério da Cultura. A Lapfilme ainda vai mandar os arquivos e as regras; inclua também a Iguale e o Espaço Petrobras de Cinema se forem aprovados. Use `[PREENCHER]` com caixas do tamanho certo até os arquivos chegarem.
- Texto: "Produzido com recursos da Lei Paulo Gustavo – Governo Federal, Ministério da Cultura e Governo do Estado de São Paulo, por meio da Secretaria da Cultura, Economia e Indústria Criativas."
- "Página desenvolvida pela Iguale Digital" · link "Acessibilidade desta página" · "Voltar ao início da página".

## 6. Página de inscrição (`inscricao/index.html`)

**Topo:**
- Link "← Voltar para a página da sessão".
- Sobretítulo: "Sessão Acessível · 15 de novembro de 2026".
- `h1`: "Inscrição para a Sessão Acessível de Crime Sem Castigo".
- Texto: "Preencha o formulário para garantir a sua vaga. A entrada é gratuita, e cada pessoa faz a própria inscrição."
- "Campos marcados com * são obrigatórios."

**Campos** (`name` entre parênteses; todos com `label` visível, sem depender de placeholder):

| Campo | Tipo | Regras |
|---|---|---|
| Nome completo* (`nome`) | text | `autocomplete="name"`, mínimo de 2 palavras |
| CPF* (`cpf`) | text | `inputmode="numeric"`; máscara 000.000.000-00 que não trava a digitação nem a colagem; valida os dígitos verificadores; envia só números |
| E-mail* (`email`) | email | `autocomplete="email"` |
| Telefone com DDD* (`telefone`) | tel | `autocomplete="tel"`; dica "Somente números, com DDD."; envia só números |
| Quais recursos de acessibilidade você vai utilizar?* (`recursos`) | `fieldset` de checkboxes | Audiodescrição (AD) · Legendas descritivas (LSE) · Libras · **Não preciso de recursos de acessibilidade**. Pelo menos uma opção. Marcar "Não preciso" desmarca as outras, e marcar outra desmarca "Não preciso"; anuncie a mudança num `aria-live`. |
| Você tem alguma necessidade de acesso? (`necessidades`) | `fieldset` de checkboxes, opcional | Uso cadeira de rodas · Tenho mobilidade reduzida · Vou com cão-guia · Outra. Dica: "A sala tem espaços reservados para cadeira de rodas. Essa informação ajuda a equipe a organizar o seu lugar." Se "Outra" estiver marcada, mostrar o campo "Conte qual" (`necessidade_outra`). |
| Como você soube da sessão? (`como_soube`) | select, opcional | Instagram · WhatsApp · E-mail · Instituição ou associação · Indicação · Outro |
| Consentimento* (`consentimento_lgpd`) | checkbox | "Li e concordo com o uso dos meus dados para a organização desta sessão, conforme o aviso de privacidade." `[PREENCHER: texto final e link do aviso de privacidade]` |
| Autorização de imagem e voz* (`autorizacao_imagem_voz`) | checkbox, obrigatório | "Autorizo o uso da minha imagem e da minha voz, captadas em fotos e vídeos durante a sessão, na divulgação da Sessão Acessível pela Lapfilme e pela Iguale." `[CONFIRMAR: texto final com o jurídico, incluindo quem recebe a autorização e por quanto tempo]`. Mensagem de erro: "Para concluir a inscrição, marque a autorização de uso de imagem e voz." |
| (anti-spam) `site` | text escondido | campo-armadilha fora da tela, com `tabindex="-1"` e `aria-hidden="true"`. **Nada de CAPTCHA visual.** |

**Quadro "Informações importantes"** (antes do botão):
- Domingo, 15/11/2026. A casa abre às 9h30, e a sessão começa às 10h.
- Espaço Petrobras de Cinema, sala 1 – Rua Augusta, 1475, São Paulo.
- Combo de pipoca e refrigerante gratuito.
- Classificação indicativa: 16 anos.
- A sessão terá fotos e vídeos para divulgação.
- Você recebe um e-mail confirmando a inscrição. Se não encontrar, confira a caixa de spam.

**Botões:** "Enviar inscrição" e o link "Cancelar e voltar".

**Validação e erros** (padrão acessível):
- Valide ao enviar, não a cada tecla.
- Se houver erro, mostre no topo um resumo com `role="alert"`, com o título "Corrija os campos abaixo" e links para cada campo. O foco vai para o resumo.
- Cada campo com erro leva `aria-invalid="true"` e uma mensagem ligada por `aria-describedby`, por exemplo "Digite um CPF válido, com 11 números."
- Durante o envio, o botão fica desabilitado com o texto "Enviando…" e um `aria-live="polite"` anuncia o andamento.

**Estados depois do envio** (o formulário some e o foco vai para o `h2` da mensagem):
- **ok:** "Inscrição recebida!" + "Enviamos um e-mail de confirmação para {email}. Se não encontrar, confira a caixa de spam." + link "Voltar para a página da sessão".
- **cpf_duplicado:** "Este CPF já tem inscrição para esta sessão. Se não recebeu o e-mail de confirmação, fale com a gente: `[PREENCHER: contato]`."
- **esgotado:** "As vagas para esta sessão estão esgotadas. Obrigado pelo interesse!"
- **invalido:** volta ao formulário e mostra os erros que o servidor mandou no resumo.
- **erro:** "Não conseguimos enviar a sua inscrição agora. Tente de novo em alguns minutos ou fale com a gente: `[PREENCHER: contato]`." O formulário continua preenchido.

## 7. Contrato com o back-end

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

- **`recursos`:** quando a pessoa não precisa de recursos, envia `["nenhum"]`.
- **Respostas esperadas:**
  - `201` `{"status":"ok"}`
  - `409` `{"status":"cpf_duplicado"}`
  - `410` `{"status":"esgotado"}`
  - `422` `{"status":"invalido","campos":{"email":"mensagem"}}`
  - qualquer outra resposta ou falha de rede: estado **erro**.
- **Exemplo de dados:** o exemplo acima é fictício e serve só para mostrar o formato.
- **Responsabilidade do back-end:** gravar a inscrição, controlar CPF duplicado e o limite de vagas, e enviar o e-mail de confirmação do Anexo C.
- **README:** documente esse contrato em `README.md` para a equipe de desenvolvimento.

## 8. Acessibilidade obrigatória (WCAG 2.2 AA)

- `lang="pt-BR"`, `title` específico em cada página e links de atalho para o conteúdo e o menu no topo.
- Hierarquia de títulos sem saltos, landmarks e listas reais.
- Tudo funciona só com teclado, com foco sempre visível (contorno de pelo menos 2 px com contraste) e sem armadilha de foco.
- Áreas de toque de pelo menos 24×24 px (ideal 44×44).
- A página funciona com zoom de 200% e em telas de 320 px de largura, sem rolagem horizontal.
- Imagens informativas com texto alternativo e imagens decorativas com `alt=""`.
- Ícones de recurso sempre acompanhados de texto.
- Links dizem para onde levam, sem "clique aqui". Links que abrem nova aba avisam no próprio texto.
- O vídeo tem legendas, Libras e descrição em texto.
- Nada pisca mais de 3 vezes por segundo, e nada se move sozinho por mais de 5 segundos.
- Teste com axe (sem erros), Lighthouse Acessibilidade (meta: 100), NVDA ou VoiceOver nas duas páginas e navegação só por teclado no formulário inteiro.

**Terminologia:**
- Use: "Libras" (é uma língua), "pessoa com deficiência", "pessoa cega", "pessoa surda", "audiodescrição", "legendas descritivas".
- Nunca use: "portador de deficiência", "deficiente", "pessoas especiais", "linguagem de sinais".
- Nada de texto inteiro em caixa alta no HTML. Se quiser caixa alta, use `text-transform` no CSS.

## 9. SEO e compartilhamento

- `title`: "Sessão Acessível · Crime Sem Castigo · 15/11 · Iguale"
- `meta description`: "Sessão gratuita de Crime Sem Castigo com audiodescrição, Libras e legendas descritivas abertas, no Espaço Petrobras de Cinema, em 15/11/2026. Faça sua inscrição."
- Open Graph e Twitter Card com imagem 1200×630 feita a partir do cartaz, com `og:image:alt`.
- Favicon `[PREENCHER: usar o da Iguale]`.

## 10. Pendências que ficam como marcador

| Marcador | O que falta | Pendência da planilha |
|---|---|---|
| Logos e crédito da Iguale | arquivos e regras de aplicação | P05 |
| ID do vídeo no YouTube | vídeo convite publicado | V1 |
| Autodescrição do(a) intérprete | texto do Anexo B | V1 |
| Personagens | nome, descritivo, intérprete e imagem | P22 |
| Acesso e banheiro acessível; transporte | informações do cinema | P03 |
| Capacidade da sala 1 | confirmar 241 lugares e 5 espaços | P03 |
| Contato para dúvidas | e-mail e/ou WhatsApp | P11 |
| Aviso de privacidade e autorização de imagem e voz | textos finais do jurídico | P16 |
| Link do iCom da Iguale | URL | — |
| Endpoint do back-end | URL | P09 |
| Título em Braille | validação por revisor(a) | P34 |
| O que levar no dia | documento na entrada? | — |

---

## Anexo A · Texto alternativo do cartaz

> Cartaz do filme Crime Sem Castigo. Em preto e branco, o rosto sério de um homem de cabelo escuro, com camisa branca e gravata escura, ocupa o alto do cartaz. Abaixo dele, dois homens de camisa clara: à esquerda, um de bigode escuro e expressão séria; à direita, outro de cabelo e bigode grisalhos, que sorri olhando para cima. Ao fundo, mata e uma casa antiga com telhado de barro. No alto, "Lapfilme apresenta". O título, "Crime Sem Castigo", está em letras brancas, com o S de "sem" em forma de raio vermelho. Abaixo, "A vida clandestina de um médico nazista" e "Um filme de Luiz Alberto Pereira". No rodapé, o elenco, a ficha técnica e os logos de Lapfilme, Governo do Estado de São Paulo – Secretaria da Cultura, Economia e Indústria Criativas, Lei Paulo Gustavo e Ministério da Cultura.

Se a abertura usar as camadas separadas, a camada do título leva `alt="Crime Sem Castigo"`, e as fotos levam descrições curtas tiradas deste texto.

## Anexo B · Descrição do vídeo convite (para o `details`)

> Vídeo horizontal. À esquerda, sobre fundo claro, `[PREENCHER: autodescrição do(a) intérprete]` apresenta o convite em Libras, com legendas em uma faixa logo abaixo. À direita, o cartaz do filme Crime Sem Castigo: em preto e branco, o rosto sério de um homem de camisa branca e gravata; abaixo, dois homens de camisa clara, um de bigode, sério, e outro grisalho, sorrindo; ao fundo, mata e uma casa antiga. O título está em letras brancas, com o S de "sem" em forma de raio vermelho. No rodapé, os logos da Lapfilme, do Governo do Estado de São Paulo, da Lei Paulo Gustavo e do Ministério da Cultura.
>
> Texto do convite: "Olá! A Lapfilme e a Iguale convidam você para a Sessão Acessível do filme Crime Sem Castigo, no domingo, 15 de novembro, às 10 horas da manhã, no Espaço Petrobras de Cinema, sala 1, Rua Augusta, 1475, em São Paulo. Baseado em fatos reais, Crime Sem Castigo revela a vida clandestina do médico nazista Josef Mengele nos 18 anos em que viveu no Brasil como um fugitivo movido por um objetivo: sobreviver a qualquer custo. O filme tem direção de Luiz Alberto Pereira. A sessão terá recursos abertos para todo o público: audiodescrição no som da sala, Libras e legendas descritivas na tela. Depois do filme, vamos bater um papo sobre acessibilidade no cinema. A entrada é gratuita e tem pipoca e refrigerante! As vagas são limitadas. Faça sua inscrição no site iguale.com.br/crimesemcastigo e receba a confirmação por e-mail. Chegue a partir das 9h30 para aproveitar com calma. Dúvidas? Acesse iguale.com.br/crimesemcastigo para mais informações. Classificação indicativa: 16 anos. Esperamos você! Nos encontramos no cinema."

O texto acima é o do roteiro do vídeo; se o roteiro mudar, atualize aqui.

## Anexo C · E-mail de confirmação (para a equipe de back-end)

Envie em texto real, com versão em texto simples, uma coluna, corpo com pelo menos 14 px e links descritivos.

**Assunto:** Inscrição confirmada: Sessão Acessível de Crime Sem Castigo
**Pré-cabeçalho:** Domingo, 15/11, às 10h, no Espaço Petrobras de Cinema

> Olá, {nome}!
>
> Sua inscrição para a Sessão Acessível de Crime Sem Castigo está confirmada.
>
> **Quando:** domingo, 15 de novembro de 2026. A casa abre às 9h30, e a sessão começa às 10h.
> **Onde:** Espaço Petrobras de Cinema, sala 1 – Rua Augusta, 1475 – Consolação, São Paulo (SP).
> **Recursos:** audiodescrição no som da sala, Libras e legendas descritivas na tela, abertos para todo o público. Depois do filme, bate-papo sobre acessibilidade no cinema.
> **Ingresso:** gratuito, com combo de pipoca e refrigerante.
> **Classificação indicativa:** 16 anos.
>
> Mais informações em iguale.com.br/crimesemcastigo.
> Dúvidas: `[PREENCHER: contato]`.
>
> Esperamos você!
> Lapfilme e Iguale
>
> `[régua de logos com texto alternativo]`
