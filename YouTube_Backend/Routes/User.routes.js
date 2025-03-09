import { login, register } from "../Controller/User.controller.js";

// Routes for user operations
export function userRoutes(app) {
    app.post('/register', register);
    app.post('/login', login);
}