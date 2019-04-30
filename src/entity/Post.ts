import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { PostCategories, PostCategory } from '../types/PostCategory';

@Entity()
export class Post {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 256 })
  title: string;

  @Column({ type: 'text'})
  body: string;

  @Column({ type: 'enum', enum: PostCategories })
  category: PostCategory;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;
}
