const { GraphQLString, GraphQLNonNull } = require('graphql');
const { getUser } = require('../../database');
const { GraphQLUser } = require('../nodes');

const UserQuery = {
  type: new GraphQLNonNull(GraphQLUser),
  args: {
    userId: { type: GraphQLString },
  },
  resolve: (root = {}, { userId }) => getUser(userId),
};

module.exports = {
  UserQuery,
};
