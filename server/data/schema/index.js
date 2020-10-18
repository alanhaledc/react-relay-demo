const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { nodeField } = require('./nodes');
const { UserQuery } = require('./queries/UserQuery');
const { MessageQuery } = require('./queries/MessageQuery');
const { AddMessageMutation } = require('./mutations/AddMessageMutation');
const { UpdateMessageMutation } = require('./mutations/UpdateMessageMutation');
const { RemoveMessageMutation } = require('./mutations/RemoveMessageMutation');

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: UserQuery,
    message: MessageQuery,
    node: nodeField,
  },
});
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMessage: AddMessageMutation,
    updateMessage: UpdateMessageMutation,
    removeMessage: RemoveMessageMutation,
  },
});

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

module.exports = {
  schema,
};
