/**
 * Форматирование времени в удобном формате
 * @param timestamp
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diffInSeconds = Math.floor((now - timestamp * 1000) / 1000);

  if (diffInSeconds < 60) return 'менее минуты назад';
  if (diffInSeconds < 120) return 'минуту назад';

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 30) return `${diffInMinutes} мин назад`;
  if (diffInMinutes < 60) return 'полчаса назад';

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 2) return 'час назад';
  if (diffInHours < 24) return `${diffInHours} ч назад`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return 'вчера';
  if (diffInDays < 7) return `${diffInDays} дн назад`;

  return new Date(timestamp * 1000).toLocaleDateString();
}

/**
 * Форматирование секунд длительности в удобном формате
 * @param seconds
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts: string[] = [];
  if (hours) parts.push(`${hours} ч.`);
  if (minutes) parts.push(`${minutes} м.`);
  if (secs || parts.length === 0) parts.push(`${secs} с.`);

  return parts.join(' ');
}

/**
 * Возвращает Integer или null при невозможности преобразования
 * @param number
 */
export function getInteger(number: string | number | null): number | null {
  const parsed = number !== null ? Number(number) : null;
  return parsed !== null && Number.isInteger(parsed) ? parsed : null
}

/**
 * Копирует url страницы в буфер обмена
 */
export async function copyUrl(): Promise<boolean> {
  const url = window.location.href;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch {
      return fallbackCopy(url);
    }
  }

  return fallbackCopy(url);
}

/**
 * Копирует текст с помощью создания элемента textarea
 * @param text
 */
function fallbackCopy(text: string): boolean {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  let success;
  try {
    success = document.execCommand('copy');
  } catch {
    success = false;
  }

  document.body.removeChild(textarea);
  return success;
}