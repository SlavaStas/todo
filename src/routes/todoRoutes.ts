import { Router } from "express";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../controllers/todoController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/todos", authMiddleware, getTodos);
router.post("/todos", authMiddleware, createTodo);
router.put("/todos/:id", authMiddleware, updateTodo);
router.delete("/todos/:id", authMiddleware, deleteTodo);

export default router;
