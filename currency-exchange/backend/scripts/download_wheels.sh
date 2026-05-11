#!/usr/bin/env sh
set -eu

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
WHEELS_DIR="$ROOT_DIR/wheels"
REQ_FILE="$ROOT_DIR/requirements.txt"
PY_VERSION="3.12"

ARCH="$(uname -m)"
case "$ARCH" in
  arm64|aarch64)
    PLATFORM="musllinux_1_2_aarch64"
    ;;
  x86_64|amd64)
    PLATFORM="musllinux_1_2_x86_64"
    ;;
  *)
    echo "Unsupported architecture: $ARCH" >&2
    exit 1
    ;;
 esac

if [ -d "$WHEELS_DIR" ] && [ -n "$(ls -A "$WHEELS_DIR" 2>/dev/null)" ] && [ "${FORCE:-0}" != "1" ]; then
  echo "Wheels already exist in $WHEELS_DIR. Set FORCE=1 to re-download." >&2
  exit 0
fi

rm -rf "$WHEELS_DIR"
mkdir -p "$WHEELS_DIR"

python3 -m pip download \
  --dest "$WHEELS_DIR" \
  --platform "$PLATFORM" \
  --python-version "$PY_VERSION" \
  --implementation cp \
  --abi cp312 \
  --only-binary=:all: \
  -r "$REQ_FILE"
