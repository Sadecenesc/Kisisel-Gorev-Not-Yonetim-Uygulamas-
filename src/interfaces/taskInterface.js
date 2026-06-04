/**
 * @typedef {Object} Task
 * @property {string} id          - Benzersiz tanımlayıcı (crypto.randomUUID)
 * @property {string} title       - Görev başlığı
 * @property {string} description - Görev açıklaması
 * @property {'pending'|'completed'} status - Görev durumu
 * @property {number} createdAt   - Oluşturulma zamanı (Date.now())
 */

/**
 * @param {Partial<Task>} fields
 * @returns {Task}
 */
export function createTask(fields = {}) {
  return {
    id: crypto.randomUUID(),
    title: '',
    description: '',
    status: 'pending',
    createdAt: Date.now(),
    ...fields,
  };
}
