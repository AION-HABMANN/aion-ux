#!/bin/sh
# usage: sh _tools/preview.sh <docx> <outdir> [dpi]   (renders PDF and page images with LibreOffice + pdftoppm)
DOCX="$1"; OUT="$2"; DPI="${3:-60}"
mkdir -p "$OUT"; rm -f "$OUT"/*.jpg "$OUT"/*.pdf
"/c/Program Files/LibreOffice/program/soffice.exe" --headless --convert-to pdf --outdir "$OUT" "$DOCX" >/dev/null 2>&1
pdftoppm -jpeg -r "$DPI" "$OUT"/*.pdf "$OUT/pg"
ls "$OUT" | wc -l
