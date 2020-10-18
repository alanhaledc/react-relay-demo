import { commitMutation } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
  mutation RemoveMessageMutation($input: RemoveMessageInput!) {
    removeMessage(input: $input) {
      user {
        id
      }
      deleteMessageId
    }
  }
`;

const sharedUpdater = (store, user, deleteMessageId) => {
  const userProxy = store.get(user.id);
  const conn = ConnectionHandler.getConnection(
    userProxy,
    'MessageList_messages'
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
      const deleteMessageId = payload.getValue('deleteMessageId');
      sharedUpdater(store, user, deleteMessageId);
    },
  });
};

export { commit };
