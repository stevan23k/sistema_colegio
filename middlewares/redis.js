import redis from "../index.js"
const cacheMiddleware = (keyPrefix, expiration = 60 * 10) => {
    return async (req, res, next) => {
        const key = keyPrefix + JSON.stringify(req.body || req.params || {})
        try {

            const data = await redis.get(key)
            if (data) {
                res.status(200).json(JSON.parse(data))
                return
            }

            const originResponse = res.json.bind(res)
            res.json = async (data) => {
                await redis.setEx(key, expiration, JSON.stringify(data))
                return originResponse(data)
            }

            next()

        } catch (error) {
            console.error("Error in cache middleware:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
export default cacheMiddleware;
