const { GraphQLString } = require('graphql');
const { getUser } = require('../../database');

const UserQuery = {
  type: GraphQLString,
  args: {
    id: { type: GraphQLString },
  },
  resolve: ({ userId }) => getUser({ userId }),
};

module.exports = {
  UserQuery,
};
