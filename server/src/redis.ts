import Redis from "ioredis";

import { REDIS_OPTIONS } from "./config";

export const client = new Redis(REDIS_OPTIONS);
