import { commitMutation } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import {} from "../"

const mutation = graphql`
  mutation CreateMessageMutation($input: ) {
    createMessage(input: $input) {
      id
      title
      content
    }
  }
`;

const commit = (env, user, title, content) => {
  const input = {
    userId: user.id,
    title,
    content,
  };
  return commitMutation(env, {
    mutation,
    variables: { input },
  });
};

export { commit };
