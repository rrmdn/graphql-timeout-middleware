// @flow
import {makeExecutableSchema} from 'graphql-tools';
import {graphql} from 'graphql';
import {random, lorem} from 'faker';
import {addMiddleware} from 'graphql-add-middleware';

import GraphQLTimeoutMiddleware from '../dist';

const typeDefs = [
  `type Reply {
    id: String,
    text: String,
  }`,
  `type Comment {
    id: String,
    text: String,
    replies: [Reply]
  }`,
  `type Post {
    id: String,
    text: String,
    comments: [Comment]
  }`,
  `type Query {
    getPosts: [Post]
  }`,
  `schema {
    query: Query
  }`,
];

const resolvers = {
  Comment: {
    replies: async () => {
      await new Promise(resolve => {
        setTimeout(resolve, 20000);
      });
      return [
        {
          id: random.uuid(),
          text: lorem.sentence(),
        },
      ];
    },
  },
  Post: {
    comments: () => [
      {
        id: random.uuid(),
        text: lorem.sentence(),
      },
      {
        id: random.uuid(),
        text: lorem.sentence(),
      },
    ],
  },
  Query: {
    getPosts: () => [
      {
        id: random.uuid(),
        text: lorem.sentence(),
      },
    ],
  },
};

const schema = makeExecutableSchema({typeDefs, resolvers});
addMiddleware(schema, GraphQLTimeoutMiddleware.middleware());
graphql(
  schema,
  `
    query {
      getPosts {
        id
        text
        comments {
          id
          text
          replies {
            id
            text
          }
        }
      }
    }
  `,
  {},
  {
    timeout: GraphQLTimeoutMiddleware.context(),
  }
).then(result => {
  console.log(JSON.stringify(result, null, 2));
});
