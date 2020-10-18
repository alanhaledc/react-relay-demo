const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');
const {
  connectionArgs,
  connectionFromArray,
  connectionDefinitions,
  nodeDefinitions,
  fromGlobalId,
  globalIdField,
} = require('graphql-relay');
const {
  USER_ID,
  getUser,
  getMessage,
  getMessages,
  Message,
  User,
} = require('../database');

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'Message') {
      return getMessage(id);
    } else if (type === 'User') {
      return getUser(id);
    }
    return null;
  },
  (obj) => {
    if (obj instanceof Message) {
      return GraphQLMessage;
    } else if (obj instanceof User) {
      return GraphQLUser;
    }
    return null;
  }
);

const GraphQLMessage = new GraphQLObjectType({
  name: 'Message',
  fields: {
    id: globalIdField('Message'),
    title: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (message) => message.title,
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (message) => message.content,
    },
  },
  interfaces: [nodeInterface],
});

const {
  connectionType: MessagesConnection,
  edgeType: GraphQLMessageEdge,
} = connectionDefinitions({
  name: 'Message',
  nodeType: GraphQLMessage,
});

const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),
    userId: {
      type: GraphQLString,
      resolve: () => USER_ID,
    },
    messages: {
      type: MessagesConnection,
      args: {
        status: {
          type: GraphQLString,
          defaultValue: 'any',
        },
        ...connectionArgs,
      },
      resolve: (root = {}, { status, after, before, first, last }) =>
        connectionFromArray([...getMessages()], {
          after,
          before,
          first,
          last,
        }),
    },
  },
  interfaces: [nodeInterface],
});

module.exports = {
  GraphQLMessage,
  GraphQLMessageEdge,
  GraphQLUser,
  nodeField,
};
