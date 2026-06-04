import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-5 text-center px-4 sm:px-6">
      <div className="w-24 h-24 rounded-3xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-5xl shadow-inner">
        🔍
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-6xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
          404
        </h1>
        <p className="text-base font-medium text-gray-600 dark:text-gray-400">
          Aradığın sayfa bulunamadı.
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Belki URL'yi yanlış yazdın ya da sayfa kaldırılmış olabilir.
        </p>
      </div>
      <Link
        to="/"
        className="mt-1 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-medium px-6 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-150"
      >
        <span>←</span>
        <span>Ana Sayfaya Dön</span>
      </Link>
    </div>
  );
}
