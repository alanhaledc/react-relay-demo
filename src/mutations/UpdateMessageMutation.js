import { commitMutation } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

const mutation = graphql`
  mutation UpdateMessageMutation($input: UpdateMessageInput) {
    updateMessage(input: $input) {
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

const commit = (environment, { id, user, title, content }) => {
  const input = {
    userId: user.userId,
    id,
    title,
    content,
  };
  return commitMutation(environment, {
    mutation,
    variables: { input },
  });
};

export { commit };
