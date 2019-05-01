import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from './Post';

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 64, nullable: false })
  firstName: string;

  @Column({ length: 64 })
  lastName: string;

  @Column({ length: 64, nullable: false })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Post, post => post.author, { onDelete: 'RESTRICT' })
  posts: Post[];
}
