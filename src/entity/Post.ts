import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { PostCategories, PostCategory } from '../types/PostCategory';
import { User } from './User';

@Entity()
export class Post {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 256, nullable: false })
  title: string;

  @Column({ type: 'text'})
  body: string;

  @Column({ type: 'enum', enum: PostCategories, default: 'National' })
  category: PostCategory;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @ManyToOne(() => User, user => user.posts, { nullable: false })
  author: User;
}
