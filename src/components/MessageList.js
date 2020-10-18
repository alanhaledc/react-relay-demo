import React from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import Message from './Message';

const MessageList = ({ relay, user }) => {
  const nodes = user.messages.edges.map((edge) => edge.node);

  return (
    <div>
      <p>user id: {user.userId}</p>
      <ol>
        {nodes.map((node) => (
          <Message key={node.id} user={user} message={node} />
        ))}
      </ol>
    </div>
  );
};

export default createFragmentContainer(MessageList, {
  user: graphql`
    fragment MessageList_user on User {
      userId
      id
      messages(first: 2147483647) @connection(key: "MessageList_messages") {
        edges {
          node {
            id
            ...Message_message
          }
        }
      }
      ...Message_user
    }
  `,
});
