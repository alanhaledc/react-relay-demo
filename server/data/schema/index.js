const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const { UserQuery } = require('./queries/UserQuery');
const { MessageQuery } = require('./queries/MessageQuery');

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: UserQuery,
    message: MessageQuery,
  },
});
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMessage: {
      type: GraphQLString,
      resolve: (newMsg) => newMsg,
    },
  },
});

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

module.exports = schema;
