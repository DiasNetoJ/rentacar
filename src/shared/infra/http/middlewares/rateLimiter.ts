import { createClient } from "redis";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";


const redisClient = createClient({
    url: 'redis://redis:6379'
});
/*{
    url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
}*/
redisClient.on('error', (err) => console.log('Redis Client Error', err));

// redisClient.connect();
const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rateLimiter',
    points: 10, // 10 requests
    duration: 1, // per 1 second by IP
  });
  
export default async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    try {
    await limiter.consume(request.ip);
    return next();
    } catch (err) {
        throw new AppError("Too many requests", 429);
    }
}