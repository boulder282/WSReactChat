export const getWithExpiry = async (key: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("ExpirableStorage", 1); // открытие стора, название стора и версия

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("items")) {
        // нету стора?
        db.createObjectStore("items", { keyPath: "key" }); // создадим
      }
    };

    request.onsuccess = (event) => {
      // если у нас все отлично
      const db = (event.target as IDBOpenDBRequest).result; // хз что это
      const transaction = db.transaction("items", "readonly");
      const store = transaction.objectStore("items");
      const getRequest = store.get(key);

      getRequest.onsuccess = () => {
        const item = getRequest.result;

        if (!item) {
          db.close();
          resolve(null);
          return;
        }

        // Проверяем срок годности
        if (Date.now() > item.expiry) {
          // Просрочено - удаляем асинхронно
          db.close();

          // Удаляем в фоне
          const deleteRequest = indexedDB.open("ExpirableStorage", 1);
          deleteRequest.onsuccess = (e) => {
            const deleteDb = (e.target as IDBOpenDBRequest).result;
            const deleteTransaction = deleteDb.transaction(
              "items",
              "readwrite"
            );
            const deleteStore = deleteTransaction.objectStore("items");
            deleteStore.delete(key);
            deleteDb.close();
          };

          resolve(null);
        } else {
          db.close();
          resolve(item.value);
        }
      };

      getRequest.onerror = () => {
        db.close();
        reject(getRequest.error);
      };
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};
