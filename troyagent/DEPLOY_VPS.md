# 🚀 Troy Vape - Guia de Deploy em VPS

Este guia cobre o processo de colocar o **Troy Vape** em produção usando Docker.

## Pré-requisitos

- Servidor VPS (Ubuntu 22.04+ recomendado)
- Domínio configurado (opcional, mas recomendado para SSL)
- Docker e Docker Compose instalados

## 1. Preparação do Servidor

Acesse seu VPS via SSH e clone o repositório (ou faça upload dos arquivos):

```bash
# Exemplo usando git
git clone https://github.com/seu-usuario/troy-vape.git
cd troy-vape
```

## 2. Configuração de Ambiente

Copie o arquivo de exemplo e configure suas credenciais reais:

```bash
cp .env.example .env
nano .env
```

**Variáveis Críticas:**

- `OPENROUTER_API_KEY`: Sua chave da OpenRouter (para Pony Alpha ou outros modelos).
- `OPENCLAW_GATEWAY_TOKEN`: Crie uma senha forte para proteger o gateway.

> **Nota sobre o modelo Pony Alpha:**
> Este modelo possui funcionalidade de "reasoning" (raciocínio). Para ativá-lo corretamente, certifique-se de que o arquivo `.openclaw/openclaw.json` (que será criado automaticamente ou pode ser editado manualmente na pasta do usuário no VPS) contenha:
>
> ```json
> "agents": {
>   "defaults": {
>     "model": { "primary": "openrouter/pony-alpha" },
>     "models": {
>       "openrouter/pony-alpha": { "alias": "Pony Alpha" }
>     }
>   }
> }
> ```

````

## 2.1 Deploy Automatizado (Recomendado)

Foi criado um script para facilitar o envio dos arquivos e o restart dos serviços.
Para usá-lo, execute no terminal local:

```bash
./deploy.sh [IP_DO_VPS] [USUARIO]
````

Exemplo:

```bash
./deploy.sh 187.77.37.78 root
```

Isso fará:

1. Sincronização dos arquivos via `rsync` (ignorando node_modules, .git, etc).
2. Verificação do arquivo `.env` remoto.
3. Reconstrução e reinício dos containers via SSH.

---

## 3. Build e Execução Manual (Caso prefira)

O projeto inclui um `Dockerfile` otimizado. Para subir tudo:

```bash
# Compilar e iniciar em background
docker-compose up -d --build
```

O comando acima irá:

1. Instalar dependências.
2. Compilar o Backend e o Frontend (UI).
3. Iniciar o Gateway (porta 18789) com suporte ao modelo configurado.

## 4. Acesso

- **Painel Operacional**: Por padrão, o Docker expõe apenas portas internas por segurança.
- Para acessar externamente, você precisará de um **Reverse Proxy** (Nginx/Caddy).

### Exemplo rápido (Nginx Proxy Manager ou Caddy):

Apontar `https://painel.sualoja.com` para `http://localhost:18789`.

## 5. Manutenção

### Resetar Dados (Fábrica)

Se precisar limpar o banco de dados local do agente:

```bash
bash reset-data.sh
```

### Atualizar Versão

```bash
git pull
docker-compose up -d --build
```

### Ver Logs

```bash
docker-compose logs -f
```
