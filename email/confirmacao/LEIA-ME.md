# E-mail de confirmação de inscrição – Sessão Acessível · Crime Sem Castigo

Para a equipe de back-end (Robson). Versão 1 · 28/10/2026 · Iguale.

Este e-mail é enviado logo depois que a pessoa se inscreve na página `iguale.com.br/crimesemcastigo/inscricao/` e o back-end responde `201 {"status":"ok"}`. Ele substitui o Anexo C do `CLAUDE.md` da landing page.

## Arquivos

| Arquivo | Uso |
|---|---|
| `confirmacao.html` | Versão HTML do e-mail, pronta para envio (uma coluna de 600 px, tabelas e estilos inline). |
| `confirmacao.txt` | Versão em texto simples. Envie junto com o HTML, na mesma mensagem (`multipart/alternative`). |
| `img/topo-1200.jpg` | Imagem de topo (1200 × 700, exibida a 600 px). |
| `img/icone-ad-96.png`, `img/icone-lse-96.png`, `img/icone-libras-96.png` | Ícones dos recursos (96 × 96, exibidos a 48 px). São decorativos (`alt=""`); o nome do recurso está sempre no texto. |
| `previa.html` | Prévia para aprovação. Não é enviada. |

O HTML tem cerca de 13 KB (o Gmail corta mensagens acima de 102 KB). As imagens somam cerca de 63 KB.

## Configuração do envio

| Campo | Valor |
|---|---|
| Remetente | `Lapfilme e Iguale <eventos@iguale.com.br>` |
| Responder para | `eventos@iguale.com.br` |
| Assunto | `Inscrição confirmada: Sessão Acessível de Crime Sem Castigo` |
| Pré-cabeçalho | `Domingo, 15/11, às 10h, no Espaço Petrobras de Cinema` (já está no início do `<body>` do HTML, escondido) |
| Destinatário | o e-mail informado no campo `email` do formulário |
| Formato | `multipart/alternative`, com `text/plain` (`confirmacao.txt`) e `text/html` (`confirmacao.html`), ambos em UTF-8 |

## Variáveis

Há uma só variável, presente no HTML e no texto simples: `{primeiro_nome}`.

- **Valor:** a primeira palavra do campo `nome` do formulário, como a pessoa digitou (mantendo maiúsculas, minúsculas e acentos).
- **Como obter:** tire os espaços do início e do fim de `nome` e pegue o trecho até o primeiro espaço. Exemplo: `"  Maria da Silva"` → `Maria`.
- **No HTML:** escape o valor antes de inserir (`&`, `<`, `>` e aspas), para não quebrar o código nem abrir brecha de injeção.
- **Campo vazio:** o formulário exige nome completo, então isso não deve acontecer. Se acontecer, a sugestão é trocar `Olá, {primeiro_nome}!` por `Olá!`.

## Onde publicar as imagens

Em um e-mail, as imagens só aparecem se estiverem num endereço público na internet (`https://`). Elas não vão anexadas.

- **Antes do primeiro envio,** os arquivos da pasta `img/` precisam estar publicados e abrindo no navegador.
- **Sugestão:** publique a pasta `email/` junto com a landing page. Assim as imagens ficam em `https://iguale.com.br/crimesemcastigo/email/confirmacao/img/`, que é a base provisória já usada no HTML.
- **Se você escolher outro endereço,** basta trocar essa base nos `src` das imagens do `confirmacao.html` (4 ocorrências: topo e três ícones). Nada mais precisa mudar.
- **Teste:** abra cada endereço no navegador antes de enviar o primeiro e-mail.

## Links

Todos os links levam as UTMs `utm_source=email-confirmacao&utm_medium=email&utm_campaign=sessao-acessivel-csc`, para separar esse tráfego do e-mail marketing (`utm_source=mailchimp`). As âncoras usadas (`#local`, `#audiodescricao-app` e `#duvidas`) existem na landing page.

## Acessibilidade e compatibilidade

- `lang="pt-BR"`, `title` próprio, títulos `h1`, `h2` e `h3` de verdade, corpo em Arial com 16 px e entrelinha 1,5.
- Todas as combinações de cor passam no AA: papel sobre grafite (14,8:1), papel sobre sépia escuro (10,7:1), grafite sobre papel (14,8:1), grafite sobre areia (9,1:1), branco sobre vermelho no botão (6,5:1) e areia sobre grafite no rodapé (9,1:1).
- O botão tem 52 px de altura e ocupa a largura toda no celular.
- **Modo escuro:** o HTML declara `color-scheme: light only`, e o Apple Mail mantém as cores originais. O Gmail no celular pode inverter as cores mesmo assim; por isso os ícones têm fundo claro próprio e continuam visíveis. A prévia tem uma simulação dessa inversão.
- **Outlook para Windows:** o botão usa `mso-padding-alt` e a coluna fica travada em 600 px por comentários condicionais.
- Emoji só no início das linhas de serviço. O texto simples não tem emoji nem ícones.

## Pendências

- `[CONFIRMAR: endereço público das imagens – Robson]`: confirmar onde as imagens ficam publicadas (veja "Onde publicar as imagens").
- `[CONFIRMAR: envio em multipart/alternative, com HTML e texto simples na mesma mensagem – Robson]`.
- `[CONFIRMAR: o remetente eventos@iguale.com.br está autenticado (SPF, DKIM e DMARC) no serviço de envio – Robson]`, para o e-mail não cair no spam.
