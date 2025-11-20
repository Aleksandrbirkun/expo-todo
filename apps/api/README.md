# Todo API with NestJS and Supabase

This is a RESTful API built with NestJS and Supabase for managing todos with user authentication and admin functionality.

## Features

- User authentication with Supabase Auth
- JWT-based authorization
- Role-based access control (User/Admin)
- CRUD operations for todos
- Admin can manage all todos
- Users can only manage their own todos

## Setup Instructions

### 1. Supabase Setup

1. Create a new project on [Supabase](https://supabase.com)
2. Go to Settings > API to get your project URL and API keys
3. Go to Settings > Auth > JWT Settings to get your JWT secret
4. Run the SQL schema provided in `supabase-schema.sql` in your Supabase SQL editor

### 2. Environment Configuration

1. Copy `.env.example` to `.env` in the root directory
2. Fill in your Supabase configuration:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_JWT_SECRET=your_supabase_jwt_secret
PORT=3000
```

### 3. Install Dependencies

```bash
yarn install
```

### 4. Start the Development Server

```bash
yarn api:dev
```

The API will be available at `http://localhost:3000/api`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/register-admin` - Register a new admin user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Todos (Protected Routes)

All todo routes require authentication via Bearer token.

- `GET /api/todos` - Get user's todos
- `POST /api/todos` - Create a new todo
- `GET /api/todos/:id` - Get specific todo
- `PATCH /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

### Admin Routes

- `GET /api/todos/admin/all` - Get all todos (Admin only)

## Database Schema

The API uses the following Supabase tables:

### profiles
- `id` (uuid, primary key, references auth.users)
- `email` (text, unique)
- `role` (text, 'user' or 'admin')
- `created_at` (timestamp)
- `updated_at` (timestamp)

### todos
- `id` (uuid, primary key)
- `title` (text, required)
- `description` (text, optional)
- `completed` (boolean, default false)
- `user_id` (uuid, references auth.users)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## Authentication Flow

1. Register a user using `/auth/register` or `/auth/register-admin`
2. Login using `/auth/login` to get an access token
3. Include the access token in the Authorization header: `Bearer <token>`
4. The JWT strategy validates tokens and extracts user information

## Role-Based Access Control

- **Users**: Can only view/edit/delete their own todos
- **Admins**: Can view/edit/delete all todos and access admin-only endpoints

## Security Features

- Row Level Security (RLS) enabled on Supabase
- JWT token validation
- Role-based guards
- Secure password handling via Supabase Auth

## Example Requests

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

### Create Todo
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{"title": "My Todo", "description": "Todo description"}'
```

### Register Admin
```bash
curl -X POST http://localhost:3000/api/auth/register-admin \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "password123"}'
```