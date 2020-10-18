const { GraphQLNonNull, GraphQLID, GraphQLString } = require('graphql');
const { mutationWithClientMutationId, fromGlobalId } = require('graphql-relay');
const { getUser, getMessage, updateMessage } = require('../../database');
const { GraphQLUser, GraphQLMessage } = require('../nodes');

const UpdateMessageMutation = mutationWithClientMutationId({
  name: 'UpdateMessage',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    user: {
      type: new GraphQLNonNull(GraphQLUser),
      resolve: ({ userId }) => getUser(userId),
    },
    message: {
      type: new GraphQLNonNull(GraphQLMessage),
      resolve: ({ messageId }) => getMessage(messageId),
    },
  },
  mutateAndGetPayload: ({ userId, id, title, content }) => {
    const messageId = fromGlobalId(id).id;
    updateMessage(messageId, title, content);
    return { userId, messageId };
  },
});

module.exports = {
  UpdateMessageMutation,
};
