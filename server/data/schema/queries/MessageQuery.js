const { GraphQLNonNull, GraphQLString } = require('graphql');
const { getMessage } = require('../../database');
const { GraphQLMessage } = require('../nodes');

const MessageQuery = {
  type: new GraphQLNonNull(GraphQLMessage),
  args: {
    id: { type: GraphQLString },
  },
  resolve: (root = {}, { id }) => getMessage(id),
};

module.exports = {
  MessageQuery,
};
