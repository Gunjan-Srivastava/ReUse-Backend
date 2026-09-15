import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // unique: true — enforced at the database level. Two users can never
  // share the same email; also how a user logs in later.
  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  // @Exclude() tells the ClassSerializerInterceptor (set up in main.ts)
  // to strip this field out of every API response automatically —
  // so the hashed password never reaches the client, ever.
  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;
}
