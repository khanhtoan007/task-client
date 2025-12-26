# Cấu hình dự án

Tài liệu này mô tả các cấu hình đã được thiết lập cho dự án.

## 📋 Mục lục

1. [Code Style (Prettier)](#code-style-prettier)
2. [Linting (ESLint)](#linting-eslint)
3. [TypeScript Path Aliases](#typescript-path-aliases)
4. [Base URL & Axios Instance](#base-url--axios-instance)
5. [Environment Variables](#environment-variables)
6. [Request Validation (Zod)](#request-validation-zod)
7. [Scripts](#scripts)

---

## Code Style (Prettier)

Prettier đã được cấu hình với các quy tắc sau:

**File:** `.prettierrc`

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "always",
  "endOfLine": "lf",
  "bracketSpacing": true,
  "jsxSingleQuote": false
}
```

**Sử dụng:**
- Format code: `npm run format`
- Kiểm tra format: `npm run format:check`

---

## Linting (ESLint)

ESLint đã được tích hợp với:
- TypeScript ESLint
- React Hooks
- React Refresh
- Prettier (tắt các rule xung đột)

**File:** `eslint.config.js`

**Sử dụng:**
- Lint code: `npm run lint`
- Lint và tự sửa: `npm run lint:fix`

---

## TypeScript Path Aliases

Đã cấu hình path aliases để import dễ dàng hơn:

```typescript
// Thay vì
import { Header } from '../../../components/Header'

// Có thể dùng
import { Header } from '@/components/Header'
```

**Các aliases đã cấu hình:**
- `@/*` → `./src/*`
- `@/components/*` → `./src/components/*`
- `@/modules/*` → `./src/modules/*`
- `@/types/*` → `./src/types/*`
- `@/hooks/*` → `./src/hooks/*`
- `@/constants/*` → `./src/constants/*`
- `@/utils/*` → `./src/utils/*`
- `@/styles/*` → `./src/styles/*`

**Files:** 
- `tsconfig.app.json` - TypeScript config
- `vite.config.ts` - Vite config (để resolve paths)

---

## Base URL & Axios Instance

Đã tạo axios instance với các tính năng:

**File:** `src/utils/api.ts`

**Tính năng:**
- Base URL từ environment variable
- Request interceptor: Tự động thêm Authorization header từ localStorage
- Response interceptor: Xử lý lỗi tự động (401, 403, 500)
- Toast notifications cho các lỗi
- Timeout: 10 giây

**Sử dụng:**
```typescript
import apiClient from '@/utils/api'

const response = await apiClient.post('/auth/login', data)
```

**Constants:** `src/constants/index.ts`
- `API_BASE_URL` - Base URL từ env
- `STORAGE_KEYS` - Keys cho localStorage
- `API_ENDPOINTS` - Định nghĩa endpoints

---

## Environment Variables

**File:** `.env.example`

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api

# App Configuration
VITE_APP_NAME=Tasks Client
VITE_APP_VERSION=0.0.0
```

**File:** `src/vite-env.d.ts` - Type definitions cho env variables

**Lưu ý:** 
- Tạo file `.env.local` từ `.env.example` và điền giá trị thực tế
- File `.env.local` sẽ không được commit (đã có trong `.gitignore`)

---

## Request Validation (Zod)

Đã tạo Zod schemas cho validation:

**File:** `src/modules/auth/cores/auth.schema.ts`

**Schemas:**
- `loginSchema` - Validation cho form login
- `registerSchema` - Validation cho form register

**Sử dụng với React Hook Form:**
```typescript
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/modules/auth/cores/auth.schema'

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(loginSchema),
})
```

---

## Scripts

Các scripts đã được thêm vào `package.json`:

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,scss,md}\"",
  "format:check": "prettier --check \"src/**/*.{ts,tsx,js,jsx,json,css,scss,md}\"",
  "preview": "vite preview"
}
```

---

## Cấu trúc files mới được tạo

```
src/
├── utils/
│   ├── api.ts              # Axios instance với interceptors
│   └── index.ts
├── constants/
│   └── index.ts            # App constants (API_BASE_URL, STORAGE_KEYS, etc.)
├── vite-env.d.ts          # Type definitions cho env variables
└── modules/
    └── auth/
        └── cores/
            └── auth.schema.ts  # Zod validation schemas

.env.example                # Template cho environment variables
.prettierrc                 # Prettier config
.prettierignore            # Prettier ignore patterns
```

---

## Next Steps

1. Tạo file `.env.local` từ `.env.example` và điền giá trị API thực tế
2. Sử dụng `apiClient` từ `@/utils/api` thay vì axios trực tiếp
3. Sử dụng Zod schemas cho validation trong forms
4. Sử dụng path aliases (`@/...`) khi import modules

