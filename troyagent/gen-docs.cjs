const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel,
  BorderStyle, WidthType, ShadingType, PageNumber, PageBreak,
  TabStopType, TabStopPosition
} = require("docx");

const VINHO = "6B0F1A";
const VINHO2 = "3D0A10";
const MID = "161616";
const PRATA = "C4C4C4";
const OFFWHITE = "F2EFE9";

const border = { style: BorderStyle.SINGLE, size: 1, color: "333333" };
const borders = { top: border, bottom: border, left: border, right: border };

function heading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 },
    children: [new TextRun({ text, bold: true, size: 36, font: "Arial", color: VINHO })],
    border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: VINHO, space: 4 } },
  });
}
function heading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 150 },
    children: [new TextRun({ text, bold: true, size: 28, font: "Arial", color: OFFWHITE })],
  });
}
function heading3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3, spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, bold: true, size: 24, font: "Arial", color: PRATA })],
  });
}
function p(text) {
  return new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text, size: 22, font: "Arial", color: PRATA })] });
}
function bullet(text) {
  return new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 60 }, children: [new TextRun({ text, size: 22, font: "Arial", color: PRATA })] });
}
function spacer() { return new Paragraph({ spacing: { after: 200 }, children: [] }); }
function divider() {
  return new Paragraph({ spacing: { before: 200, after: 200 }, border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: VINHO, space: 4 } }, children: [] });
}
function tableRow2(c1, c2, isHeader) {
  const sh = isHeader ? { fill: VINHO2, type: ShadingType.CLEAR } : { fill: MID, type: ShadingType.CLEAR };
  const cl = isHeader ? OFFWHITE : PRATA;
  return new TableRow({ children: [
    new TableCell({ borders, shading: sh, width: { size: 3200, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [new Paragraph({ children: [new TextRun({ text: c1, size: 20, font: "JetBrains Mono", color: cl, bold: isHeader })] })] }),
    new TableCell({ borders, shading: sh, width: { size: 6160, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [new Paragraph({ children: [new TextRun({ text: c2, size: 20, font: "Arial", color: cl, bold: isHeader })] })] }),
  ] });
}
function table2(h1, h2, rows) {
  return new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [3200, 6160], rows: [tableRow2(h1, h2, true), ...rows.map(([a, b]) => tableRow2(a, b, false))] });
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22, color: PRATA } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 36, bold: true, font: "Arial", color: VINHO }, paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 28, bold: true, font: "Arial", color: OFFWHITE }, paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 24, bold: true, font: "Arial", color: PRATA }, paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
    ],
  },
  numbering: { config: [{ reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }] },
  sections: [
    // COVER
    { properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
      children: [
        spacer(), spacer(), spacer(), spacer(), spacer(),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: "TAURA", size: 80, bold: true, font: "Arial", color: OFFWHITE })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [new TextRun({ text: "RESEARCH CONTROL", size: 28, font: "Arial", color: VINHO })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: VINHO, space: 20 } }, children: [] }),
        spacer(),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: "Documentacao Completa de Funcionalidades", size: 36, font: "Arial", color: PRATA })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: "TroyAgent Platform / OpenClaw Engine", size: 24, font: "Arial", color: PRATA })] }),
        spacer(), spacer(), spacer(), spacer(), spacer(), spacer(),
        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Versao 2026.2.26  |  Documento Interno  |  Confidencial", size: 20, font: "Arial", color: PRATA })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: "Gerado em: " + new Date().toLocaleDateString("pt-BR"), size: 20, font: "Arial", color: PRATA })] }),
      ] },
    // CONTENT
    { properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
      headers: { default: new Header({ children: [new Paragraph({ children: [new TextRun({ text: "TAURA Research", size: 18, font: "Arial", color: VINHO, bold: true }), new TextRun({ text: "\tDocumentacao de Funcionalidades", size: 18, font: "Arial", color: PRATA })], tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }], border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: VINHO, space: 4 } } })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "TAURA Research Control  |  Pagina ", size: 16, font: "Arial", color: PRATA }), new TextRun({ children: [PageNumber.CURRENT], size: 16, font: "Arial", color: VINHO })] })] }) },
      children: [
        // 1. VISAO GERAL
        heading1("1. Visao Geral da Plataforma"),
        p("O TroyAgent (motor OpenClaw) e uma plataforma de assistente IA multi-canal que roda localmente. Fornece um plano de controle (Gateway) que coordena canais de comunicacao, sessoes, agentes, automacao, ferramentas e memoria."),
        spacer(),
        table2("Componente", "Descricao", [
          ["Gateway", "Servidor WebSocket (porta 18789) que coordena todos os subsistemas"],
          ["CLI", "Interface de linha de comando com 20+ comandos principais e 50+ subcomandos"],
          ["Control UI", "Interface web (Vite + Lit) com dashboard, chat, config e monitoramento"],
          ["Agentes", "Sistema de agentes IA com 50+ tools, skills, memoria e subagentes"],
          ["Canais", "13+ integracoes (WhatsApp, Telegram, Discord, Slack, Signal, etc.)"],
          ["Cron", "Agendador de tarefas com expressoes cron e delivery multi-canal"],
          ["Browser", "Controle de Chrome/Chromium dedicado via Playwright"],
          ["TTS", "Text-to-speech com 5+ provedores (ElevenLabs, Google, OpenAI, AWS, Azure)"],
          ["Memory", "Sistema de memoria vetorial com busca hibrida (vetor + keyword)"],
          ["Plugins", "Sistema extensivel com 32+ extensoes disponiveis"],
        ]),

        // 2. GATEWAY
        new Paragraph({ children: [new PageBreak()] }),
        heading1("2. Gateway (Servidor WebSocket)"),
        p("O Gateway e o nucleo da plataforma. Roda como servidor WebSocket e expoe 50+ metodos RPC."),
        heading2("2.1 Protocolo"), bullet("Protocolo versao 3 sobre WebSocket"), bullet("Frames: req (request), res (response), event (server push)"), bullet("Autenticacao: token, password, device identity (Ed25519), trusted-proxy, Tailscale"), bullet("Rate limiting configuravel por IP"), bullet("Reconnexao automatica com backoff exponencial (800ms a 15s)"),
        heading2("2.2 Metodos RPC — Agentes"),
        table2("Metodo", "Descricao", [["agent", "Executa turno de agente com streaming"], ["agent.wait", "Aguarda conclusao de job"], ["agents.list", "Lista agentes configurados"], ["agents.create", "Cria novo agente"], ["agents.update", "Atualiza agente"], ["agents.delete", "Remove agente"], ["agent.identity.get", "Identidade do agente"], ["agents.files.list/get/set", "Gerencia arquivos do agente"]]),
        spacer(),
        heading2("2.3 Metodos RPC — Chat e Sessoes"),
        table2("Metodo", "Descricao", [["send", "Envia mensagem"], ["chat.send", "Envia com streaming e attachments"], ["chat.abort", "Aborta mensagem"], ["chat.history", "Historico"], ["chat.inject", "Injeta no historico"], ["sessions.list", "Lista sessoes"], ["sessions.patch", "Atualiza modelo/thinking level"], ["sessions.reset/delete", "Reseta ou remove sessao"], ["sessions.compact", "Compacta transcricao"], ["sessions.usage", "Metricas de uso"]]),
        spacer(),
        heading2("2.4 Metodos RPC — Canais, Cron, Config"),
        table2("Metodo", "Descricao", [["channels.status", "Status de todos os canais"], ["channels.logout", "Desconecta canal"], ["cron.list/add/update/remove", "CRUD de jobs agendados"], ["cron.run", "Execucao manual"], ["cron.runs", "Historico"], ["config.get", "Obtem configuracao"], ["web.login.start/wait/pairing", "Login WhatsApp (QR ou pairing code)"]]),
        spacer(),
        heading2("2.5 Metodos RPC — Skills, TTS, Browser, Devices"),
        table2("Metodo", "Descricao", [["skills.status/install/update", "Gerencia skills"], ["tools.catalog", "Catalogo de ferramentas"], ["models.list", "Modelos disponiveis"], ["tts.status/enable/disable/convert", "Text-to-Speech"], ["tts.providers/setProvider", "Provedores TTS"], ["browser.request", "Acao do browser"], ["node.pair.request/approve/reject", "Pareamento de devices"], ["device.token.rotate/revoke", "Tokens de dispositivo"], ["exec.approval.request/resolve", "Aprovacoes de execucao"]]),

        // 3. CLI
        new Paragraph({ children: [new PageBreak()] }),
        heading1("3. CLI (Linha de Comando)"),
        table2("Comando", "Descricao", [["gateway", "Inicia servidor WebSocket"], ["setup/onboard", "Wizard de configuracao"], ["configure", "Config interativa"], ["config get/set", "Config nao-interativa"], ["doctor", "Diagnostico e correcoes"], ["dashboard", "Abre Control UI"], ["status/health", "Saude dos canais e gateway"], ["agent", "Executa turno de agente"], ["agents", "Gerencia workspaces e auth"], ["sessions", "Lista e gerencia sessoes"], ["channels", "Gerencia canais"], ["cron", "Jobs agendados"], ["browser", "Controle Chrome"], ["devices", "Pareamento"], ["approvals", "Aprovacoes"], ["daemon", "Servico (start/stop/restart)"], ["memory", "Busca e reindexacao"], ["message", "Envia e le mensagens"]]),

        // 4. CANAIS
        new Paragraph({ children: [new PageBreak()] }),
        heading1("4. Canais de Comunicacao"),
        heading2("4.1 Canais Nativos"),
        heading3("WhatsApp"), bullet("Baileys v7.0.0-rc.9 com patches de estabilidade"), bullet("Login via QR code ou codigo de pareamento"), bullet("Envio de mensagens, midia, typing indicators"), bullet("Multi-conta, grupos com mention gating"),
        heading3("Telegram"), bullet("grammy — Bot mode, webhooks, polling"), bullet("Grupos, DMs, threads, botoes inline"), bullet("Reasoning lane coordinator"),
        heading3("Discord"), bullet("discord.js — Guilds, DMs, threads, voice"), bullet("Componentes, reacoes, presence, audit logging"),
        heading3("Slack"), bullet("@slack/bolt — Channels, DMs, threads"), bullet("Blocos ricos, modals, reacoes"),
        heading3("WebChat"), bullet("Chat integrado na Control UI via WebSocket"),
        heading2("4.2 Canais via Extensoes"),
        table2("Canal", "Descricao", [["Signal", "signal-cli"], ["iMessage", "BlueBubbles ou daemon macOS"], ["Google Chat", "Chat API com cards"], ["LINE", "Messaging API, flex messages"], ["MS Teams", "Teams API"], ["Matrix", "Protocolo Matrix"], ["IRC", "Internet Relay Chat"], ["Nostr", "Protocolo descentralizado"]]),
        heading2("4.3 Features Compartilhadas"),
        bullet("Allowlists/Denylists (allowFrom, denyFrom)"), bullet("DM Pairing com codigos"), bullet("Group Routing com mention gating"), bullet("Media handling (imagens, audio, video, docs)"), bullet("Link understanding com preview"), bullet("Model overrides e chunking por canal"),

        // 5. AGENTES
        new Paragraph({ children: [new PageBreak()] }),
        heading1("5. Sistema de Agentes"),
        heading2("5.1 Modelos Suportados"),
        bullet("Anthropic (Claude Opus, Sonnet, Haiku)"), bullet("OpenAI (GPT-4o, GPT-4)"), bullet("OpenRouter (100+ modelos)"), bullet("Google Gemini"), bullet("Local (node-llama-cpp, Ollama)"), bullet("Failover chain entre provedores"),
        heading2("5.2 Ferramentas (50+)"),
        table2("Ferramenta", "Descricao", [["browser-tool", "Automacao web"], ["canvas-tool", "Canvas A2UI"], ["cron-tool", "Jobs agendados"], ["image-tool", "Analise de imagens"], ["memory-tool", "Busca em memoria"], ["message-tool", "Composicao"], ["nodes-tool", "Execucao remota"], ["tts-tool", "Text-to-speech"], ["web-tools", "Fetch e search"], ["bash-tools", "Shell commands"], ["*-actions", "Acoes por canal (Discord, Slack, Telegram, WhatsApp)"]]),
        heading2("5.3 Skills"), bullet("Bundled (incluidas)"), bullet("Managed (catalogo)"), bullet("Workspace (customizadas)"), bullet("Install/update/remove via CLI ou UI"),
        heading2("5.4 Subagentes"), bullet("Registry para descoberta"), bullet("Spawn com lifecycle tracking"), bullet("Propagacao de eventos"),
        heading2("5.5 Seguranca"), bullet("Tool policy granular"), bullet("Sandbox para execucao"), bullet("Exec approvals para operacoes sensiveis"),

        // 6. UI
        new Paragraph({ children: [new PageBreak()] }),
        heading1("6. Control UI (Interface Web)"),
        heading2("6.1 Operacao"), table2("Pagina", "Descricao", [["Vendas", "Dashboard com metricas, faturamento, pedidos, ticket medio"], ["Catalogo", "CRUD de produtos, SKU, precos"], ["CRM", "Contatos, pipeline (7 estagios), historico, WhatsApp QR"]]),
        heading2("6.2 Control"), table2("Pagina", "Descricao", [["Visao Geral", "Status gateway, uptime, auth, presenca"], ["Canais", "Dashboard multi-canal com health"], ["Instancias", "Dispositivos conectados"], ["Sessoes", "Thinking level, verbose, reasoning por sessao"], ["Uso", "Tokens, custo, graficos, CSV export"], ["Cron", "CRUD, run manual, historico"]]),
        heading2("6.3 Agent"), table2("Pagina", "Descricao", [["Agentes", "Modelo, tools, skills, identidade, arquivos"], ["Skills", "Catalogo, install, API keys"], ["Nodes", "Pareamento, tokens, exec approvals"]]),
        heading2("6.4 Settings"), table2("Pagina", "Descricao", [["Config", "Editor form/JSON, validacao, busca"], ["Debug", "RPC manual, status, event log"], ["Logs", "Streaming JSONL com filtros"]]),
        heading2("6.5 Chat"), bullet("Message rendering com streaming"), bullet("Tool results em tempo real"), bullet("Compaction e fallback indicators"), bullet("Focus mode, sidebar, image attachments"),

        // 7. CONFIG
        new Paragraph({ children: [new PageBreak()] }),
        heading1("7. Configuracao"),
        heading2("7.1 openclaw.json"),
        table2("Secao", "Descricao", [["gateway", "Bind, porta, auth, controlUi, trustedProxies"], ["agents", "Modelo, tools, skills por agente"], ["channels", "Config por canal"], ["cron", "Habilitacao, retencao"], ["memory", "Backend, embeddings"], ["session", "Escopo DM, reset"], ["auth.profiles", "API keys, OAuth"], ["plugins", "Extensoes"], ["tts", "Provider padrao"]]),
        heading2("7.2 Variaveis de Ambiente"),
        table2("Variavel", "Descricao", [["OPENCLAW_GATEWAY_TOKEN", "Token de seguranca (obrigatorio)"], ["OPENCLAW_GATEWAY_PORT", "Porta (default: 18789)"], ["OPENROUTER_API_KEY", "Chave OpenRouter"], ["ANTHROPIC_API_KEY", "Chave Anthropic"], ["OPENCLAW_STATE_DIR", "Diretorio de dados"], ["OPENCLAW_LOG_LEVEL", "Nivel de logging"]]),

        // 8-12 CONDENSED
        new Paragraph({ children: [new PageBreak()] }),
        heading1("8. Cron (Agendamento)"),
        bullet("Tipos: main, system, webhook, delivery, announce"), bullet("Expressoes cron com timezone local"), bullet("Stagger, retencao configuravel, run manual"), bullet("Isolamento de agente por job"),

        heading1("9. Memoria"),
        bullet("Busca hibrida (vetorial + keyword)"), bullet("Provedores: OpenAI, Anthropic, Voyage, Mistral, Gemini, Local"), bullet("Indexacao automatica, reindexacao sob demanda"),

        heading1("10. Browser"),
        bullet("Chrome/Chromium via Playwright"), bullet("Screenshot, navegacao, forms, cookies, downloads, extensoes"),

        heading1("11. TTS"),
        table2("Provedor", "Descricao", [["ElevenLabs", "Vozes alta qualidade"], ["Google Cloud", "WaveNet"], ["OpenAI", "Vozes OpenAI"], ["AWS Polly", "Amazon"], ["Azure", "Microsoft"]]),

        heading1("12. Plugins (32+ extensoes)"),
        bullet("Loader automatico, manifesto, hooks, registry"), bullet("Enable/disable por config"),
        table2("Extensao", "Descricao", [["bluebubbles", "iMessage proxy"], ["matrix", "Protocolo Matrix"], ["msteams", "Microsoft Teams"], ["memory-lancedb", "Backend LanceDB"], ["diagnostics-otel", "OpenTelemetry"], ["copilot-proxy", "GitHub Copilot proxy"]]),

        // 13-14
        new Paragraph({ children: [new PageBreak()] }),
        heading1("13. Deploy"),
        heading2("Docker"), bullet("node:22-bookworm + Chromium + Xvfb"), bullet("docker-compose: gateway + CLI + Caddy"), bullet("Rede troy-net (172.28.0.0/16)"),
        heading2("Build System"), bullet("tsdown (300+ arquivos TypeScript)"), bullet("Vite (Control UI)"), bullet("rolldown (A2UI bundle)"), bullet("pnpm workspace (root + ui + packages + extensions)"),

        heading1("14. Seguranca"),
        heading2("Autenticacao"),
        table2("Metodo", "Descricao", [["Token", "OPENCLAW_GATEWAY_TOKEN"], ["Password", "Senha compartilhada"], ["Device Identity", "Ed25519 challenge/response"], ["Trusted Proxy", "Proxy confiavel"], ["Tailscale", "Tailscale whois"]]),
        heading2("Scopes"),
        table2("Scope", "Permissoes", [["operator.admin", "Acesso total"], ["operator.read", "Leitura (health, status, logs, modelos)"], ["operator.write", "Escrita (send, agent, chat, browser)"], ["operator.approvals", "Aprovacoes de execucao"], ["operator.pairing", "Pareamento de dispositivos"]]),

        spacer(), divider(),
        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "TAURA Research Control  |  Confidencial", size: 20, font: "Arial", color: VINHO, bold: true })] }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("C:\\Users\\user\\Documents\\projetos\\troyagent\\TAURA_Documentacao_Funcionalidades.docx", buf);
  console.log("OK: TAURA_Documentacao_Funcionalidades.docx gerado!");
});
