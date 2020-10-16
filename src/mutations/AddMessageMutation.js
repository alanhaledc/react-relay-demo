import { commitMutation } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
  mutation AddMessageMutation($input: AddMessageInput) {
    addMessage(input: $input) {
      user {
        userId
        messageList {
          id
          title
          content
        }
      }
      message {
        id
        title
        content
      }
    }
  }
`;

const sharedUpdater = (store, user, newMessage) => {
  const userProxy = store.getRootField('addMessage').getLinkedRecord('user');
  const conn = ConnectionHandler.getConnection(
    userProxy,
    'MessageList_messageList'
  );
  ConnectionHandler.insertEdgeAfter(conn, newMessage);
};

const commit = (environment, { user, title, content }) => {
  console.log('user', user);
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
      const newMessage = payload.getLinkedRecord('message');
      sharedUpdater(store, user, newMessage);
    },
  });
};

export { commit };
