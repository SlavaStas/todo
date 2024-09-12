import { AppDataSource } from "../config/database";
import { Todo } from "../entities/Todo";
import { User } from "../entities/User";

export class TodoService {
  static async createTodo(todoData: Partial<Todo>, userId: number): Promise<Todo | null> {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });
    const { title, description, dueDate, location, city} = todoData;

    if (!user) {
      return null;
    }

    const todoRepository = AppDataSource.getRepository(Todo);
    const todo = todoRepository.create({ title, description, dueDate, location, city, user });
    await todoRepository.save(todo);

    return todo;
  }

  static async updateTodo(newTodo: Partial<Todo>, userId: number): Promise<Todo | null> {
    const todoRepository = AppDataSource.getRepository(Todo);
    let todo = await todoRepository.findOne({ where: { id: newTodo.id, user: { id: userId } } });

    if (!todo) {
      return null;
    }

    todo.title = newTodo.title || todo.title;
    todo.description = newTodo.description || todo.description;
    todo.dueDate = newTodo.dueDate || todo.dueDate;
    todo.location = newTodo.location || todo.location;
    todo.city = newTodo.city || todo.city;

    return await todoRepository.save(todo);
  }

  static async deleteTodo(id: number, userId: number): Promise<string | null> {
    const todoRepository = AppDataSource.getRepository(Todo);
    const todo = await todoRepository.findOne({ where: { id: Number(id), user: { id: userId } } });

    if (!todo) {
      return null
    }

    await todoRepository.remove(todo);
    return "Todo deleted successful"
  }
}
