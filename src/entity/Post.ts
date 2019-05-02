import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PostCategories, PostCategory } from '../types/PostCategory';
import { User } from './User';

@Entity()
export class Post {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 256 })
  title: string;

  @Column({ type: 'text', nullable: true})
  body: string;

  @Column({ type: 'enum', enum: PostCategories, default: 'National' })
  category: PostCategory;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedAt: string;

  @ManyToOne(() => User, user => user.posts, { nullable: false })
  author: User;
}
