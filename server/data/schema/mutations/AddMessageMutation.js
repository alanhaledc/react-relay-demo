const { GraphQLNonNull, GraphQLID, GraphQLString } = require('graphql');
const {
  cursorForObjectInConnection,
  mutationWithClientMutationId,
} = require('graphql-relay');
const {
  getUser,
  getMessage,
  getMessages,
  addMessage,
} = require('../../database');
const { GraphQLUser, GraphQLMessageEdge } = require('../nodes');

const AddMessageMutation = mutationWithClientMutationId({
  name: 'AddMessage',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    user: {
      type: new GraphQLNonNull(GraphQLUser),
      resolve: ({ userId }) => getUser(userId),
    },
    messageEdge: {
      type: new GraphQLNonNull(GraphQLMessageEdge),
      resolve: ({ messageId }) => {
        const message = getMessage(messageId);
        return {
          cursor: cursorForObjectInConnection([...getMessages()], message),
          node: message,
        };
      },
    },
  },
  mutateAndGetPayload: ({ userId, title, content }) => {
    const messageId = addMessage(title, content);
    return { userId, messageId };
  },
});

module.exports = {
  AddMessageMutation,
};
