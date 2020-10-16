import React from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import MessageInput from './MessageInput';
import Message from './Message';
import { commit as AddMessageMutationCommit } from '../mutations/AddMessageMutation';

const MessageList = ({ relay, user }) => {
  const onSubmit = (title, content) => {
    AddMessageMutationCommit(relay.environment, {
      user,
      title,
      content,
    });
  };

  return (
    <div style={{ margin: '10px' }}>
      <header>
        <h1>Message List</h1>
      </header>

      <MessageInput user={user} onSubmit={onSubmit} />

      <section>
        <div>
          <p>user id: {user.userId}</p>
          <ol>
            {user.messageList.map((message) => (
              <Message user={user} message={message} />
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
};

export default createFragmentContainer(MessageList, {
  user: graphql`
    fragment MessageList_user on User {
      userId
      messageList {
        id
        title
        content
      }
    }
  `,
});
