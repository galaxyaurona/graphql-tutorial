import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, Generated } from 'typeorm';
import { Post } from './Post';

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated()
  @Column({ select: false })
  serial: number;

  @Column({ length: 64 })
  firstName: string;

  @Column({ length: 64, nullable: true })
  lastName: string;

  @Column({ length: 64 })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp', select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedAt: Date;

  @OneToMany(() => Post, post => post.author, { onDelete: 'RESTRICT' })
  posts: Post[];
}
