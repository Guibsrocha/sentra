#!/bin/bash
set -e

echo "🧹 Cleaning npm cache..."
npm cache clean --force

echo "📦 Installing dependencies..."
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps --include=dev

echo "🏗️ Building project..."
npm run build

echo "✅ Build complete!"
