#!/bin/bash

# Generate multiple client types for different platforms
# Similar to how Supabase generates different clients

echo "🚀 Generating API clients..."

# Generate main client (for backwards compatibility)
echo "📱 Generating main client..."
npx @hey-api/openapi-ts -c libs/codegen/src/lib/openapi-ts.config.ts

# Generate browser-specific client
echo "🌐 Generating browser client..."
npx @hey-api/openapi-ts -c libs/codegen/src/lib/browser.config.ts

# Generate mobile-specific client  
echo "📱 Generating mobile client..."
npx @hey-api/openapi-ts -c libs/codegen/src/lib/mobile.config.ts

# Generate server-specific client
echo "🖥️  Generating server client..."
npx @hey-api/openapi-ts -c libs/codegen/src/lib/server.config.ts

echo "✅ All clients generated successfully!"
echo ""
echo "Available clients:"
echo "  📱 Browser: libs/codegen/src/lib/clients/client.ts"
echo "  📱 Mobile:  libs/codegen/src/lib/clients/mobileClient.ts"  
echo "  🖥️  Server:  libs/codegen/src/lib/clients/server.ts"