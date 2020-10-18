const { GraphQLNonNull, GraphQLID, GraphQLString } = require('graphql');
const { mutationWithClientMutationId, fromGlobalId } = require('graphql-relay');
const { getUser, getMessage, removeMessage } = require('../../database');
const { GraphQLUser } = require('../nodes');

const RemoveMessageMutation = mutationWithClientMutationId({
  name: 'RemoveMessage',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    user: {
      type: new GraphQLNonNull(GraphQLUser),
      resolve: ({ userId }) => getUser(userId),
    },
    deleteMessageId: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: ({ id }) => id,
    },
  },
  mutateAndGetPayload: ({ userId, id }) => {
    const localMessageId = fromGlobalId(id).id;
    removeMessage(localMessageId);
    return { userId, id };
  },
});

module.exports = {
  RemoveMessageMutation,
};
