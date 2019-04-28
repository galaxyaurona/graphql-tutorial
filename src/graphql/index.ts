import * as path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { Application } from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

export const addGraphQL = (app: Application, uriPath: string): ApolloServer => {
  // Type definitions.
  const typeDefs = gql`${mergeTypes(
    fileLoader(path.join(__dirname, '../../schemas/**/*.gql'), { recursive: true }),
    { all: true },
  )}`;

  // Resolver object.
  const resolvers = mergeResolvers(
    fileLoader(path.join(__dirname, './resolvers'), { recursive: true })
  );

  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app, path: uriPath });

  return server;
};
