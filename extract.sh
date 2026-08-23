#!/bin/bash
# Extract ZIP and move contents to repo root

cd "$(dirname "$0")"

# Extract the ZIP file
unzip -q "NeedA-Expo-SDK57-Firebase-Connected.zip"

# Find the extracted folder (usually named the same as ZIP without extension)
EXTRACTED_DIR=$(unzip -l "NeedA-Expo-SDK57-Firebase-Connected.zip" | head -2 | tail -1 | awk '{print $4}' | cut -d'/' -f1)

if [ -z "$EXTRACTED_DIR" ]; then
  # Try common extraction folder names
  for dir in NeedA* Needa* needa*; do
    if [ -d "$dir" ] && [ "$dir" != "." ]; then
      EXTRACTED_DIR="$dir"
      break
    fi
  done
fi

if [ -z "$EXTRACTED_DIR" ]; then
  echo "Could not find extracted directory"
  exit 1
fi

echo "Extracted directory: $EXTRACTED_DIR"

# Move all contents from extracted folder to repo root
if [ -d "$EXTRACTED_DIR" ]; then
  cp -r "$EXTRACTED_DIR"/* .
  cp -r "$EXTRACTED_DIR"/.[^.]* . 2>/dev/null || true
  echo "Files moved to repo root"
  
  # Remove the extracted folder
  rm -rf "$EXTRACTED_DIR"
  echo "Cleaned up extracted folder"
fi

# Verify required files/folders
echo ""
echo "Verifying structure..."
for item in package.json app.json eas.json app src assets; do
  if [ -e "$item" ]; then
    echo "✓ $item"
  else
    echo "✗ $item (missing)"
  fi
done
