export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          Quizzify
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Plataforma de Quizzes Interactivos
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/login"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Iniciar Sesión
          </a>
          <a
            href="/signup"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition"
          >
            Registrarse
          </a>
        </div>
        <div className="mt-12 text-sm text-gray-500">
          <p>Backend API: {process.env.NEXT_PUBLIC_API_URL}</p>
        </div>
      </div>
    </div>
  );
}
