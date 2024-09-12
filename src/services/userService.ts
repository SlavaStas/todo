import { User } from "../entities/User";
import { AppDataSource } from "../config/database";
import { Repository } from "typeorm";

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async createNewUser(email: string, password: string): Promise<User> {
    const user = this.userRepository.create({ email, password });
    return await this.userRepository.save(user);
  }
}