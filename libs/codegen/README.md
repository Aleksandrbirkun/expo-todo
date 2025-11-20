# API Client Generation

This library generates TypeScript API clients from OpenAPI specifications, providing multiple client types similar to Supabase's client pattern.

## Generated Clients

### 1. Browser Client (`client.ts`)
For web applications (Next.js, React)
```typescript
import { createClient } from '@nx-todo/codegen';

const apiClient = createClient({
  baseURL: 'https://api.example.com',
  token: 'your-jwt-token'
});

// Auto token management
apiClient.auth.setToken('new-token');
apiClient.auth.clearToken();
```

### 2. Mobile Client (`mobileClient.ts`) 
For React Native applications with AsyncStorage
```typescript
import { mobileClient } from '@nx-todo/codegen';

// Automatically handles AsyncStorage token persistence
await mobileClient.auth.setToken('jwt-token');
const token = await mobileClient.auth.getToken();
```

### 3. Server Client (`server.ts`)
For Next.js server-side operations with cookie management
```typescript
import { createServerClient } from '@nx-todo/codegen';

// In server components or API routes
const apiClient = await createServerClient();

// In middleware
import { updateSession } from '@nx-todo/codegen';
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}
```

## Generation Scripts

### Generate All Clients
```bash
npm run generate:clients
```

### Generate Individual Clients
```bash
# Main client (backwards compatibility)
npm run openapi-ts

# Browser client
npx @hey-api/openapi-ts -c libs/codegen/src/lib/browser.config.ts

# Mobile client  
npx @hey-api/openapi-ts -c libs/codegen/src/lib/mobile.config.ts

# Server client
npx @hey-api/openapi-ts -c libs/codegen/src/lib/server.config.ts
```

## Configuration Files

- `openapi-ts.config.ts` - Main configuration (default)
- `browser.config.ts` - Browser-specific client config
- `mobile.config.ts` - Mobile-specific client config  
- `server.config.ts` - Server-specific client config

## Usage Patterns

### Authentication Flow
```typescript
// Browser
const client = createClient();
await client.auth.setToken(loginResponse.token);

// Mobile
await mobileClient.auth.setToken(loginResponse.token);

// Server
const client = await createServerClient();
await client.auth.setToken(loginResponse.token);
```

### API Calls
```typescript
// All clients provide the same generated methods
const todos = await client.todosControllerFindAll();
const newTodo = await client.todosControllerCreate({
  body: { title: 'New task', completed: false }
});
```

### React Query Integration
Browser and mobile clients include React Query hooks:
```typescript
import { useTodosControllerFindAll } from '@nx-todo/codegen/@tanstack/react-query.gen';

function TodoList() {
  const { data: todos, isLoading } = useTodosControllerFindAll();
  // ...
}
```

## File Structure
```
libs/codegen/src/lib/
├── clients/
│   ├── client.ts          # Browser client
│   ├── mobileClient.ts    # Mobile client  
│   └── server.ts          # Server client
├── generated/             # Generated files from OpenAPI
│   ├── browser/           # Browser-specific generated files
│   ├── mobile/            # Mobile-specific generated files
│   ├── server/            # Server-specific generated files
│   └── ...                # Main generated files
├── *.config.ts           # Configuration files
└── index.ts              # Main exports
```

## Building

Run `nx build codegen` to build the library.
