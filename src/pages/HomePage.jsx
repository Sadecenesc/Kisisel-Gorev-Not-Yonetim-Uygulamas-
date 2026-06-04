import { useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
  } catch {
    return [];
  }
}

export default function HomePage() {
  const [tasks, setTasks] = useState(loadTasks);
  const [editingTask, setEditingTask] = useState(null);

  function handleAdd(newTask) {
    setTasks((prev) => [...prev, newTask]);
  }

  function handleEdit(task) {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleUpdate(updated) {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setEditingTask(null);
  }

  function handleCancel() {
    setEditingTask(null);
  }

  function handleDelete(id) {
    const next = tasks.filter((t) => t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(next));
    setTasks(next);
    if (editingTask?.id === id) setEditingTask(null);
  }

  const completedCount = tasks.filter((t) => t.status === 'completed').length;

  return (
    <div className="px-4 sm:px-6 py-8 sm:py-10">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">

        {/* Sayfa başlığı */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
              Görevlerim
            </h1>
            {tasks.length > 0 && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {completedCount} / {tasks.length} tamamlandı
              </p>
            )}
          </div>

          {tasks.length > 0 && (
            <div className="shrink-0">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span>Tamamlandı</span>
                <span className="ml-2 inline-block w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span>Bekliyor</span>
              </div>
            </div>
          )}
        </div>

        {/* Form */}
        <TaskForm
          onAdd={handleAdd}
          editingTask={editingTask}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
        />

        {/* Görev listesi */}
        <section className="flex flex-col gap-3">
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-3xl shadow-inner">
                📋
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Henüz hiç görev yok
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  Yukarıdaki formu kullanarak ilk görevini ekle.
                </p>
              </div>
            </div>
          ) : (
            <>
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
              <p className="text-center text-xs text-gray-400 dark:text-gray-600 pt-2">
                Toplam {tasks.length} görev
              </p>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
