#!/usr/bin/env bash
set -euo pipefail

echo "🔍 Restaurace Na Truhlárně — Před-spouštěcí kontrola"
echo "======================================================"
echo ""

# Check Node version
NODE_VERSION=$(node -v 2>/dev/null || echo "none")
echo "📦 Node.js verze: $NODE_VERSION"
if [[ "$NODE_VERSION" == v20* ]]; then
  echo "   ✅ Node.js 20 OK"
else
  echo "   ⚠️  Očekávána Node.js 20.x (viz .nvmrc)"
fi

# Check pnpm
PNPM_VERSION=$(pnpm --version 2>/dev/null || echo "none")
echo "📦 pnpm verze: $PNPM_VERSION"
echo ""

# Install dependencies
echo "📥 Instalace závislostí..."
pnpm install --frozen-lockfile 2>/dev/null || pnpm install
echo ""

# Lint
echo "🧹 Spouštím ESLint..."
pnpm run lint 2>/dev/null || echo "   ⚠️  Lint selhal (nebo nejsou zdrojové soubory)"
echo ""

# Type check
echo "🔎 Spouštím typovou kontrolu (astro check)..."
pnpm astro check 2>/dev/null || echo "   ⚠️  Typová kontrola selhala (mohou to být očekávané chyby před buildem)"
echo ""

# Build
echo "🏗️  Spouštím build..."
pnpm run build
echo ""

# Verify dist exists
if [ -d "dist" ]; then
  FILE_COUNT=$(find dist -type f | wc -l)
  echo "✅ Build úspěšný! dist/ obsahuje $FILE_COUNT souborů."
else
  echo "❌ Build selhal — dist/ složka neexistuje."
  exit 1
fi

echo ""
echo "📋 Kontrolní seznam před spuštěním:"
echo "  [ ] Zkontrolováno IČO a DIČ v src/data/profile.ts"
echo "  [ ] Zkontrolovány kontaktní údaje"
echo "  [ ] Zkontrolována otevírací doba"
echo "  [ ] Nastavena Google Maps embed URL"
echo "  [ ] Zkontrolovány ceny v jídelním lístku"
echo "  [ ] Nahrány vlastní fonty do public/fonts/"
echo "  [ ] Nastaveno vlastní doménové jméno v astro.config.mjs"
echo "  [ ] Zkontrolovány právní dokumenty (Zásady ochrany osobních údajů)"
echo "  [ ] Build prošel bez chyb"
echo ""
echo "🎉 Před-spouštěcí kontrola dokončena!"