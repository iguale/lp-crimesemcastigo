# E-mail marketing – Sessão Acessível · Crime Sem Castigo

Instruções para montar o e-mail no Claude Code. Versão 1 · 25/10/2026 · Iguale. Rascunho para aprovação (Murillo → Luiz, da Lapfilme).

**Como usar:** cole este texto inteiro na mesma sessão do Claude Code em que a landing page foi feita, porque ela já tem as camadas do cartaz, os ícones e os logos. Termine a mensagem com:
> Leia estas instruções e monte o e-mail marketing. Antes de gerar as imagens, me mostre o plano das entregas e do layout.

Tudo o que está marcado com `[PREENCHER]` ou `[CONFIRMAR]` ainda não foi definido. **Não invente esses dados.** Deixe o marcador visível na prévia e liste todos no fim do `montagem-mailchimp.md`.

---

## 1. O que é

- **Peça:** um único e-mail convite, enviado para a lista inteira: público final, instituições, associações e parceiros. Ele substitui os itens L4 e L5 da planilha.
- **Objetivo:** que a pessoa abra o e-mail, faça a inscrição na landing page e repasse o convite.
- **Remetente:** "Iguale e Lapfilme". E-mail de resposta: `[PREENCHER: e-mail de resposta]`.
- **Ferramenta:** Mailchimp, plano gratuito.
- **Vídeo:** o vídeo convite entra só no segundo envio (L6). Não mencione vídeo neste e-mail.

## 2. Limites do Mailchimp gratuito (definem o formato)

- **O plano gratuito não envia template em código próprio.** O Mailchimp deixa criar, mas pede upgrade para enviar. Por isso, o e-mail é montado com os blocos do próprio editor do Mailchimp (Imagem, Texto, Botão, Divisor e Rodapé). O HTML que você gerar serve de **prévia para aprovação** e de **guia de montagem**. Ele não é o arquivo que vai para o Mailchimp.
- **Envio:**
  - Até 250 contatos e 500 envios por mês, com no máximo 250 por dia.
  - Não dá para agendar: o envio é manual.
  - Não tem teste A/B.
  - O selo do Mailchimp aparece no rodapé.
- **Consequência para o layout:** use só o que o editor do Mailchimp consegue reproduzir. Isso significa uma coluna, blocos empilhados, cor de fundo por bloco, texto com estilos de título e parágrafo, botões nativos e imagens. Nada de colunas lado a lado, fundo com imagem ou fonte que o editor não ofereça.

## 3. Entregas (pasta `email/`)

### 3.1 Imagens

1. **`topo-1200.jpg`:** cerca de 1200 × 700 px, exibida a 600 px. É uma composição com as camadas do cartaz usadas na abertura da LP: o rosto central em tons sépia e o título "Crime Sem Castigo" (camada do título).
   - Pode ter "Lapfilme apresenta".
   - **Data, local, recursos e chamadas ficam fora da imagem**, sempre em texto real.
   - JPG com até 200 KB.
2. **`regua-logos-1200.png`:** a régua de logos numa imagem só, na mesma ordem e com os mesmos rótulos do rodapé da LP ("Uma produção", "Realização"). Escolha o fundo pelo contraste dos arquivos de logo, sem distorcer nenhum.
3. **Ícones AD, LSE e Libras (opcional):** PNG de 96 px, exibidos a 48 px, só se o editor permitir colocá-los ao lado do texto. São decorativos (texto alternativo vazio), e o nome do recurso sempre aparece em texto.
4. **Ilustração da pipoca e dos ingressos (opcional):** a mesma da LP, em PNG com até 600 px, decorativa, no bloco de inscrição.

### 3.2 `previa.html`

- **O que é:** o e-mail completo, igual ao que será montado no Mailchimp.
- **Layout:** uma coluna de 600 px, montada em tabelas com `role="presentation"` e estilos inline.
- **Atributos:** `lang="pt-BR"` e `title` "Convite – Sessão Acessível de Crime Sem Castigo".
- **Publicação:** publique como página privada no claude.ai, no mesmo esquema da LP, e atualize o mesmo link a cada ajuste.
- **Seção "Arquivos para o Mailchimp":** fica depois do e-mail, separada dele por uma faixa. Tem um link para baixar cada imagem e o `texto-simples.txt`.

### 3.3 `montagem-mailchimp.md`

Passo a passo para montar o e-mail no editor do Mailchimp.

- **Configuração da campanha:**
  - nome da campanha;
  - remetente, com o e-mail de resposta;
  - assunto;
  - pré-cabeçalho (o campo "Preview text");
  - lista de destinatários.
- **Cada bloco, em ordem:**
  - tipo de bloco;
  - conteúdo exato, para copiar e colar;
  - estilo de texto (Título 1, Título 2 ou Parágrafo);
  - cor de fundo e cor do texto, em hexadecimal;
  - tamanho da fonte, alinhamento e espaçamento;
  - link;
  - texto alternativo da imagem.
- **Teste:** como mandar o e-mail de teste para dois endereços (um Gmail e um Outlook ou iPhone).
- **Checklist antes do envio**, que está na seção 8.

### 3.4 `texto-simples.txt`

A versão em texto simples do e-mail. Ela vai na aba de texto simples do Mailchimp, no lugar da versão gerada automaticamente.

## 4. Visual

- **Identidade:** a mesma da LP. O foco é o cartaz, com clima de cinema, sóbrio, em sépia e grafite.
- **Paleta (da LP):**

| Token | Cor | Uso no e-mail |
|---|---|---|
| grafite | `#1E1C1A` | fundo do topo, do bloco de abertura e do rodapé |
| sépia escuro | `#3A342E` | fundo de destaque (bloco de inscrição) |
| areia | `#C9BCA4` | fundo dos botões (texto grafite: 9,1:1) |
| papel | `#F2EFE8` | texto sobre fundo escuro (14,8:1) e fundo dos blocos de informação |
| vermelho | `#B3261E` | não usar no e-mail |

- **Sequência sugerida de fundos:**
  1. Topo e abertura em grafite.
  2. "O filme" em papel.
  3. "Acessibilidade" em papel.
  4. "Anote na agenda" em sépia escuro.
  5. "Como garantir sua vaga" em papel.
  6. "Conhece alguém?" em papel.
  7. Régua e rodapé.

  Pode ajustar a sequência, desde que todas as combinações de cor passem no AA (confira e anote o contraste de cada uma no `montagem-mailchimp.md`).
- **Fontes:**
  - Corpo em Arial ou Helvetica, com 16 px (nunca menos de 14 px) e entrelinha 1,5.
  - Títulos em Oswald, se estiver na lista de fontes do editor do Mailchimp. Se não estiver, use Arial em negrito. A prévia usa a mesma fonte que será possível no Mailchimp.
- **Botões:**
  - Fundo areia, texto grafite em negrito com 16 px e área de toque de pelo menos 44 px de altura.
  - No celular, o botão ocupa a largura toda.
- **Regras:**
  - O raio vermelho do título fica só dentro da imagem do cartaz.
  - Nada de texto vermelho.
  - Nenhuma informação depende só de cor.
- **Modo escuro:** confira a prévia simulando o modo escuro do Gmail e do Apple Mail. Logos, botões e textos precisam continuar legíveis.
- **Peso:** HTML final com menos de 100 KB, para o Gmail não cortar o e-mail, e imagens somadas abaixo de 600 KB.

## 5. Texto final (para aprovação)

### 5.1 Assunto e pré-cabeçalho

Três opções. A recomendada é a A.

| | Assunto | Pré-cabeçalho | Diferença |
|---|---|---|---|
| **A** | Um convite para você: cinema acessível em 15/11 | Crime Sem Castigo com audiodescrição, Libras e legendas descritivas. Entrada gratuita. | convite pessoal |
| B | A vida clandestina de um médico nazista no Brasil | Sessão gratuita e acessível de Crime Sem Castigo, domingo, 15/11, em São Paulo. | curiosidade pela história |
| C | Cinema gratuito, com pipoca, em 15/11: vagas limitadas | Sessão de Crime Sem Castigo com Libras e legendas descritivas na tela e audiodescrição pelo app. | benefício e urgência |

### 5.2 Corpo, bloco a bloco

**Bloco 1 · Imagem de topo** (`topo-1200.jpg`, com link para a página da sessão)
- **Texto alternativo**, a ajustar à composição final, com todo o texto da imagem entre aspas: "Crime Sem Castigo. Título em letras brancas, com o S de “sem” em forma de raio vermelho, ao lado da imagem do cartaz: em tons sépia, o rosto sério de um homem em preto e branco, de camisa branca e gravata escura."

**Bloco 2 · Abertura** (fundo grafite)
- **Sobretítulo** (texto pequeno): "Lapfilme apresenta"
- **Título 1:** "Sessão Acessível de Crime Sem Castigo"
- **Linha de serviço:** "Domingo, 15 de novembro, às 10h · Espaço Petrobras de Cinema · São Paulo"
- **Parágrafo:** "Olá! A Lapfilme e a Iguale convidam você para uma sessão de cinema com Libras e legendas descritivas na tela e audiodescrição pelo app MovieReading. A entrada é gratuita, com pipoca e refrigerante."
- **Botão:** "Fazer minha inscrição gratuita" → link de inscrição
- **Nota abaixo do botão:** "As vagas são limitadas."

**Bloco 3 · O filme**
- **Título 2:** "O filme"
- **Parágrafo:** "Baseado em fatos reais, Crime Sem Castigo revela a vida clandestina do médico nazista Josef Mengele nos 18 anos em que viveu no Brasil, como um fugitivo movido por um objetivo: sobreviver a qualquer custo."
- **Linha:** "Direção de Luiz Alberto Pereira · 105 minutos · Classificação indicativa: 16 anos"
- **Link:** "Leia a sinopse completa e a ficha técnica na página da sessão" → link do filme

**Bloco 4 · Acessibilidade**
- **Título 2:** "Acessibilidade na sessão"
- **Parágrafo:** "Libras e legendas descritivas ficam abertas para todo o público, direto na tela. A audiodescrição fica no app MovieReading:"
- **Lista:**
  - "**Audiodescrição pelo app MovieReading:** a narração das imagens e do contexto visual do filme, para ouvir no próprio celular, com fone de ouvido."
  - "**Legendas descritivas:** falas, ruídos, músicas e outros sons aparecem em legendas na tela."
  - "**Libras:** a interpretação em Língua Brasileira de Sinais aparece na tela."
- **Destaque** (logo depois da lista, com fundo diferente, no estilo dos outros destaques do e-mail):
  - **Título:** "Vai usar a audiodescrição?"
  - **Texto:** "Antes da sessão, baixe o app MovieReading e a audiodescrição do filme. No dia, traga seu fone de ouvido."
  - **Link:** "Veja o passo a passo na página da sessão" → página da sessão + `#audiodescricao-app`
- **Parágrafo:** "Depois do filme, vamos bater um papo sobre acessibilidade no cinema. A abertura e o bate-papo têm interpretação em Libras e audiodescrição ao vivo, e a equipe da Iguale recebe o público com atendimento em Libras."
- **Crédito** (texto menor): "Os recursos de acessibilidade desta sessão foram produzidos pela Iguale."

**Bloco 5 · Serviço** (fundo sépia escuro)
- **Título 2:** "Anote na agenda"
- **Linhas** (emoji só no início de cada linha, como no arquivo 04):
  - "📅 Domingo, 15 de novembro de 2026"
  - "⌚ A casa abre às 9h30, e a sessão começa às 10h. Depois do filme, bate-papo de cerca de 30 minutos."
  - "📍 Espaço Petrobras de Cinema, sala 1 – Rua Augusta, 1475 – Consolação, São Paulo (SP)"
  - "🎟️ Entrada gratuita, com inscrição prévia e combo de pipoca e refrigerante."
  - "Classificação indicativa: 16 anos."
- **Parágrafo:** "A sala tem espaços reservados para pessoas em cadeira de rodas. Se você usa cadeira de rodas, informe na inscrição para a equipe organizar o seu lugar."
- **Link:** "Veja como chegar de transporte público na página da sessão" → link do local

**Bloco 6 · Inscrição**
- **Título 2:** "Como garantir sua vaga"
- **Lista numerada:**
  1. "Acesse a página da sessão e preencha o formulário."
  2. "Cada pessoa faz a própria inscrição, inclusive acompanhantes."
  3. "Você recebe a confirmação por e-mail. Se não encontrar, confira a caixa de spam."
- **Botão:** "Fazer minha inscrição gratuita" → link de inscrição
- **Ilustração:** da pipoca e dos ingressos, opcional, com texto alternativo vazio.

**Bloco 7 · Compartilhar**
- **Título 2:** "Conhece alguém que vai gostar?"
- **Parágrafo:** "Encaminhe este convite para amigos, familiares, colegas e para a instituição ou associação de que você participa. Para compartilhar, use o endereço iguale.com.br/crimesemcastigo."

**Bloco 8 · Régua de logos** (`regua-logos-1200.png`)
- **Texto alternativo:** "Uma produção Lapfilme. Governo do Estado de São Paulo – Secretaria da Cultura, Economia e Indústria Criativas. Realização: Lei Paulo Gustavo e Ministério da Cultura. Iguale. Espaço Petrobras de Cinema." `[CONFIRMAR: regras de aplicação da régua – P05]`
- **Texto** (menor): "Produzido com recursos da Lei Paulo Gustavo – Governo Federal, Ministério da Cultura e Governo do Estado de São Paulo, por meio da Secretaria da Cultura, Economia e Indústria Criativas."

**Bloco 9 · Rodapé** (fundo grafite)
- "Dúvidas? Fale com a gente: `[PREENCHER: e-mail e/ou WhatsApp – P11]`"
- "Siga a Iguale no Instagram: @iguale_acessibilidade" → https://www.instagram.com/iguale_acessibilidade/
- **Rodapé obrigatório do Mailchimp:**
  - "Você recebeu este e-mail porque `[PREENCHER: motivo – por exemplo, acompanha os projetos da Iguale]`."
  - Endereço da Iguale: Rua Girassol, 34, conjunto 73/74, São Paulo (SP).
  - Link de descadastro com o texto "Não quer mais receber nossos e-mails? Cancele a inscrição".

## 6. Links

Use o endereço final da LP com UTM, para saber quantas inscrições vieram do e-mail:

| Uso | Endereço |
|---|---|
| Página da sessão | `https://iguale.com.br/crimesemcastigo/?utm_source=mailchimp&utm_medium=email&utm_campaign=sessao-acessivel-csc` |
| Inscrição | `https://iguale.com.br/crimesemcastigo/inscricao/?utm_source=mailchimp&utm_medium=email&utm_campaign=sessao-acessivel-csc` |
| O filme | página da sessão + `#o-filme` |
| Local | página da sessão + `#local` |

`[CONFIRMAR: a LP precisa estar no ar nesse endereço antes do envio – P09]`

## 7. Acessibilidade obrigatória (arquivo 04, item 5)

- Texto real em todo o e-mail. Nunca o e-mail inteiro, ou um bloco de informação, em imagem.
- Toda imagem com texto alternativo. Imagens decorativas ficam com o texto alternativo vazio.
- Títulos com hierarquia real: no Mailchimp, use os estilos Título 1 e Título 2, não só negrito. Na prévia, use `h1` e `h2`.
- Botões com texto real e descritivo, sem "clique aqui".
- Uma coluna, corpo com pelo menos 14 px e contraste AA.
- Nada de frase inteira em maiúsculas. Emoji só no início das linhas de serviço.
- Versão em texto simples revisada.
- Terminologia: "Libras" (é uma língua), "pessoa com deficiência", "audiodescrição" e "legendas descritivas". Nunca "portador de deficiência", "deficiente", "pessoas especiais" ou "linguagem de sinais".

## 8. Checklist antes do envio (incluir no `montagem-mailchimp.md`)

1. A LP está no ar no endereço final, e a inscrição funciona com o back-end real (não em modo de teste).
2. Todos os `[PREENCHER]` e `[CONFIRMAR]` foram resolvidos.
3. O e-mail de teste foi aberto no Gmail e no celular, e todos os links foram clicados.
4. A versão em texto simples foi conferida.
5. A lista tem no máximo 250 contatos, todos com permissão para receber e-mails da Iguale.
6. Aprovação do Murillo e do Luiz.

## 9. Fora do escopo

- Não acesse o Mailchimp, não suba a lista e não envie nada: a montagem e o envio ficam com a Iguale.
- Não cite vídeo, aplicativo ou fone.
- Não inclua informações que não estejam neste arquivo ou na LP.
