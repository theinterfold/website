# SEO: seis decisões de copy

O trabalho de infraestrutura vai avançar — canonicals, robots.txt, sitemap,
404s a sério, dados estruturados. Nada disso muda uma palavra no site e não
precisa de decisão.

Estes seis precisam. Cada um com o que se ganha e o que se perde ao dizer não.

---

**1. Dizer que o Enclave é agora The Interfold**

Uma linha, no rodapé chega: `The Interfold was previously Enclave.`

Os docs já o dizem, o site não. Todos os modelos de IA treinados antes da mudança
conhecem o projeto como Enclave e não têm forma de ligar os dois nomes. Todo o
artigo, talk e citação publicada como Enclave é autoridade que o nome novo não
herda sem isto.

*Se não:* os dados estruturados já levam `alternateName: "Enclave"`, que faz a
ligação para as máquinas. Uma pessoa a ler a página continua sem saber.

---

**2. Título e description próprios para `/` e `/participate`**

Hoje as duas servem `The Interfold` e a mesma frase — indistinguíveis num
resultado de pesquisa. As do leilão já têm as suas.

| | proposta |
|---|---|
| `/` | `The Interfold · Infrastructure for Confidential Coordination` |
| `/participate` | `Participate · The Interfold` + uma frase sobre os três caminhos |

*Se não:* os canonicals já corrigem a parte que dizia ao Google que estas páginas
eram duplicados uma da outra. Os títulos é que ficam iguais.

---

**3. "Multiplayer privacy" ou "confidential coordination"?**

Pergunta, não proposta. A meta description do site diz *multiplayer privacy* —
frase que aparece **1 vez** em todo o site. *Confidential coordination* aparece
**13 vezes** e é o que a homepage, a página participate e os docs dizem.

Qualquer uma serve. As duas ao mesmo tempo não: quem decide sobre o que é este
site pesa a repetição, e neste momento são duas frases diferentes.

---

**4. Nomear a tecnologia algures no site**

FHE, zero-knowledge, MPC, E3: **zero ocorrências** na copy do site. Os docs
descrevem a stack toda; a porta de entrada não nomeia nada.

São os termos que alguém procura quando ainda não conhece o projeto. Uma frase na
secção do execution model chega.

*Se não:* os docs continuam a ter a informação e são indexáveis. Só não está na
página onde se decide se vale a pena continuar a ler.

---

**5. O título do leilão diz "Auction 2"**

O `<h1>` da mesma página diz `$FOLD Auctions are closed`, plural e a cobrir as
duas — foi deliberado. O título não acompanhou. Ficou como estava.

---

**6. llms.txt — escrito, não publicado**

Ficheiro markdown que descreve o protocolo para os crawlers que alimentam as IAs.
Importa aqui porque o site é uma app React e o GPTBot, o ClaudeBot e o
PerplexityBot não executam JavaScript — para eles todas as páginas do `www` estão
vazias.

São ~3 000 caracteres de prosa nova, escrita para ser **citada**. Precisa de
leitura antes de sair. Está em `seo/proposals/llms.txt`.

*Contrapeso honesto:* os docs e o blog são renderizados no servidor e já são
legíveis sem JavaScript. Isto é um resumo e um mapa, não a única cópia.
