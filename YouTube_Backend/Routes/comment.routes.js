import { addComment, getComment, deleteComment, editComment } from "../Controller/comment.controller.js";

// Routes for comment operations
export function commentRoutes(app) {
    app.post('/add', addComment);
    app.get('/getComments', getComment);
    app.delete('/delete/:id', deleteComment);
    app.put('/edit/:id', editComment);
}