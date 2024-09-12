import { AppDataSource } from "@/config/database";
import { User } from "@/entities/User";
import { UserService } from "@/services/userService";

export class AuthService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }


}
