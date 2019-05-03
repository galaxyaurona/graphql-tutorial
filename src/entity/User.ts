import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Post } from './Post';

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 64 })
  firstName: string;

  @Column({ length: 64, nullable: true })
  lastName: string;

  @Column({ length: 64 })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp', select: false })
  createdAt: number;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedAt: number;

  @OneToMany(() => Post, post => post.author, { onDelete: 'RESTRICT' })
  posts: Post[];
}
