const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const { USER_ID, getUser } = require('../database');

const GraphQLMessage = new GraphQLObjectType({
  name: 'Message',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (message) => message.id,
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (message) => message.title,
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (message) => message.content,
    },
  },
});

const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: {
    userId: {
      type: GraphQLString,
      resolve: () => USER_ID,
    },
    messages: {
      type: new GraphQLList(GraphQLMessage),
      resolve: () => getUser().messageList,
    },
  },
});

module.exports = {
  GraphQLMessage,
  GraphQLUser,
};
