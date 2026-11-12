#!/usr/bin/env bash
set -e

echo "=========================================================="
echo "  ⚡ Instalador de MangaReader+ Enterprise para Linux"
echo "=========================================================="

# 1. Si existe un paquete .deb en la misma carpeta y el sistema es Ubuntu/Debian/Mint
DEB_FILE=$(ls ./*.deb 2>/dev/null | head -n 1 || true)
if [ -n "$DEB_FILE" ] && command -v apt-get >/dev/null 2>&1; then
  echo "📦 Detectado sistema basado en Debian/Ubuntu. Instalando paquete $DEB_FILE..."
  sudo apt-get update -y
  sudo apt-get install -y "$DEB_FILE"
  echo "✅ ¡Instalación completada! Ya puedes abrir 'MangaReader Enterprise' desde tu menú de aplicaciones."
  exit 0
fi

# 2. Si existe un archivo .AppImage (Universal para cualquier distribución Linux)
APPIMAGE_FILE=$(ls ./*.AppImage 2>/dev/null | head -n 1 || true)
if [ -n "$APPIMAGE_FILE" ]; then
  echo "🚀 Configurando versión universal AppImage..."
  if command -v apt-get >/dev/null 2>&1; then
    sudo apt-get install -y libfuse2 >/dev/null 2>&1 || sudo apt-get install -y libfuse2t64 >/dev/null 2>&1 || true
  fi

  INSTALL_DIR="$HOME/.local/bin"
  DESKTOP_DIR="$HOME/.local/share/applications"
  mkdir -p "$INSTALL_DIR" "$DESKTOP_DIR"

  TARGET_BIN="$INSTALL_DIR/MangaReader-Enterprise.AppImage"
  cp "$APPIMAGE_FILE" "$TARGET_BIN"
  chmod +x "$TARGET_BIN"

  cat > "$DESKTOP_DIR/mangareader-enterprise.desktop" <<EOF
[Desktop Entry]
Name=MangaReader+ Enterprise
Comment=Manga, Anime, Cine, K-Dramas y Watch Together
Exec="$TARGET_BIN" --no-sandbox %U
Terminal=false
Type=Application
Categories=AudioVideo;Video;Player;
StartupWMClass=MangaReader Enterprise
EOF

  chmod +x "$DESKTOP_DIR/mangareader-enterprise.desktop"
  echo "✅ ¡Instalación completada en $TARGET_BIN!"
  echo "🎉 Ya puedes buscar 'MangaReader+ Enterprise' en tu menú de aplicaciones o abrirlo ahora mismo."
  "$TARGET_BIN" --no-sandbox >/dev/null 2>&1 &
  exit 0
fi

echo "❌ No se encontró el archivo .deb ni .AppImage en esta carpeta."
exit 1