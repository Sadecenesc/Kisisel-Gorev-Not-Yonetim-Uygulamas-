import { useState, useEffect } from 'react';
import { createTask } from '../interfaces/taskInterface';

export default function TaskForm({ onAdd, editingTask, onUpdate, onCancel }) {
  const isEditing = Boolean(editingTask);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setError('');
    } else {
      setTitle('');
      setDescription('');
      setError('');
    }
  }, [editingTask]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      setError('Başlık zorunludur.');
      return;
    }

    if (isEditing) {
      const updated = { ...editingTask, title: title.trim(), description: description.trim() };
      const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
      const next = stored.map((t) => (t.id === updated.id ? updated : t));
      localStorage.setItem('tasks', JSON.stringify(next));
      onUpdate?.(updated);
    } else {
      const newTask = createTask({ title: title.trim(), description: description.trim() });
      const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
      localStorage.setItem('tasks', JSON.stringify([...stored, newTask]));
      onAdd?.(newTask);
    }

    setTitle('');
    setDescription('');
    setError('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-4 rounded-2xl p-5 sm:p-6 shadow-sm border transition-all duration-200 ${
        isEditing
          ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-700 ring-2 ring-indigo-300 dark:ring-indigo-600'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">{isEditing ? '✏️' : '➕'}</span>
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">
          {isEditing ? 'Görevi Düzenle' : 'Yeni Görev Ekle'}
        </h2>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="task-title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Başlık <span className="text-red-500">*</span>
        </label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setError(''); }}
          placeholder="Görev başlığı girin…"
          className="rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-150 placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
        {error && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="task-desc" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Açıklama
          <span className="ml-1.5 text-xs font-normal text-gray-400 dark:text-gray-500">(isteğe bağlı)</span>
        </label>
        <textarea
          id="task-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Daha fazla ayrıntı ekleyin…"
          rows={3}
          className="rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-150 resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
      </div>

      <div className="flex justify-end gap-2 pt-1">
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm font-medium px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95 transition-all duration-150"
          >
            İptal
          </button>
        )}
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-medium px-5 py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-150"
        >
          {isEditing ? 'Kaydet' : 'Ekle'}
        </button>
      </div>
    </form>
  );
}
