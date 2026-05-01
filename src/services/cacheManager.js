
const cache = new Map();

export const setCache = (key, data, ttl = 5000) => {
  if (!key) {
    console.error("❌ Cache SET ERROR: clé vide ou undefined");
    return false;
  }
  if (data === undefined || data === null) {
    console.warn("⚠️  Cache SET: tentative de cache avec data null/undefined");
    return false;
  }
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl: ttl || 5000
  });
  console.log(`✅ Cache SET: ${key} (TTL: ${ttl || 5000}ms)`);
  return true;
};

export const getCache = (key, ttl = null) => {
  if (!key) {
    console.error("❌ Cache GET ERROR: clé vide ou undefined");
    return null;
  }

  const entry = cache.get(key);
  
  if (!entry) {
    console.log(`⏳ Cache MISS: ${key} (non trouvé)`);
    return null;
  }
  
  // Utiliser le TTL du cache ou celui fourni en paramètre
  const effectiveTtl = ttl || entry.ttl || 5000;
  
  if (typeof effectiveTtl !== 'number' || effectiveTtl < 0) {
    console.error(`❌ Cache GET ERROR: TTL invalide (${effectiveTtl})`);
    return null;
  }
  
  const isExpired = Date.now() - entry.timestamp > effectiveTtl;

  if (isExpired) {
    console.log(`⏰ Cache EXPIRED: ${key} (âge: ${Date.now() - entry.timestamp}ms, TTL: ${effectiveTtl}ms)`);
    cache.delete(key);
    return null;
  }

  console.log(`✅ Cache HIT: ${key} (âge: ${Date.now() - entry.timestamp}ms)`);
  return entry.data;
};

export const clearCache = (key) => {
  if (key) {
    cache.delete(key);
    console.log(`🗑️  Cache CLEARED: ${key}`);
  } else {
    cache.clear();
    console.log("🗑️  Cache CLEARED: tout");
  }
};

export const getCacheStats = () => {
  console.log(`📊 Cache Stats: ${cache.size} clés stockées`);
  return { size: cache.size, keys: Array.from(cache.keys()) };
};