# TroyAgent - API Documentation

> Documentacao completa de todas as APIs do sistema TroyAgent.
> Porta padrao do Gateway: **18789**

---

## Autenticacao

| Metodo | Header |
|--------|--------|
| Bearer Token | `Authorization: Bearer <OPENCLAW_GATEWAY_TOKEN>` |
| Token alternativo | `X-OpenClaw-Token: <token>` |

Headers adicionais por contexto:
- `x-openclaw-message-channel` - Canal da mensagem
- `x-openclaw-account-id` - ID da conta
- `x-openclaw-message-to` - Destinatario
- `x-openclaw-thread-id` - ID do thread

---

## 1. HTTP Endpoints

### 1.1 OpenAI Chat Completions

```
POST /v1/chat/completions
```

**Auth:** Bearer token (opcional para requests locais)

**Request Body:**
```json
{
  "model": "openclaw",
  "stream": true,
  "messages": [
    {
      "role": "user",
      "content": "Ola, como funciona o sistema?"
    }
  ],
  "user": "user-id-opcional"
}
```

**Response:** OpenAI-compatible (JSON ou SSE streaming)

---

### 1.2 OpenResponses

```
POST /v1/responses
```

**Auth:** Bearer token

**Request Body:**
```json
{
  "model": "nome-do-modelo",
  "stream": false,
  "input": [
    {
      "type": "message",
      "content": [
        {
          "type": "input_text",
          "source": { "type": "url", "url": "..." }
        }
      ]
    }
  ],
  "instructions": "instrucoes opcionais",
  "tools": [],
  "tool_choice": "none",
  "max_output_tokens": 4096,
  "user": "user-id"
}
```

---

### 1.3 Tools Invoke

```
POST /tools/invoke
Content-Type: application/json (max 2MB)
```

**Auth:** Bearer token

**Request Body:**
```json
{
  "tool": "nome-da-ferramenta",
  "action": "acao-opcional",
  "args": { "param1": "valor1" },
  "sessionKey": "session-key-opcional",
  "dryRun": false
}
```

**Response:**
```json
{
  "ok": true,
  "result": "...",
  "error": null
}
```

---

### 1.4 Hooks

#### Wake Hook
```
POST /hooks/wake
```

**Auth:** Bearer token ou X-OpenClaw-Token

**Request Body:**
```json
{
  "text": "mensagem de wake",
  "mode": "now"
}
```
`mode`: `"now"` | `"next-heartbeat"`

**Response:** `{"ok": true, "mode": "now"}`

---

#### Agent Hook
```
POST /hooks/agent
```

**Auth:** Bearer token ou X-OpenClaw-Token

**Request Body:**
```json
{
  "agentId": "agent-id",
  "sessionKey": "session-key",
  "message": "mensagem para o agente",
  "name": "nome-opcional",
  "wakeMode": "now",
  "channel": "whatsapp",
  "deliver": true,
  "to": "destinatario",
  "model": "modelo-opcional",
  "thinking": true,
  "timeoutSeconds": 120,
  "allowUnsafeExternalContent": false
}
```

**Response:** `{"ok": true, "runId": "xxx"}` (HTTP 202)

---

### 1.5 Supabase Proxy (`/api/*`)

Todas as rotas proxy para `https://coiwajcdvqbrxbshdnwl.supabase.co/rest/v1/`
CORS habilitado. Auth via service role key (server-side only).

#### Products

| Metodo | Rota | Descricao |
|--------|------|-----------|
| `GET` | `/api/products` | Lista produtos ativos (`active=eq.true`, order: category, name) |
| `GET` | `/api/products/visible` | Produtos visiveis ao cliente (campos limitados) |
| `POST` | `/api/products` | Cria produto |
| `PATCH` | `/api/products/:id` | Atualiza produto por UUID |
| `DELETE` | `/api/products/:id` | Remove produto |

**Campos retornados (visible):** `id, sku, name, description, category, format, concentration, brand, price_brl, stock_qty, warehouse, purity`

**Body (POST/PATCH):**
```json
{
  "sku": "RT-40",
  "name": "Retatrutida",
  "description": "Agonista triplo",
  "category": "Peptideo",
  "format": "Liofilizado",
  "concentration": "40mg",
  "brand": "TAURA",
  "price_brl": 450.00,
  "stock_qty": 50,
  "warehouse": "SP",
  "purity": ">=98%",
  "active": true,
  "visible_to_customer": true
}
```

---

#### Customers

| Metodo | Rota | Descricao |
|--------|------|-----------|
| `GET` | `/api/customers` | Lista clientes (order: created_at desc) |
| `POST` | `/api/customers` | Cria cliente |
| `PATCH` | `/api/customers/:id` | Atualiza cliente |
| `DELETE` | `/api/customers/:id` | Remove cliente |

**Body (POST):**
```json
{
  "name": "Nome do Cliente",
  "phone": "+5511999999999",
  "type": "lead",
  "notes": "observacoes"
}
```

---

#### Orders

| Metodo | Rota | Descricao |
|--------|------|-----------|
| `GET` | `/api/orders` | Lista pedidos com cliente e itens (joins inclusos) |
| `POST` | `/api/orders` | Cria pedido |

**Response (GET):** Inclui `customer(name, phone)` e `items(quantity, unit_price, product(name, sku))`

---

#### Suppliers

| Metodo | Rota | Descricao |
|--------|------|-----------|
| `GET` | `/api/suppliers` | Lista fornecedores (order: name asc) |

---

#### Conversations (WhatsApp Tracking)

| Metodo | Rota | Descricao |
|--------|------|-----------|
| `GET` | `/api/conversations` | Lista conversas com dados do cliente |
| `GET` | `/api/conversations/:id` | Conversa com mensagens |
| `PATCH` | `/api/conversations/:id` | Atualiza conversa (ex: status) |

**Response (GET):** Inclui `customer(id, name, phone, type)` e opcionalmente `messages(id, role, content, created_at)`

---

#### Messages

| Metodo | Rota | Descricao |
|--------|------|-----------|
| `GET` | `/api/messages?conversation_id=xxx` | Mensagens de uma conversa (order: created_at) |

---

### 1.6 Control UI

| Metodo | Rota | Descricao |
|--------|------|-----------|
| `GET` | `/control/` | Interface de controle |
| `GET` | `/control/avatar/:agentId` | Avatar do agente |

---

### 1.7 Slack Webhook

```
POST /slack/events
```
Recebe eventos do Slack via Events API.

---

## 2. Gateway WebSocket Methods (JSON-RPC)

Conexao WebSocket na porta 18789. Formato de chamada:
```json
{
  "method": "nome.do.metodo",
  "params": { ... },
  "id": "request-id"
}
```

### 2.1 READ (Leitura/Inspecao)

| Metodo | Descricao |
|--------|-----------|
| `health` | Health check |
| `status` | Status do servidor |
| `system-presence` | Presenca do sistema |
| `last-heartbeat` | Ultimo heartbeat |
| `logs.tail` | Tail de logs em tempo real |
| `agents.list` | Listar agentes |
| `agent.identity.get` | Obter identidade do agente |
| `agents.files.list` | Listar arquivos do agente |
| `agents.files.get` | Obter arquivo do agente |
| `chat.history` | Historico do chat |
| `channels.status` | Status dos canais (WhatsApp, Telegram, etc) |
| `config.get` | Obter configuracao |
| `config.schema` | Schema da configuracao |
| `sessions.list` | Listar sessoes |
| `sessions.preview` | Preview de sessao |
| `sessions.usage` | Uso da sessao |
| `sessions.usage.timeseries` | Uso ao longo do tempo |
| `sessions.usage.logs` | Logs de uso |
| `sessions.resolve` | Resolver chave de sessao |
| `cron.list` | Listar cron jobs |
| `cron.status` | Status do cron |
| `cron.runs` | Historico de execucoes |
| `models.list` | Listar modelos disponiveis |
| `models.info` | Info de modelo especifico |
| `tools.catalog` | Catalogo de ferramentas |
| `skills.status` | Status de skills |
| `usage.cost` | Analise de custo |
| `voicewake.get` | Configuracao de voice wake |
| `tts.status` | Status do TTS |
| `tts.providers` | Provedores TTS disponiveis |

### 2.2 WRITE (Envio/Execucao)

| Metodo | Descricao |
|--------|-----------|
| `send` | Enviar mensagem |
| `poll` | Poll de mensagens |
| `agent` | Executar agente |
| `agent.wait` | Aguardar agente |
| `wake` | Acordar sistema |
| `chat.send` | Enviar mensagem no chat |
| `chat.abort` | Abortar chat em execucao |
| `browser.request` | Request via browser |
| `push.test` | Testar push notification |
| `talk.mode` | Modo de conversa |
| `tts.enable` | Habilitar TTS |
| `tts.disable` | Desabilitar TTS |
| `tts.convert` | Converter texto em audio |
| `tts.setProvider` | Definir provedor TTS |
| `voicewake.set` | Configurar voice wake |
| `node.invoke` | Invocar metodo de node |

### 2.3 ADMIN (Gerenciamento)

| Metodo | Descricao |
|--------|-----------|
| `connect` | Estabelecer conexao |
| `channels.logout` | Logout de canal |
| `channels.qr` | Obter QR code |
| `channels.verify` | Verificar canal |
| `agents.create` | Criar agente |
| `agents.update` | Atualizar agente |
| `agents.delete` | Deletar agente |
| `agents.files.set` | Salvar arquivo do agente |
| `agent.identity.set` | Definir identidade |
| `skills.install` | Instalar skill |
| `skills.update` | Atualizar skill |
| `secrets.reload` | Recarregar secrets |
| `config.set` | Definir configuracao |
| `config.apply` | Aplicar configuracao |
| `config.patch` | Patch de configuracao |
| `chat.inject` | Injetar mensagem |
| `cron.add` | Adicionar cron job |
| `cron.update` | Atualizar cron job |
| `cron.remove` | Remover cron job |
| `cron.run` | Executar cron job |
| `sessions.patch` | Modificar sessao |
| `sessions.reset` | Resetar sessao |
| `sessions.delete` | Deletar sessao |
| `sessions.compact` | Compactar sessao |
| `web.login.start` | Iniciar login WhatsApp |
| `web.login.wait` | Aguardar login |
| `web.login.pairing` | Pareamento por numero |

### 2.4 APPROVALS

| Metodo | Descricao |
|--------|-----------|
| `exec.approval.request` | Solicitar aprovacao |
| `exec.approval.waitDecision` | Aguardar decisao |
| `exec.approval.resolve` | Resolver aprovacao |
| `exec.approvals.get` | Obter aprovacoes |

### 2.5 PAIRING (Dispositivos)

| Metodo | Descricao |
|--------|-----------|
| `device.pair.list` | Listar solicitacoes |
| `device.pair.approve` | Aprovar pareamento |
| `device.pair.reject` | Rejeitar pareamento |
| `device.token.rotate` | Rotacionar token |
| `device.token.revoke` | Revogar token |
| `node.pair.request` | Solicitar pareamento de node |
| `node.pair.list` | Listar pareamentos |
| `node.pair.approve` | Aprovar node |
| `node.pair.reject` | Rejeitar node |
| `node.rename` | Renomear node |
| `node.list` | Listar nodes |

---

## 3. Integracoes Externas

### 3.1 Provedores de IA

| Provedor | Base URL | Auth |
|----------|----------|------|
| Anthropic | `https://api.anthropic.com` | `ANTHROPIC_API_KEY` |
| OpenAI | `https://api.openai.com/v1` | `OPENAI_API_KEY` |
| OpenRouter | `https://openrouter.ai/api/v1` | `OPENROUTER_API_KEY` |
| Mistral | `https://api.mistral.ai/v1` | `MISTRAL_API_KEY` |
| Moonshot | `https://api.moonshot.ai/v1` | `MOONSHOT_API_KEY` |
| Perplexity | `https://api.perplexity.ai` | `PERPLEXITY_API_KEY` |
| MiniMax | `https://api.minimax.io/anthropic` | `MINIMAX_API_KEY` |
| BytePlus | `https://ark.ap-southeast.bytepluses.com/api/v3` | API key |
| Doubao | `https://ark.cn-beijing.volces.com/api/v3` | API key |
| Ollama | `http://localhost:11434` | Nenhum |
| HuggingFace | `https://huggingface.co/api` | Token opcional |
| Qwen/Aliyun | Portal OAuth | OAuth token |

### 3.2 Audio (TTS/STT)

| Servico | Base URL | Tipo |
|---------|----------|------|
| OpenAI TTS | `https://api.openai.com/v1/audio/speech` | Text-to-Speech |
| OpenAI Whisper | `https://api.openai.com/v1/audio/transcriptions` | Speech-to-Text |
| Deepgram | `https://api.deepgram.com/v1` | Speech-to-Text |
| Mistral Audio | `https://api.mistral.ai/v1` | Transcricao |
| Moonshot Audio | `https://api.moonshot.ai/v1` | Transcricao |

### 3.3 Embeddings

| Provedor | Base URL |
|----------|----------|
| OpenAI | `https://api.openai.com/v1/embeddings` |
| Mistral | `https://api.mistral.ai/v1/embeddings` |
| Voyage AI | `https://api.voyageai.com/v1/embeddings` |

### 3.4 Plataformas de Mensageria

| Plataforma | Tipo de Conexao | Auth |
|------------|-----------------|------|
| WhatsApp (Baileys) | WebSocket | QR Code / Pairing |
| Telegram | HTTP API (`api.telegram.org`) | Bot Token |
| Discord | WebSocket (discord.js) | Bot Token |
| Slack | Events API (webhook) | Bot Token |
| iMessage | macOS RPC nativo | Sistema |
| Line | Channel API | Channel credentials |

### 3.5 Dados

| Servico | Base URL | Tabelas |
|---------|----------|---------|
| Supabase | `https://coiwajcdvqbrxbshdnwl.supabase.co/rest/v1/` | products, customers, orders, order_items, suppliers, conversations, messages |

### 3.6 Browser Automation

| Ferramenta | Tipo |
|------------|------|
| Chrome CDP | WebSocket (`ws://localhost:<port>/devtools/`) |
| Playwright | Automacao programatica |

---

## 4. Rate Limiting e Seguranca

- **Hook auth failures:** Max 20 tentativas por 60 segundos -> `429 Too Many Requests`
- **Headers de seguranca:**
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Content-Security-Policy: default-src 'none'`
  - `Strict-Transport-Security` (configuravel)
- **Max body size (tools):** 2MB

---

## 5. Variaveis de Ambiente Principais

```env
OPENCLAW_GATEWAY_TOKEN=token-do-gateway
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
OPENROUTER_API_KEY=sk-or-...
MISTRAL_API_KEY=...
SUPABASE_KEY=service-role-key
```

---

*Gerado em 2026-03-14 | TroyAgent API v1*
