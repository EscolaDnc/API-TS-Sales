import { Request, Response, NextFunction } from 'express';
import { createClient, RedisClientOptions } from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASS || undefined,
});

redisClient.connect().catch(console.error);

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1,
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip as string);

    return next();
  } catch (err) {
    throw new AppError('Too many requests.', 429);
  }
}
