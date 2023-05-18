const { REDIS_USERNAME, REDIS_PASSWORD, REDIS_HOST, REDIS_PORT, REDIS_DOCKER } = process.env;

function buildRedisUrl() {

  if (!REDIS_USERNAME || !REDIS_PASSWORD) {
    return `redis://${REDIS_HOST}:${REDIS_PORT}`;
  }

  return `redis://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`;
}

export const redisUrl = buildRedisUrl();

