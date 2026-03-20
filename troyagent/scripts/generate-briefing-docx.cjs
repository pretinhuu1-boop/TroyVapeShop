const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  HeadingLevel, BorderStyle, WidthType, ShadingType,
  PageNumber, PageBreak
} = require("docx");
const fs = require("fs");

// ── TAURA TOKENS ──
const BLACK = "0A0A0A";
const VINHO = "6B0F1A";
const VINHO2 = "3D0A10";
const PRATA = "C4C4C4";
const OFF = "F2EFE9";
const DIM = "666666";
const MID = "161616";
const WHITE = "FFFFFF";

const FONT_D = "Barlow Condensed";
const FONT_B = "Outfit";
const FONT_M = "JetBrains Mono";

// ── HELPERS ──
const border = { style: BorderStyle.SINGLE, size: 1, color: "333333" };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0 };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

const vinhoLeftBorder = {
  top: noBorder, bottom: noBorder, right: noBorder,
  left: { style: BorderStyle.SINGLE, size: 6, color: VINHO }
};

const PAGE_W = 12240;
const MARGIN = 1440;
const CONTENT_W = PAGE_W - MARGIN * 2; // 9360

function heading1(text) {
  return new Paragraph({
    spacing: { before: 400, after: 200 },
    children: [new TextRun({ text: text.toUpperCase(), font: FONT_D, size: 36, bold: true, color: OFF })]
  });
}

function heading2(text) {
  return new Paragraph({
    spacing: { before: 300, after: 150 },
    children: [new TextRun({ text: text.toUpperCase(), font: FONT_D, size: 28, bold: true, color: VINHO })]
  });
}

function heading3(text) {
  return new Paragraph({
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, font: FONT_B, size: 22, bold: true, color: OFF })]
  });
}

function body(text) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text, font: FONT_B, size: 21, color: PRATA })]
  });
}

function mono(text) {
  return new Paragraph({
    spacing: { after: 80 },
    children: [new TextRun({ text, font: FONT_M, size: 16, color: DIM })]
  });
}

function spacer(h = 200) {
  return new Paragraph({ spacing: { before: h } });
}

function divider() {
  return new Paragraph({
    spacing: { before: 200, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: VINHO, space: 1 } }
  });
}

function tableRow(cells, isHeader = false) {
  const bg = isHeader ? VINHO2 : MID;
  const txtColor = isHeader ? OFF : PRATA;
  return new TableRow({
    children: cells.map((text, i) =>
      new TableCell({
        borders,
        width: { size: i === 0 ? 3120 : CONTENT_W - 3120, type: WidthType.DXA },
        shading: { fill: bg, type: ShadingType.CLEAR },
        margins: { top: 60, bottom: 60, left: 100, right: 100 },
        children: [new Paragraph({
          children: [new TextRun({
            text,
            font: i === 0 && !isHeader ? FONT_M : FONT_B,
            size: isHeader ? 18 : 18,
            bold: isHeader,
            color: i === 0 && !isHeader ? VINHO : txtColor
          })]
        })]
      })
    )
  });
}

function dataTable(headers, rows) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [3120, CONTENT_W - 3120],
    rows: [
      tableRow(headers, true),
      ...rows.map(r => tableRow(r))
    ]
  });
}

function stepCard(num, title, desc, tasks) {
  const children = [
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({ text: `PASSO ${String(num).padStart(2, "0")}`, font: FONT_M, size: 14, color: VINHO }),
        new TextRun({ text: `  ${title.toUpperCase()}`, font: FONT_D, size: 24, bold: true, color: OFF })
      ]
    }),
    new Paragraph({
      spacing: { after: 100 },
      children: [new TextRun({ text: desc, font: FONT_B, size: 19, color: PRATA })]
    }),
  ];
  tasks.forEach(t => {
    children.push(new Paragraph({
      spacing: { after: 60 },
      indent: { left: 360 },
      children: [
        new TextRun({ text: "[ ] ", font: FONT_M, size: 16, color: DIM }),
        new TextRun({ text: t, font: FONT_B, size: 18, color: PRATA })
      ]
    }));
  });
  return children;
}

// ── DOCUMENT ──
const doc = new Document({
  styles: {
    default: {
      document: { run: { font: FONT_B, size: 21, color: PRATA } }
    }
  },
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } }
      }]
    }]
  },
  sections: [
    // ═══════════ COVER PAGE ═══════════
    {
      properties: {
        page: {
          size: { width: PAGE_W, height: 15840 },
          margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN },
          background: { color: BLACK }
        }
      },
      children: [
        spacer(3000),
        new Paragraph({
          spacing: { after: 80 },
          children: [new TextRun({ text: "BRIEFING EXECUTIVO", font: FONT_M, size: 16, color: VINHO })]
        }),
        new Paragraph({
          spacing: { after: 40 },
          children: [new TextRun({ text: "TAURA", font: FONT_D, size: 96, bold: true, color: OFF })]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "TROYAGENT", font: FONT_D, size: 48, bold: true, color: VINHO })]
        }),
        divider(),
        new Paragraph({
          spacing: { after: 100 },
          children: [new TextRun({
            text: "Plataforma de IA multi-canal integrada ao Identity System TAURA Research.",
            font: FONT_B, size: 21, color: PRATA, italics: true
          })]
        }),
        spacer(2000),
        mono("TAURA_TroyAgent_Briefing_v1.0"),
        mono("CONFIDENCIAL | USO INTERNO"),
        mono("Marco 2026"),
        new Paragraph({ children: [new PageBreak()] })
      ]
    },

    // ═══════════ SECTION 1: PROJETO ═══════════
    {
      properties: {
        page: {
          size: { width: PAGE_W, height: 15840 },
          margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN },
          background: { color: BLACK }
        }
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "333333", space: 4 } },
            children: [
              new TextRun({ text: "TAURA ", font: FONT_D, size: 16, bold: true, color: VINHO }),
              new TextRun({ text: "TROYAGENT BRIEFING", font: FONT_M, size: 14, color: DIM })
            ]
          })]
        })
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({ text: "TAURA RESEARCH | Pagina ", font: FONT_M, size: 14, color: DIM }),
              new TextRun({ children: [PageNumber.CURRENT], font: FONT_M, size: 14, color: VINHO })
            ]
          })]
        })
      },
      children: [
        // ── 1. O PROJETO ──
        heading1("01 — O Projeto: TroyAgent"),
        body("Fork do OpenClaw — assistente pessoal de IA multi-canal, open-source (MIT), versao 2026.2.26. Escrito em TypeScript/Node.js com monorepo pnpm."),
        spacer(100),
        heading3("Stack Tecnica"),
        dataTable(["Item", "Detalhe"], [
          ["Runtime", "Node.js >= 22, TypeScript (ESM)"],
          ["Build", "tsdown, pnpm monorepo"],
          ["Testes", "Vitest (unit, e2e, live, gateway, Docker)"],
          ["Lint/Format", "Oxlint + Oxfmt"],
          ["UI Web", "Lit + Vite"],
          ["Banco", "SQLite + sqlite-vec (embeddings)"],
          ["Browser", "Playwright"],
          ["Media", "Sharp (imagens), pdfjs-dist, ElevenLabs (TTS)"],
        ]),
        spacer(150),
        heading3("Arquitetura Principal"),
        dataTable(["Camada", "Descricao"], [
          ["Gateway", "Servidor WebSocket + Express — control plane central. Porta 18789"],
          ["Agent Runtime", "Runtime de agente IA (Pi agent) com tool streaming e sandboxing"],
          ["CLI", "Interface de linha de comando (onboard, gateway, agent, send, doctor)"],
          ["Web UI", "Dashboard Lit + Vite (chat, config, channels, skills, debug)"],
          ["TUI", "Interface terminal interativa"],
          ["Plugin System", "SDK de plugins extensivel com 40+ extensoes"],
        ]),
        spacer(150),
        heading3("Canais de Mensagem (14+)"),
        dataTable(["Tipo", "Canais"], [
          ["Core (built-in)", "WhatsApp, Telegram, Discord, Slack, Signal, iMessage, LINE"],
          ["Extensions", "MS Teams, Google Chat, Matrix, Mattermost, BlueBubbles, Zalo, Feishu/Lark, Nextcloud Talk, IRC, Twitch"],
        ]),
        spacer(150),
        heading3("Apps Nativos"),
        dataTable(["Plataforma", "Detalhes"], [
          ["macOS", "Swift — menu bar app (apps/macos/)"],
          ["iOS", "Swift — + Watch app + Share Extension (apps/ios/)"],
          ["Android", "Kotlin/Gradle (apps/android/)"],
          ["Shared", "Framework compartilhado OpenClawKit (apps/shared/)"],
        ]),
        spacer(150),
        heading3("Skills Bundled (48)"),
        body("1Password, Apple Notes/Reminders, GitHub, Notion, Obsidian, Spotify, Weather, Coding Agent, Summarize, Image Gen (OpenAI), Whisper (STT), TTS, PDF, Canvas, e mais."),
        spacer(150),
        heading3("Deploy"),
        dataTable(["Metodo", "Detalhes"], [
          ["Docker Compose", "3 servicos: openclaw-gateway, openclaw-cli, caddy (reverse proxy)"],
          ["Rede", "troy-net (bridge, subnet 172.28.0.0/16)"],
          ["VPS", "Documentado em DEPLOY_VPS.md"],
          ["Fly.io", "Configs em fly.toml / fly.private.toml"],
        ]),

        new Paragraph({ children: [new PageBreak()] }),

        // ── 2. A MARCA ──
        heading1("02 — A Marca: TAURA Identity System v1.0"),
        body("Plataforma de pesquisa premium de biohacking / compostos sinteticos (peptideos). Posicionamento: expert-to-expert, sem apelo a massa."),
        spacer(100),

        heading2("2.1 Fundacao"),
        dataTable(["Item", "Valor"], [
          ["Palavra-nucleo", "TAURA (TAU = proteina tau, persistencia + RA = aura, potencia)"],
          ["Arquetipo primario", "O Cientista"],
          ["Arquetipo secundario", "O Estrategista"],
          ["Categoria", "Biohacking premium / Pesquisa aplicada"],
          ["Publico A", "Biohackers, atletas avancados, profissionais de saude"],
          ["Publico B", "Clinicas e consultorios (B2B)"],
          ["Tom", "Expert para Expert. Sem apelo a massa"],
          ["Promessa", "Pureza verificavel. Rastreabilidade total. Zero ruido"],
          ["Tagline", "Forca nao e acidente. E protocolo."],
        ]),
        spacer(150),

        heading2("2.2 Identidade Verbal"),
        body("Preciso. Seco. Tecnico sem ser inacessivel. TAURA fala como um cientista que respeita a inteligencia do interlocutor."),
        spacer(80),
        heading3("Vocabulario"),
        dataTable(["Regra", "Detalhes"], [
          ["Usa", "\"Estudos indicam\" / \"Literatura aponta\" / \"COA disponivel\" / \"Pureza >= 99%\""],
          ["Nunca", "\"Tomar\" / \"Dose\" / \"Curar\" / \"Tratar\" / \"Resultados garantidos\""],
          ["Pessoa", "Segunda pessoa direta. Sem corporatives. Sem \"nos acreditamos\""],
        ]),
        spacer(100),
        heading3("Taglines por Contexto"),
        dataTable(["Contexto", "Tagline"], [
          ["Marca geral", "Forca nao e acidente. E protocolo."],
          ["Research", "Para quem opera na fronteira."],
          ["Essencial", "A base que voce controla."],
          ["B2B Clinicas", "Qualidade que voce prescreve com seguranca."],
          ["Conteudo", "Dados primeiro. Opiniao depois."],
          ["Pos-compra", "Voce sabe o que esta fazendo. Nos garantimos."],
        ]),

        new Paragraph({ children: [new PageBreak()] }),

        heading2("2.3 Paleta de Cores"),
        body("Escassez cromatica como instrumento de autoridade. Poucos tons, maxima tensao visual."),
        spacer(80),
        dataTable(["Token", "Hex / Uso"], [
          ["TAURA BLACK", "#0A0A0A — Fundo primario. Autoridade total"],
          ["TAURA VINHO", "#6B0F1A — Acento, assinatura, logo, CTAs, hover states"],
          ["TAURA VINHO2", "#3D0A10 — Gradiente hero (Black para Vinho2)"],
          ["TAURA VINHO3", "#1a0508 — Variacao escura"],
          ["TAURA PRATA", "#C4C4C4 — Detalhe tecnico, linhas, metadados"],
          ["OFF-WHITE", "#F2EFE9 — Texto sobre fundo escuro, papelaria"],
          ["DIM", "#666666 — Texto secundario, labels"],
          ["DIMMER", "#333333 — Texto terciario"],
          ["MID", "#161616 — Cards, surfaces"],
          ["MID2", "#1e1e1e — Surfaces alternativas"],
        ]),
        spacer(100),
        heading3("Cores Proibidas"),
        dataTable(["Cor", "Motivo"], [
          ["Verde", "Cor de saude convencional — remete a farmacia"],
          ["Azul", "Corporativo generico — afasta posicionamento premium"],
          ["Branco puro #FFFFFF", "Clinico demais — use sempre #F2EFE9"],
          ["Gradiente colorido", "Proibido fora do hero aprovado"],
          ["Fundo claro digital", "Versao digital principal e sempre sobre escuro"],
        ]),
        spacer(150),

        heading2("2.4 Tipografia"),
        dataTable(["Camada", "Fonte / Uso"], [
          ["Display", "Barlow Condensed 900 — Titulos, logo, wordmark (NUNCA em corpo)"],
          ["Body", "Outfit 300-600 — Texto corrido, paragrafos"],
          ["Mono", "JetBrains Mono 300-500 — Dados tecnicos, numeros, metadados"],
        ]),
        spacer(80),
        heading3("Escala Digital"),
        dataTable(["Nivel", "Tamanho"], [
          ["H1 (Display)", "40px — Barlow Condensed 900, uppercase, .08em"],
          ["H2 (Section)", "24px — Barlow Condensed 700, uppercase"],
          ["Body", "14.5px — Outfit 300, line-height 1.85"],
          ["Caption", "11px — Outfit 400"],
          ["Nano / Tag", "9px — JetBrains Mono 400, .1em spacing"],
        ]),

        new Paragraph({ children: [new PageBreak()] }),

        heading2("2.5 Logo"),
        body("Wordmark TAURA em Barlow Condensed 900, letter-spacing .16em, uppercase."),
        dataTable(["Regra", "Detalhe"], [
          ["Versao 1", "Off-white sobre preto (principal)"],
          ["Versao 2", "Preto sobre off-white"],
          ["Versao 3", "Off-white sobre vinho"],
          ["Zona de protecao", "1 \"A\" em cada lado"],
          ["Proibido", "Distorcer, recolorizar, sombra, 3D, efeitos decorativos"],
        ]),
        spacer(150),

        heading2("2.6 Linguagem Visual — 3 Pilares"),
        dataTable(["Pilar", "Descricao"], [
          ["01 Luz Dramatica", "Glow vinho sobre preto. Sem flat lighting"],
          ["02 Textura Minima", "Noise grain sutil, linhas microscopicas, grade tecnica"],
          ["03 Vazio Proposital", "Espaco negativo como ferramenta de autoridade"],
        ]),
        spacer(80),
        body("Sem stock photos. Toda imagem deve parecer documentacao cientifica elevada. Fotografia: fundo preto infinito, luz dramatica lateral, detalhes tecnicos visiveis."),
        spacer(150),

        heading2("2.7 Aplicacoes de Marca"),
        dataTable(["Aplicacao", "Regra"], [
          ["Embalagem Research", "Caixa preta rigida, tipografia vinho e prata, sem imagens de pessoas"],
          ["Envio", "Caixa neutra, remetente sem mencao TAURA"],
          ["WhatsApp", "Wordmark branco s/ fundo vinho. Sem emoji na linha Research"],
          ["Instagram", "@taura.research — fundo preto, moldura vinho"],
          ["Site", "Dark mode exclusivo. Off-white somente impressos"],
        ]),
        spacer(150),

        heading2("2.8 Anti-Manual — O que NUNCA fazer"),
        dataTable(["Regra", "Motivo"], [
          ["Fundo branco/claro digital", "Branco comunica farmacia de varejo"],
          ["Verde ou azul", "Cores de saude convencional / corporativo generico"],
          ["Icone coracao/folha/capsula", "Cliche de bem-estar"],
          ["Atleta sorrindo", "Publicidade de suplemento de academia"],
          ["Promessas de resultado", "Nunca \"perca X kg\". Sempre \"a literatura aponta\""],
          ["Display em texto corrido", "Barlow Condensed e exclusivo para titulos"],
          ["Gradiente nao aprovado", "Zero rainbow, zero cores externas"],
          ["Emojis na linha Research", "Destroem posicionamento tecnico"],
          ["Stock photos", "Estetica de massa"],
          ["Logo distorcido", "Sem esticar, comprimir, recolorizar"],
        ]),

        new Paragraph({ children: [new PageBreak()] }),

        heading2("2.9 Componentes UI do Identity System"),
        body("O arquivo TAURA_Identity_System.html inclui componentes interativos prontos para referencia:"),
        dataTable(["Componente", "Descricao"], [
          ["Custom Cursor", "Dot vinho + ring prata (8px + 32px)"],
          ["Player Bar", "Estilo Remotion — timeline, playhead, sequencias"],
          ["Side Navigator", "Left panel fixo, 48px, nav por secoes"],
          ["Right Panel", "Properties panel 200px, metadados da secao"],
          ["Cards", "Background MID, borda-esquerda 2px vinho"],
          ["Data Tables", "Zebra sutil, primeira coluna mono/vinho"],
          ["Quote Blocks", "Bom (vinho) / Ruim (vermelho)"],
          ["Checklist", "Interativo com barra de progresso vinho"],
          ["Marquee Strip", "Ticker horizontal, Barlow 400"],
          ["Reveal Animations", "Scroll-triggered fade-up com delays"],
          ["Noise Grain", "SVG overlay, opacity .025"],
          ["Scanlines", "Repeating gradient sobre hero"],
          ["Swatches", "Expandiveis ao hover, info no bottom"],
        ]),

        new Paragraph({ children: [new PageBreak()] }),

        // ── 3. PLANO DE EXECUCAO ──
        heading1("03 — Plano de Execucao: Integracao TroyAgent + TAURA"),
        body("Roadmap completo para transformar o fork OpenClaw no produto TAURA, dividido em 10 passos sequenciais."),
        divider(),

        ...stepCard(1, "Setup e Validacao do Ambiente", "Preparar o ambiente de desenvolvimento e garantir que o projeto base funciona.", [
          "Instalar Node.js >= 22 e pnpm",
          "Rodar pnpm install no projeto",
          "Configurar .env a partir do .env.example (API keys, gateway token)",
          "Rodar pnpm build && pnpm ui:build",
          "Verificar que o gateway inicia sem erros (pnpm openclaw gateway)",
          "Rodar pnpm test para validar suite de testes",
        ]),
        divider(),

        ...stepCard(2, "Teste das Funcionalidades Existentes", "Validar cada subsistema core antes de qualquer modificacao visual.", [
          "Testar Gateway WebSocket (conexao, health check)",
          "Testar CLI: openclaw onboard, openclaw doctor",
          "Testar Web UI: acessar dashboard no browser",
          "Testar canal WhatsApp (se Twilio configurado)",
          "Testar canal Telegram (se bot token configurado)",
          "Testar canal Discord (se bot token configurado)",
          "Testar Agent runtime: enviar mensagem e receber resposta IA",
          "Testar TUI: pnpm tui",
          "Documentar bugs encontrados",
        ]),
        divider(),

        ...stepCard(3, "Rebrand: Tokens CSS e Design System", "Migrar toda a identidade visual para TAURA na UI web.", [
          "Mapear variaveis CSS existentes no projeto ui/",
          "Criar arquivo de tokens TAURA (--black, --vinho, --prata, --off, --dim, etc.)",
          "Importar fontes Google: Barlow Condensed, Outfit, JetBrains Mono",
          "Substituir paleta de cores em todos os componentes Lit",
          "Aplicar tipografia TAURA (display, body, mono) nos componentes",
          "Ajustar espacamentos e line-heights conforme escala TAURA",
          "Garantir dark mode exclusivo (nunca fundo branco)",
        ]),
        divider(),

        ...stepCard(4, "Rebrand: Logo e Wordmark", "Substituir toda referencia visual ao OpenClaw por TAURA.", [
          "Criar SVG do wordmark TAURA (Barlow Condensed 900, .16em)",
          "Substituir logo no header da Web UI",
          "Substituir favicon e icons (ui/public/)",
          "Atualizar assets/ com icones TAURA",
          "Atualizar titulo da pagina e meta tags",
          "Atualizar splash/loading screens",
        ]),
        divider(),

        ...stepCard(5, "Rebrand: Gateway, CLI e Metadata", "Atualizar nomes, titulos e outputs em todo o backend.", [
          "Renomear referencias \"OpenClaw\" para \"TAURA\" no CLI output",
          "Atualizar package.json (name, description, homepage)",
          "Atualizar mensagens do onboarding wizard",
          "Atualizar mensagens do doctor",
          "Atualizar headers HTTP e WebSocket do gateway",
          "Atualizar .env.example com branding TAURA",
        ]),
        divider(),

        ...stepCard(6, "Componentes UI TAURA", "Implementar os componentes visuais do Identity System na Web UI.", [
          "Implementar custom cursor (dot vinho + ring prata)",
          "Implementar cards com borda-esquerda vinho",
          "Implementar data tables com estilo TAURA (zebra, mono/vinho)",
          "Implementar botoes CTA com estilo vinho",
          "Implementar noise grain overlay sutil",
          "Implementar reveal animations (scroll fade-up)",
          "Implementar sistema de dividers (gradiente vinho)",
          "Validar Anti-Manual: nenhum componente viola as regras",
        ]),
        divider(),

        ...stepCard(7, "Integracao de Canais TAURA", "Configurar e testar canais de mensagem com branding TAURA.", [
          "Configurar WhatsApp com avatar/wordmark TAURA",
          "Configurar Telegram bot com nome e descricao TAURA",
          "Configurar Discord bot com branding TAURA",
          "Configurar perfil Instagram @taura.research como referencia",
          "Testar envio de mensagens em cada canal",
          "Validar tom de voz nas respostas automaticas",
          "Garantir que nenhuma mensagem viola o Anti-Manual",
        ]),
        divider(),

        ...stepCard(8, "Skills e Agente TAURA", "Adaptar skills e comportamento do agente ao contexto TAURA.", [
          "Criar skill de catalogo de produtos TAURA",
          "Criar skill de consulta COA (Certificate of Analysis)",
          "Configurar system prompt do agente com tom TAURA",
          "Configurar vocabulario permitido/proibido no agente",
          "Testar respostas do agente com cenarios reais",
          "Validar que agente nunca faz claims de saude",
        ]),
        divider(),

        ...stepCard(9, "Deploy e Infraestrutura", "Preparar ambiente de producao.", [
          "Configurar Docker Compose com branding TAURA",
          "Configurar Caddy com dominio TAURA",
          "Testar deploy local com docker-compose up",
          "Configurar SSL/TLS para dominio",
          "Testar todos os canais em ambiente Docker",
          "Documentar processo de deploy em DEPLOY_TAURA.md",
        ]),
        divider(),

        ...stepCard(10, "QA Final e Lancamento", "Validacao final contra o Identity System antes do go-live.", [
          "Executar checklist completo do Identity System (10 itens)",
          "Verificar paleta: apenas preto, vinho, prata, off-white",
          "Verificar tipografia: display = Barlow, body = Outfit, mono = JetBrains",
          "Verificar que nenhum material contem claim de saude",
          "Verificar fundo escuro em todas as telas digitais",
          "Verificar logo com zona de protecao correta",
          "Verificar imagens sem stock photos",
          "Verificar dados tecnicos em JetBrains Mono",
          "Verificar ausencia de emojis na linha Research",
          "Revisao regulatoria antes de publicar",
          "Go-live",
        ]),

        new Paragraph({ children: [new PageBreak()] }),

        // ── FOOTER / CLOSING ──
        heading1("Encerramento"),
        divider(),
        spacer(200),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "TAURA", font: FONT_D, size: 72, bold: true, color: "222222" })]
        }),
        spacer(100),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 80 },
          children: [new TextRun({ text: "IDENTITY SYSTEM v1.0 | TAURA RESEARCH | MARCO 2026 | CONFIDENCIAL", font: FONT_M, size: 14, color: DIM })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Forca nao e acidente. E protocolo.", font: FONT_B, size: 21, color: VINHO, italics: true })]
        }),
      ]
    }
  ]
});

// ── WRITE FILE ──
const OUTPUT = process.argv[2] || "TAURA_TroyAgent_Briefing.docx";
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(OUTPUT, buffer);
  console.log(`Documento gerado: ${OUTPUT} (${(buffer.length / 1024).toFixed(0)} KB)`);
});
