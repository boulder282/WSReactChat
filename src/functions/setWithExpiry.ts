const setWithExpiry = (key: string, value: string, ttl: number) => {
  const now = Date.now();
  const item = {
    value: value,
    expiry: now + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};
export default setWithExpiry;
