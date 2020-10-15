const { GraphQLNonNull } = require('graphql');
const { getMessage } = require('../../database');
const { GraphQLMessage } = require('../nodes');

const MessageQuery = {
  type: new GraphQLNonNull(GraphQLMessage),
  resolve: ({ userId, id }) => getMessage({ userId, id }),
};

module.exports = {
  MessageQuery,
};
