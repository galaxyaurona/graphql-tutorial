// tslint:disable:no-import-side-effect
import 'reflect-metadata';
import 'source-map-support/register';

import * as faker from 'faker';
import { getRepository } from 'typeorm';

import { globalCatchOnPromiseRejection } from './util/catch-promise-rejection';
import { connectDatabase } from './database';
import { User } from './entity/User';
import { Post } from './entity/Post';
import { PostCategories, PostCategory } from './types/PostCategory';

const createUsers = async (count = 50) => {
  const users = Array.from(Array(count)).map(() => {
    return getRepository(User).create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      isActive: faker.random.boolean(),
    });
  });

  return getRepository(User).save(users);
};

const createPosts = async (users: User[], count = 500) => {
  const posts = Array.from(Array(count)).map(() => {
    return getRepository(Post).create({
      title: faker.lorem.words(),
      body: faker.lorem.paragraphs(),
      category: PostCategories[Math.floor(Math.random()*PostCategories.length)] as PostCategory,
      author: { id: users[Math.floor(Math.random()*users.length)].id },
    });
  });

  return getRepository(Post).save(posts);
};

globalCatchOnPromiseRejection();
connectDatabase()
  .then(async () => {
    const users = await createUsers();
    await createPosts(users);
  })
  .catch(console.log);
