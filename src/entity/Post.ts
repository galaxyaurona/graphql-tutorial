import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, CreateDateColumn, UpdateDateColumn, Generated } from 'typeorm';
import { PostCategories, PostCategory } from '../types/PostCategory';
import { User } from './User';

@Entity()
export class Post {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated()
  @Column()
  serial: number;

  @Column({ length: 256 })
  title: string;

  @Column({ type: 'text', nullable: true})
  body: string;

  @Column({ type: 'enum', enum: PostCategories, default: 'National' })
  category: PostCategory;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedAt: Date;

  @ManyToOne(() => User, user => user.posts, { nullable: false })
  author: User;
}
