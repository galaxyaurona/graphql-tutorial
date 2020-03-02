import * as nodePath from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { Application } from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

export const addGraphQL = (app: Application, path: string): ApolloServer => {
  // Type definitions.
  const schemas = mergeTypes(
    fileLoader(nodePath.join(__dirname, '../../schemas/**/*.gql'), { recursive: true }),
    { all: true },
  );
  const typeDefs = gql`${schemas}`;

  // Resolver object.
  const resolvers = mergeResolvers(
    fileLoader(nodePath.join(__dirname, './resolvers'), { recursive: true }),
  );

  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app, path });

  return server;
};
