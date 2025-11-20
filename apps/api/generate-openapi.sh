#!/bin/bash

# Script to generate OpenAPI spec from running API server

echo "🚀 Starting API server in development mode..."

# Start the server in background
NODE_ENV=development npx nx serve api > /dev/null 2>&1 &
SERVER_PID=$!

# Wait for server to be ready
echo "⏳ Waiting for server to start..."
sleep 5

# Check if server is running
if ! curl -s http://localhost:3001/api > /dev/null; then
    echo "❌ Server failed to start"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

# Generate OpenAPI spec
echo "📄 Generating OpenAPI spec..."
curl -s http://localhost:3001/api/docs-json > openapi.json

if [ $? -eq 0 ]; then
    echo "✅ OpenAPI spec saved to apps/api/openapi.json"
    
    # Pretty print the JSON
    if command -v jq &> /dev/null; then
        jq . openapi.json > openapi.tmp.json && mv openapi.tmp.json openapi.json
        echo "✨ JSON formatted with jq"
    fi
else
    echo "❌ Failed to generate OpenAPI spec"
fi

# Stop the server
echo "🛑 Stopping server..."
kill $SERVER_PID 2>/dev/null

echo "✅ Done!"