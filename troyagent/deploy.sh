#!/bin/bash
# Troy Vape Deployment Script

# Configuration
# IP do VPS (confirme o IP correto antes de usar)
DEFAULT_HOST="${TROY_VPS_HOST:-187.72.37.78}"
DEFAULT_USER="root"
REMOTE_DIR="~/troy-vape"

# Allow override via arguments
VPS_HOST="${1:-$DEFAULT_HOST}"
VPS_USER="${2:-$DEFAULT_USER}"

echo "🚀 Iniciando Deploy para Troy Vape"
echo "📡 Destino: $VPS_USER@$VPS_HOST:$REMOTE_DIR"

# Confirm
read -p "Continuar? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Abortado."
    exit 1
fi

# 1. Sync Files
echo "📦 Sincronizando arquivos..."
# Excludes: node_modules, .git, dist, and local .env (security)
rsync -avz --progress \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude 'dist' \
  --exclude '.env' \
  --exclude '.DS_Store' \
  . "$VPS_USER@$VPS_HOST:$REMOTE_DIR"

if [ $? -ne 0 ]; then
    echo "❌ Erro na sincronização. Verifique sua conexão SSH."
    exit 1
fi

# 2. Remote Build & Restart
echo "🔄 Reconstruindo e reiniciando containers no VPS..."
ssh "$VPS_USER@$VPS_HOST" << 'EOF'
  cd ~/troy-vape || exit 1

  # Check if .env exists
  if [ ! -f .env ]; then
    echo "⚠️  AVISO: Arquivo .env não encontrado no servidor!"
    echo "    Criando a partir de .env.example..."
    cp .env.example .env
    echo "🚨 IMPORTANTE: Você deve editar o arquivo .env no servidor com suas chaves reais!"
    echo "    Comando: nano .env"
  fi

  # Docker Compose Build & Up
  echo "🐳 Parando containers antigos..."
  docker compose down 2>/dev/null || docker-compose down

  echo "🐳 Construindo e iniciando..."
  docker compose up -d --build 2>/dev/null || docker-compose up -d --build

  echo "✅ Status dos serviços:"
  docker compose ps 2>/dev/null || docker-compose ps
EOF

echo "✨ Deploy finalizado!"
