import { getData, postData } from "../Controller/YoutubeData.Controller.js";
import { verifyToken } from "../Middleware/verifyToken.js";

// Routes for YouTube data operations
export function routes(app) {
    app.get('/', getData);
    app.post('/post', verifyToken, postData); // Protected route
}