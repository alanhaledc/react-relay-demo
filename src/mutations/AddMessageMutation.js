import { commitMutation } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
  mutation AddMessageMutation($input: AddMessageInput!) {
    addMessage(input: $input) {
      user {
        id
      }
      messageEdge {
        __typename
        cursor
        node {
          id
          title
          content
        }
      }
    }
  }
`;

const sharedUpdater = (store, user, newEdge) => {
  const userProxy = store.get(user.id);
  const conn = ConnectionHandler.getConnection(
    userProxy,
    'MessageList_messages'
  );
  ConnectionHandler.insertEdgeAfter(conn, newEdge);
};

const commit = (environment, { user, title, content }) => {
  const input = {
    userId: user.userId,
    title,
    content,
  };
  return commitMutation(environment, {
    mutation,
    variables: { input },
    updater: (store) => {
      const payload = store.getRootField('addMessage');
      const newEdge = payload.getLinkedRecord('messageEdge');
      sharedUpdater(store, user, newEdge);
    },
  });
};

export { commit };
