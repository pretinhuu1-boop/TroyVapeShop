# Guia de Implantação - Troy Vape Store

Este projeto foi otimizado para implantação em plataformas de hospedagem estática modernas.

## 🚀 Comandos Principais

- **Desenvolvimento:** `npm run dev` (Inicia o servidor Vite na porta 3000)
- **Build de Produção:** `npm run build` (Gera os arquivos otimizados na pasta `dist/`)
- **Visualização do Build:** `npm run preview` (Inicia um servidor local para testar o build de produção)

## 🌍 Plataformas Suportadas

### 1. Vercel
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Configuração:** O arquivo `vercel.json` já está configurado para lidar com as rotas `/admin`.

### 2. Netlify
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- **Configuração:** O arquivo `public/_redirects` garante que as rotas funcionem corretamente.

### 3. Cloudflare Pages
- **Build Command:** `npm run build`
- **Build Output Directory:** `dist`
- **Framework Preset:** Vite

## 🔑 Variáveis de Ambiente

Certifique-se de configurar as seguintes variáveis no painel da sua plataforma de hospedagem:

| Variável | Descrição |
| --- | --- |
| `VITE_SUPABASE_URL` | URL do seu projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Chave anônima do seu projeto Supabase |
| `VITE_ADMIN_PASSWORD` | Senha para acessar o painel administrativo |

## 📦 Estrutura de Build
Ao executar `npm run build`, o Vite irá gerar:
- `dist/index.html` (Página principal)
- `dist/admin.html` (Painel administrativo)
- `dist/assets/` (CSS e JS minificados e com hash para cache)
- `dist/robots.txt` e `dist/sitemap.xml` (Arquivos de SEO)
