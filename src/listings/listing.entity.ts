import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity() marks this class as a database table blueprint.
// TypeORM will create/manage a "listing" table matching these fields.
@Entity()
export class Listing {
  // Auto-generated unique identifier. The database creates this itself —
  // never sent by the client.
  @PrimaryGeneratedColumn()
  id: number;

  // Plain required text field.
  @Column()
  title: string;

  @Column()
  description: string;

  // 'decimal' stores this precisely (important for money), avoiding
  // rounding issues that plain floating-point numbers can cause.
  @Column('decimal')
  price: number;

  // nullable: true means this field is allowed to be left empty.
  @Column({ nullable: true })
  category: string;

  @Column()
  imageUrl: string;

  // If nothing is provided, the database automatically fills in 'AVAILABLE'.
  @Column({ default: 'AVAILABLE' })
  status: string;

  // Automatically set to the exact moment this row is created — never
  // set manually.
  @CreateDateColumn()
  createdAt: Date;
}
