#!/bin/bash
set -e

echo "📦 Installing dependencies..."
npm install --production=false

echo "🏗️ Building project..."
npm run build

echo "✅ Build complete!"
