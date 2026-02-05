#!/bin/bash

# TypeScript SDK Generation Script for Huerray Backend API
# This script downloads the OpenAPI spec and generates a TypeScript client using OpenAPI Generator

set -e  # Exit on error

echo "🚀 Starting SDK generation..."

# Configuration
OPENAPI_SPEC_URL="https://backend.huerray.de/swagger/doc.json"
OUTPUT_DIR="../lib/api/generated"
TEMP_SPEC_FILE="openapi-spec.json"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Download OpenAPI specification
echo -e "${BLUE}📥 Downloading OpenAPI specification...${NC}"
curl -s -o "$TEMP_SPEC_FILE" "$OPENAPI_SPEC_URL"

if [ ! -f "$TEMP_SPEC_FILE" ]; then
    echo "❌ Failed to download OpenAPI specification"
    exit 1
fi

echo -e "${GREEN}✓ OpenAPI specification downloaded${NC}"

# Step 2: Clean existing generated code
if [ -d "$OUTPUT_DIR" ]; then
    echo -e "${YELLOW}🧹 Cleaning existing generated code...${NC}"
    rm -rf "$OUTPUT_DIR"
fi

# Step 3: Generate TypeScript client
echo -e "${BLUE}⚙️  Generating TypeScript SDK...${NC}"

npx @openapitools/openapi-generator-cli generate \
    -i "$TEMP_SPEC_FILE" \
    -g typescript-axios \
    -o "$OUTPUT_DIR" \
    --additional-properties=supportsES6=true,npmName=huerray-api,withSeparateModelsAndApi=true,apiPackage=api,modelPackage=models,useSingleRequestParameter=true

echo -e "${GREEN}✓ TypeScript SDK generated${NC}"

# Step 4: Clean up temporary files
echo -e "${BLUE}🧹 Cleaning up temporary files...${NC}"
rm -f "$TEMP_SPEC_FILE"

# Step 5: Create a .gitignore in generated folder to ignore unnecessary files
cat > "$OUTPUT_DIR/.gitignore" << EOF
# Ignore OpenAPI Generator metadata
.openapi-generator/
.openapi-generator-ignore
openapitools.json
EOF

echo -e "${GREEN}✅ SDK generation complete!${NC}"
echo -e "${BLUE}📁 Generated files are in: ${OUTPUT_DIR}${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "  1. Review the generated code in ${OUTPUT_DIR}"
echo "  2. Install dependencies: npm install"
echo "  3. Import and use the SDK in your React components"
