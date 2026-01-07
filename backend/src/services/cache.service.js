const cache = new Map();

export const setCache = (key, value, ttlMs) => {
  const expiresAt = Date.now() + ttlMs;
  cache.set(key, { value, expiresAt });
};

export const getCache = (key) => {
  const entry = cache.get(key);

  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }

  return entry.value;
};

export const getCacheStatus = () => {
  return Array.from(cache.keys());
};

export const clearCache = () => {
  cache.clear();
};

