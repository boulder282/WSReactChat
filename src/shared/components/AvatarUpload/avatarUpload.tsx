// src/shared/utils/avatarUtils.ts

/**
 * Загружает аватар через input и сохраняет в localStorage
 * @param callback - функция, которую вызываем после загрузки (например, обновление состояния)
 */
export function uploadAvatar(callback: (base64: string) => void) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.onchange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    // Проверка размера
    if (file.size > 2 * 1024 * 1024) {
      alert("File size should be less than 2MB");
      return;
    }

    // Проверка типа
    if (!file.type.match("image.*")) {
      alert("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;

      // Сохраняем в localStorage
      localStorage.setItem("userAvatar", base64String);

      // Вызываем callback для обновления состояния
      callback(base64String);
    };
    reader.onerror = () => alert("Failed to read file");

    reader.readAsDataURL(file);
  };

  // Симулируем клик, чтобы открыть диалог выбора файла
  input.click();
}

/**
 * Удаляет аватар из localStorage
 * @param callback - функция, чтобы обновить состояние после удаления
 */
export function removeAvatar(callback?: () => void) {
  localStorage.removeItem("userAvatar");
  if (callback) callback();
}

/**
 * Получает текущий аватар из localStorage
 */
export function getAvatar(): string | null {
  try {
    return localStorage.getItem("userAvatar");
  } catch {
    return null;
  }
}
