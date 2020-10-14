import React from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

const App = ({ relay, allMessage }) => {
  return (
    <ol style={{ margin: '10px' }}>
      {allMessage?.list.map(({ message, key }) => (
        <li key="item.id">
          <p>title: {message.title}</p>
          <p>content: {message.content}</p>
        </li>
      ))}
    </ol>
  );
};

export default createFragmentContainer(App, {
  allMessage: graphql`
    fragment App_allMessage on Message {
      list {
        id
        title
        content
      }
    }
  `,
});

// export default App;
