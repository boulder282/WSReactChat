export default function getWithExpiry(key: string) {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = Date.now();

  // Если время вышло — удалить и вернуть null
  if (now > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}
