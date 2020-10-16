import { commitMutation } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
  mutation RemoveMessageMutation($input: RemoveMessageInput) {
    removeMessage(input: $input) {
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

const sharedUpdater = (store, user, deleteMessageId) => {
  const userProxy = store.getRootField('removeMessage').getLinkedRecord(user);
  console.log(userProxy.getValue('userId'));
  const conn = ConnectionHandler.getConnection(
    userProxy,
    'MessageList_messageList'
  );
  ConnectionHandler.deleteNode(conn, deleteMessageId);
};

const commit = (environment, { user, id }) => {
  const input = {
    userId: user.userId,
    id,
  };
  return commitMutation(environment, {
    mutation,
    variables: { input },
    updater: (store) => {
      const payload = store.getRootField('removeMessage');
      const message = payload.getLinkedRecord('message');
      const deleteMessageId = message.getValue('id');
      sharedUpdater(store, user, deleteMessageId);
    },
  });
};

export { commit };
