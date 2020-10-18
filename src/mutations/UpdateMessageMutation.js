import { commitMutation } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

const mutation = graphql`
  mutation UpdateMessageMutation($input: UpdateMessageInput!) {
    updateMessage(input: $input) {
      user {
        id
      }
      message {
        id
        title
        content
      }
    }
  }
`;

const commit = (environment, { user, message, title, content }) => {
  const input = {
    userId: user.userId,
    id: message.id,
    title,
    content,
  };
  return commitMutation(environment, {
    mutation,
    variables: { input },
  });
};

export { commit };
