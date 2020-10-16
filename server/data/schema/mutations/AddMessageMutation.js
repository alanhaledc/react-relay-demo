const { GraphQLNonNull, GraphQLString } = require('graphql');
const { mutationWithClientMutationId } = require('graphql-relay');

const AddMessageMutation = mutationWithClientMutationId({
  name: 'AddMessage',
  inputFields: {
    usrId: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    user: {},
    messages: {
      type: new GraphQLNonNull(),
    },
  },
  mutateAndGetPayload: ({ userId, title, content }) => {
    return { userId, title, content };
  },
});

module.exports = {
  AddMessageMutation,
};
