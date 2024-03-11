import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
    constructor() {
        this.client = createClient()
            .on('error', (err) => console.log(err));

        this.getAsync = promisify(this.client.get).bind(this.client);
        this.setAsync = promisify(this.client.setex).bind(this.client);
        this.delAsync = promisify(this.client.del).bind(this.client);
    }

    isAlive() {
        return this.client.ready;
    }

    async get(key) {
        try {
            const value = await this.getAsync(key);
            return (value);
        } catch (err) {
            return ('There is a problem. This is the problem: ', err);
        }
    }

    async set(key, value, time) {
        try {
            await this.setAsync(key, time, value);
        } catch (err) {
            console.log('There is a problem. This is the problem: ', err);
        }
    }

    async del(key) {
        try {
            await this.delAsync(key);
        } catch (err) {
            console.log('Ahh nothing happened. Here is why: ', err);
        }
    }
}

const redisClient = new RedisClient();
export default redisClient;
