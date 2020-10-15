import React from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

const App = ({ relay, allMessage }) => {
  return (
    <div style={{margin: "10px"}}>
      <h1>App pages</h1>
      <ul>
        {allMessage.list.map((message) => (
          <li key={message.id}>
            <p>title: {message.title}</p>
            <p>content: {message.content}</p>
          </li>
        ))}
      </ul>
      p
    </div>
  );
};

export default createFragmentContainer(App, {
  allMessage: graphql`
    fragment App_allMessage on Messages {
      list {
        id
        title
        content
      }
    }
  `,
});

// export default App;
