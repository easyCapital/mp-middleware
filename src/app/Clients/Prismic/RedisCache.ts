import lru from 'redis-lru';

export default class RedisCache {
  private redis: any;
  private lru: any;

  constructor(redis: any) {
    this.redis = redis;
    this.lru = lru(this.redis, {
      max: 1000,
      score: () => 1,
      increment: true,
    });
  }

  public async isExpired(key, callback) {
    const entry = await this.lru.get(key, false);

    if (callback) {
      if (entry) {
        callback(false);
      } else {
        callback(true);
      }
    }
  }

  public async get(key, callback) {
    const entry = await this.lru.get(key);

    if (callback) {
      entry ? callback(null, JSON.parse(entry)) : callback(null);
    }
  }

  public async set(key, value, ttl, callback) {
    const timeToLive = 5184000 * 1000; // 60 days

    await this.lru.set(key, JSON.stringify(value), timeToLive);

    if (callback) {
      callback(null);
    }
  }

  public async remove(key, callback) {
    await this.lru.get(key);
    await this.lru.del(key);

    if (callback) {
      callback(null);
    }
  }

  public async clear(callback) {
    await this.lru.reset();

    if (callback) {
      callback(null);
    }
  }
}
