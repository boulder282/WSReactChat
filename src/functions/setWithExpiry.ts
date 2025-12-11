export const setWithExpiry = async (
  key: string,
  value: string,
  ttl: number
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("ExpirableStorage", 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("items")) {
        db.createObjectStore("items", { keyPath: "key" });
      }
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction("items", "readwrite");
      const store = transaction.objectStore("items");

      const item = {
        key: key,
        value: value,
        expiry: Date.now() + ttl,
      };

      const putRequest = store.put(item);

      // Когда транзакция завершена
      transaction.oncomplete = () => {
        db.close();
        resolve();
      };

      // Если ошибка транзакции
      transaction.onerror = () => {
        db.close();
        reject(transaction.error);
      };

      // Если ошибка конкретного запроса
      putRequest.onerror = (event) => {
        // Можно просто отклонить, транзакция сама вызовет onerror
        event.stopPropagation(); // предотвращаем всплытие
        db.close();
        reject(putRequest.error);
      };
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};
