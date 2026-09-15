import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Listing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column({ nullable: true })
  category: string;

  @Column()
  imageUrl: string;

  @Column({ default: 'AVAILABLE' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
