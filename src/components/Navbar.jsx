import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <nav className="max-w-2xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-base font-bold text-indigo-600 dark:text-indigo-400 tracking-tight hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-150"
        >
          <span className="text-lg">✅</span>
          <span>Görev Takip</span>
        </NavLink>

        <ul className="flex items-center gap-1">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-sm font-medium px-3 py-1.5 rounded-lg transition-colors duration-150 ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200'
                }`
              }
            >
              Görevler
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
