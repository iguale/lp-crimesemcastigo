# Montagem no Mailchimp – Convite da Sessão Acessível · Crime Sem Castigo

Passo a passo para montar o e-mail convite no editor do Mailchimp (plano gratuito). Versão 1 · 05/11/2026 · Iguale.

## Antes de começar

- **O que é cada arquivo do pacote:**
  - `convite.pdf`: como o e-mail deve ficar. Use como referência visual.
  - `convite.html`: o mesmo e-mail em HTML. Abra no navegador para conferir cores, tamanhos e links. **Não importe este arquivo no Mailchimp:** o plano gratuito não envia template em código próprio, então o e-mail é montado com os blocos do editor (Imagem, Texto, Botão e Divisor), seguindo este documento.
  - `topo-1200.jpg` e `regua-logos-1200.png`: as duas imagens do e-mail. Suba as duas no "Content Studio" do Mailchimp.
  - `texto-simples.txt`: a versão em texto simples, para a aba "Plain-text".
- **Fonte:** Arial em todo o e-mail (títulos e corpo).
- **Largura:** uma coluna de 600 px. Nada de colunas lado a lado nem fundo com imagem.
- **Vermelho:** só nos botões e no traço sob os títulos, nunca em texto. O raio vermelho do título fica só dentro da imagem do cartaz.

## 1. Configuração da campanha

| Campo | Valor |
|---|---|
| Nome da campanha (interno) | `Sessão Acessível CSC – Convite – nov/2026` |
| Remetente ("From name") | `Iguale e Lapfilme` |
| E-mail do remetente / resposta ("From email address") | `[CONFIRMAR: e-mail de resposta – sugestão: eventos@iguale.com.br, o mesmo do e-mail de confirmação]` |
| Assunto ("Subject") | `Um convite para você: cinema acessível em 15/11` |
| Pré-cabeçalho ("Preview text") | `Crime Sem Castigo com audiodescrição, Libras e legendas descritivas. Entrada gratuita.` |
| Destinatários ("To") | a lista da Iguale com no máximo 250 contatos, todos com permissão para receber e-mails |

Rodapé obrigatório: o Mailchimp acrescenta sozinho o selo do plano gratuito, o endereço do remetente e o link de descadastro. Confira se o endereço cadastrado na lista é o da Iguale e se o lembrete de permissão ("Permission reminder") está preenchido. `[CONFIRMAR: texto do lembrete de permissão da lista]`

## 2. Cores

| Nome | Hexadecimal | Uso |
|---|---|---|
| Grafite | `#1E1C1A` | fundo do topo, da abertura e da régua; texto sobre fundos claros |
| Sépia escuro | `#3A342E` | fundo do bloco "Anote na agenda" |
| Sépia | `#5E5548` | divisores e textos menores sobre papel |
| Areia | `#C9BCA4` | fundo dos destaques; textos menores sobre grafite; filetes da linha de serviço |
| Papel | `#F2EFE8` | fundo dos blocos de informação; texto sobre fundos escuros |
| Vermelho | `#B3261E` | fundo dos botões e traço sob os títulos (nunca em texto) |
| Branco | `#FFFFFF` | título principal e texto dos botões |

**Contraste de cada combinação usada (todas passam no AA):**

| Texto | Fundo | Contraste |
|---|---|---|
| Branco `#FFFFFF` | Grafite `#1E1C1A` | 17,0:1 |
| Papel `#F2EFE8` | Grafite `#1E1C1A` | 14,8:1 |
| Areia `#C9BCA4` | Grafite `#1E1C1A` | 9,1:1 |
| Grafite `#1E1C1A` | Papel `#F2EFE8` | 14,8:1 |
| Sépia `#5E5548` | Papel `#F2EFE8` | 6,4:1 |
| Papel `#F2EFE8` | Sépia escuro `#3A342E` | 10,7:1 |
| Grafite `#1E1C1A` | Areia `#C9BCA4` | 9,1:1 |
| Branco `#FFFFFF` (botão) | Vermelho `#B3261E` | 6,5:1 |

## 3. Estilos de texto

| Estilo | Tamanho | Peso | Entrelinha |
|---|---|---|---|
| Título 1 (h1) | 38 px no computador, 24 px no celular | negrito | 1,15 |
| Título 2 (h2) | 22 px | negrito | 1,3 |
| Título 3 (h3) | 18 px | negrito | 1,3 |
| Parágrafo | 16 px | normal | 1,5 |
| Texto menor | 14 px | normal | 1,5 |

Use sempre os estilos Título 1, Título 2 e Título 3 do editor, não só negrito: eles viram títulos de verdade para leitores de tela.

Se o editor não permitir um tamanho diferente só para o celular, use 24 px no Título 1 nas duas versões. `[CONFIRMAR no editor]`

**Traço vermelho sob os títulos 2:** no HTML, cada Título 2 tem um traço vermelho de 4 px embaixo. No Mailchimp, reproduza com um bloco **Divisor** logo abaixo do título: cor `#B3261E`, espessura 4 px, sem espaço acima e com cerca de 16 px abaixo. Se o divisor só puder ocupar a largura toda, aumente o recuo lateral direito dele para encurtá-lo, ou deixe-o na largura do bloco. `[CONFIRMAR no editor]`

## 4. Blocos, em ordem

Recuo lateral padrão dos blocos de texto: 40 px (20 px no celular, se o editor permitir).

### Bloco 1 · Imagem de topo
- **Tipo:** Imagem, largura total (600 px), sem recuo.
- **Arquivo:** `topo-1200.jpg` (1200 × 700, exibida a 600 px).
- **Fundo do bloco:** `#1E1C1A`.
- **Link:** `https://iguale.com.br/crimesemcastigo/?utm_source=mailchimp&utm_medium=email&utm_campaign=sessao-acessivel-csc`
- **Texto alternativo:**
  > “Crime Sem Castigo”, em letras brancas, com o S de “sem” em forma de raio vermelho. Ao lado, em tons sépia, o rosto sério de um homem de cabelo escuro, com camisa branca e gravata escura.

### Bloco 2 · Abertura
- **Tipo:** Texto + Botão + Texto. Fundo `#1E1C1A`. Recuo: 32 px acima, 40 px abaixo.
- **Sobretítulo** (Parágrafo, 14 px, negrito, cor `#C9BCA4`):
  > Lapfilme apresenta
- **Título 1** (38 px, branco `#FFFFFF`). Quebre a linha depois de "filme" com Shift + Enter:
  > Sessão Acessível do filme
  > Crime Sem Castigo
- **Linha de serviço** (Parágrafo, 20 px no computador e 18 px no celular, negrito, cor `#F2EFE8`, com filete de 1 px `#C9BCA4` acima e abaixo e 12 px de espaço interno). Três linhas, separadas com Shift + Enter:
  > Domingo, 15 de novembro, às 10h
  > Espaço Petrobras de Cinema
  > São Paulo

  Se o editor não fizer o filete no texto, use um Divisor de 1 px `#C9BCA4` acima e outro abaixo.
- **Parágrafo** (16 px, `#F2EFE8`):
  > Olá! A Lapfilme e a Iguale convidam você para uma sessão de cinema com Libras e legendas descritivas na tela e audiodescrição pelo app MovieReading. A entrada é gratuita, com pipoca e refrigerante.
- **Botão:**
  - Texto: `Fazer minha inscrição gratuita`
  - Fundo `#B3261E`, texto `#FFFFFF` em negrito com 16 px, borda de 2 px `#FFFFFF`, cantos com 6 px, espaço interno de 14 px × 28 px (altura total de 52 px).
  - Alinhado à esquerda; no celular, largura total.
  - Link: `https://iguale.com.br/crimesemcastigo/inscricao/?utm_source=mailchimp&utm_medium=email&utm_campaign=sessao-acessivel-csc`
- **Nota** (Parágrafo, 14 px, `#C9BCA4`, 12 px acima):
  > As vagas são limitadas.

### Bloco 3 · O filme
- **Tipo:** Texto. Fundo `#F2EFE8`, texto `#1E1C1A`. Recuo: 40 px acima, 32 px abaixo.
- **Título 2:** `O filme` (+ traço vermelho).
- **Parágrafo** (16 px):
  > Baseado em fatos reais, Crime Sem Castigo revela a vida clandestina do médico nazista Josef Mengele nos 18 anos em que viveu no Brasil, como um fugitivo movido por um objetivo: sobreviver a qualquer custo.
- **Ficha** (14 px, cor `#5E5548`):
  > Direção de Luiz Alberto Pereira · 105 minutos · Classificação indicativa: 16 anos
- **Link** (16 px, negrito, sublinhado, `#1E1C1A`): `Leia a sinopse completa e a ficha técnica na página da sessão`
  → `https://iguale.com.br/crimesemcastigo/?utm_source=mailchimp&utm_medium=email&utm_campaign=sessao-acessivel-csc#o-filme`

### Divisor
- **Tipo:** Divisor. Linha de 1 px `#5E5548`, fundo `#F2EFE8`, recuo lateral de 40 px.

### Bloco 4 · Acessibilidade na sessão
- **Tipo:** Texto + Texto com fundo próprio + Texto. Fundo `#F2EFE8`, texto `#1E1C1A`. Recuo: 32 px acima e abaixo.
- **Título 2:** `Acessibilidade na sessão` (+ traço vermelho).
- **Parágrafo** (16 px):
  > Libras e legendas descritivas estarão abertas para todo o público, direto na tela. A audiodescrição estará disponível pelo app MovieReading, para ouvir no próprio celular, com fone de ouvido.
- **Destaque** (bloco de Texto com fundo `#C9BCA4`, texto `#1E1C1A`, espaço interno de 24 px; cantos com 6 px, se o editor permitir):
  - **Título 3:** `Vai usar a audiodescrição?`
  - **Parágrafo** (16 px):
    > Antes da sessão, baixe o app MovieReading e a audiodescrição do filme. No dia, traga seu fone de ouvido.
  - **Link** (16 px, negrito, sublinhado, `#1E1C1A`): `Veja o passo a passo na página da sessão`
    → `https://iguale.com.br/crimesemcastigo/?utm_source=mailchimp&utm_medium=email&utm_campaign=sessao-acessivel-csc#audiodescricao-app`
  - Se o fundo areia ocupar a largura toda, sem as margens papel dos lados, tudo bem: mantenha o espaço interno de 24 px.
- **Parágrafo** (16 px, 24 px acima):
  > Depois do filme, vamos bater um papo sobre acessibilidade no cinema.
- **Crédito** (14 px, cor `#5E5548`):
  > Os recursos de acessibilidade desta sessão foram produzidos pela Iguale.

### Divisor
- Igual ao anterior: 1 px `#5E5548`, fundo `#F2EFE8`, recuo lateral de 40 px.

### Bloco 5 · Garanta sua vaga
- **Tipo:** Texto + Botão. Fundo `#F2EFE8`, texto `#1E1C1A`. Recuo: 36 px acima, 40 px abaixo.
- **Título 2:** `Garanta sua vaga` (+ traço vermelho).
- **Lista numerada** (16 px):
  1. Acesse a página da sessão e preencha o formulário.
  2. Cada pessoa faz a própria inscrição, inclusive acompanhantes.
  3. Você recebe a confirmação por e-mail. Se não encontrar, confira a caixa de spam.
- **Botão:** igual ao do bloco 2 (`Fazer minha inscrição gratuita`, mesmo estilo e mesmo link), 28 px abaixo da lista.

### Bloco 6 · Anote na agenda
- **Tipo:** Texto. Fundo `#3A342E`, texto `#F2EFE8`. Recuo: 40 px acima, 44 px abaixo.
- **Título 2:** `Anote na agenda` (+ traço vermelho), em `#F2EFE8`.
- **Linhas** (Parágrafo, 16 px, 8 px entre elas). O emoji fica só no início da linha:
  > 📅 Domingo, 15 de novembro de 2026
  >
  > ⌚ O cinema abre às 9h30, e a sessão começa às 10h. Depois do filme, bate-papo de cerca de 30 minutos.
  >
  > 📍 Espaço Petrobras de Cinema, sala 1 – Rua Augusta, 1475 – Consolação, São Paulo (SP)
  >
  > 🎟️ Entrada gratuita, com inscrição prévia e combo de pipoca e refrigerante.
  >
  > Classificação indicativa: 16 anos.
- **Link** (16 px, negrito, sublinhado, `#F2EFE8`): `Veja como chegar de transporte público na página da sessão`
  → `https://iguale.com.br/crimesemcastigo/?utm_source=mailchimp&utm_medium=email&utm_campaign=sessao-acessivel-csc#local`

### Bloco 7 · Conhece alguém que vai gostar?
- **Tipo:** Texto + Texto com fundo próprio. Fundo `#F2EFE8`, texto `#1E1C1A`. Recuo: 40 px acima e abaixo.
- **Título 2:** `Conhece alguém que vai gostar?` (+ traço vermelho).
- **Parágrafo** (16 px):
  > Encaminhe este convite para amigos, familiares, colegas e para a instituição ou associação de que você participa. Para compartilhar, use o endereço:
- **Destaque** (bloco de Texto com fundo `#C9BCA4`, texto `#1E1C1A`, espaço interno de 24 px, 20 px acima):
  - Rótulo (14 px, negrito): `Página da sessão`
  - Endereço (26 px no computador e 18 px no celular, negrito, sublinhado, numa linha só): `iguale.com.br/crimesemcastigo`
    → `https://iguale.com.br/crimesemcastigo/?utm_source=mailchimp&utm_medium=email&utm_campaign=sessao-acessivel-csc`
  - Parágrafo (16 px):
    > Sinopse, ficha técnica, acessibilidade, programação, local e inscrição em um só lugar.
  - Se o editor não tiver tamanho só para o celular, use 18 px no endereço nas duas versões, para ele não quebrar.

### Bloco 8 · Régua de logos
- **Tipo:** Imagem, largura total (600 px). Fundo `#1E1C1A`, 16 px acima. Sem link.
- **Arquivo:** `regua-logos-1200.png` (1200 × 352, exibida a 600 px).
- **Texto alternativo:**
  > Uma produção Lapfilme. Governo do Estado de São Paulo – Secretaria da Cultura, Economia e Indústria Criativas. Realização: Lei Paulo Gustavo e Ministério da Cultura. Iguale. MovieReading. Espaço Petrobras de Cinema.
- **Texto** logo abaixo (bloco de Texto, fundo `#1E1C1A`, 14 px, cor `#C9BCA4`, recuo de 8 px acima, 28 px abaixo e 40 px nas laterais):
  > Produzido com recursos da Lei Paulo Gustavo – Governo Federal, Ministério da Cultura e Governo do Estado de São Paulo, por meio da Secretaria da Cultura, Economia e Indústria Criativas.

Depois deste bloco entra o rodapé automático do Mailchimp. Não acrescente outro rodapé.

## 5. Texto simples

Na etapa de conteúdo, abra a aba de texto simples ("Plain-text"), apague a versão gerada automaticamente e cole o conteúdo de `texto-simples.txt`.

## 6. Teste

1. Use "Send a test email" e mande para dois endereços: um Gmail e um Outlook ou iPhone.
2. Abra no computador e no celular. Confira as imagens, os títulos, os botões (largura total no celular) e o endereço da página numa linha só no celular.
3. Clique em todos os links e confira se abrem na seção certa da página da sessão.
4. No celular, ative o modo escuro e confira se logos, botões e textos continuam legíveis.

## 7. Checklist antes do envio

1. A página da sessão está no ar em `iguale.com.br/crimesemcastigo`, e a inscrição funciona com o back-end real (não em modo de teste).
2. Todos os `[CONFIRMAR]` deste documento foram resolvidos.
3. O e-mail de teste foi aberto no Gmail e no celular, e todos os links foram clicados.
4. A versão em texto simples foi conferida.
5. A lista tem no máximo 250 contatos, todos com permissão para receber e-mails da Iguale. O plano gratuito envia até 250 por dia e 500 por mês, e o envio é manual (sem agendamento).
6. Aprovação do Murillo e do Luiz.

## 8. Pendências

- `[CONFIRMAR: e-mail de resposta – sugestão: eventos@iguale.com.br]`
- `[CONFIRMAR: texto do lembrete de permissão da lista]`
- `[CONFIRMAR no editor]`: tamanho de fonte só para o celular (Título 1, linha de serviço e endereço da página).
- `[CONFIRMAR no editor]`: traço vermelho sob os títulos 2 (Divisor encurtado ou na largura do bloco).
