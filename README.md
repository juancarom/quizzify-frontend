# Quizzify Frontend

Frontend de la plataforma Quizzify desarrollado con Next.js 16, React 19, TypeScript y Tailwind CSS.

## �� Stack Tecnológico

- **Next.js 16** - Framework de React con App Router
- **React 19** - Librería de UI
- **TypeScript** - Type safety
- **Tailwind CSS** - Estilos
- **Axios** - Cliente HTTP
- **TanStack Query** - Manejo de estado del servidor
- **Zustand** - State management
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas

## 📦 Desarrollo Local

### Prerequisitos
- Node.js 20+
- npm

### Instalación

\`\`\`bash
npm install
cp .env.example .env.local
npm run dev
\`\`\`

La aplicación estará disponible en http://localhost:3000

## 🐳 Docker

\`\`\`bash
docker-compose up --build
\`\`\`

La aplicación estará disponible en http://localhost:80

## 🌐 Conexión con Backend

- **Backend URL**: http://localhost:3010
- **PostgreSQL**: localhost:5234

## 📝 Variables de Entorno

\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:3010
\`\`\`
