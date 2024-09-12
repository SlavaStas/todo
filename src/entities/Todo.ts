import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: "date", nullable: true })
  dueDate!: string;

  @Column({ nullable: true })
  location?: string;

  @Column()
  city!: string;

  @ManyToOne(() => User, user => user.todos)
  user!: User;
}
