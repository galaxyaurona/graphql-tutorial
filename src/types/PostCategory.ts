import { Union, Literal, Static } from 'runtypes';

export const PostCategories: Array<string> = [
  'National',
  'International',
  'Technology',
  'Sport',
  'Entertainment',
];

export const PostCategory = Union(
  Literal('National'),
  Literal('International'),
  Literal('Technology'),
  Literal('Sport'),
  Literal('Entertainment'),
);

export type PostCategory = Static<typeof PostCategory>;
