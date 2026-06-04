import { useState } from 'react';

const STATUS = {
  completed: {
    label: 'Tamamlandı',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
    border: 'border-l-emerald-400 dark:border-l-emerald-500',
  },
  pending: {
    label: 'Bekliyor',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
    border: 'border-l-amber-400 dark:border-l-amber-500',
  },
};

export default function TaskCard({ task, onEdit, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const status = STATUS[task.status] ?? STATUS.pending;
  const isCompleted = task.status === 'completed';

  const date = new Date(task.createdAt).toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div
      className={`task-card-enter group flex flex-col gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 border-l-4 ${status.border} rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3
          className={`text-sm font-semibold leading-snug transition-colors duration-200 ${
            isCompleted
              ? 'line-through text-gray-400 dark:text-gray-500'
              : 'text-gray-900 dark:text-gray-100'
          }`}
        >
          {task.title}
        </h3>
        <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${status.badge}`}>
          {status.label}
        </span>
      </div>

      {task.description && (
        <p
          className={`text-sm leading-relaxed transition-colors duration-200 ${
            isCompleted
              ? 'text-gray-400 dark:text-gray-600 line-through'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100 dark:border-gray-700">
        <p className="text-xs text-gray-400 dark:text-gray-500">{date}</p>

        {confirmDelete ? (
          <div className="flex items-center gap-2 animate-pulse-once">
            <span className="text-xs text-gray-500 dark:text-gray-400">Silinsin mi?</span>
            <button
              type="button"
              onClick={() => onDelete?.(task.id)}
              className="text-xs font-medium text-white bg-red-500 hover:bg-red-600 active:scale-95 px-2.5 py-1 rounded-md transition-all duration-150"
            >
              Evet
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              className="text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-150"
            >
              Hayır
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <button
              type="button"
              onClick={() => onEdit?.(task)}
              className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 hover:underline transition-colors duration-150"
            >
              Düzenle
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="text-xs font-medium text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:underline transition-colors duration-150"
            >
              Sil
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
