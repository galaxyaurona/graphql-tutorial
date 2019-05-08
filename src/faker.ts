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
  return Array.from(Array(count)).reduce(total => {
    return total.then(async (users: User[]) => {
      const user = getRepository(User).create({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        isActive: faker.random.boolean(),
      });

      users.push(await getRepository(User).save(user));

      return users;
    });
  }, new Promise(r => r([])));
};

const createPosts = async (users: User[], count = 500) => {
  return Array.from(Array(count)).reduce(total => {
    return total.then(async (posts: Post[]) => {
      const post = getRepository(Post).create({
        title: faker.lorem.words(),
        body: faker.lorem.paragraphs(),
        category: PostCategories[Math.floor(Math.random()*PostCategories.length)] as PostCategory,
        author: { id: users[Math.floor(Math.random()*users.length)].id },
      });

      posts.push(await getRepository(Post).save(post));

      return posts;
    });
  }, new Promise(r => r([])));
};

globalCatchOnPromiseRejection();
connectDatabase()
  .then(async () => {
    const users = await createUsers();
    await createPosts(users);
  })
  .catch(console.log);
