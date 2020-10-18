import React from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import MessageInput from './components/MessageInput';
import MessageList from './components/MessageList';
import { commit as AddMessageMutationCommit } from './mutations/AddMessageMutation';

const App = ({ relay, user }) => {
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
        <h1>Message App</h1>
      </header>

      <MessageInput user={user} onSubmit={onSubmit} />

      <MessageList user={user} />
    </div>
  );
};

export default createFragmentContainer(App, {
  user: graphql`
    fragment App_user on User {
      userId
      id
      ...MessageList_user
    }
  `,
});
