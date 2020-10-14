import React from 'react';
import ReactDOM from 'react-dom';
import { QueryRenderer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { Environment, Network, Store, RecordSource } from 'relay-runtime';
import './index.css';
import App from './App';

async function fetchQuery(operation, variables) {
  const response = await fetch('http://127.0.0.1:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  return response.json();
}

const env = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

ReactDOM.render(
  <QueryRenderer
    environment={env}
    query={graphql`
      query srcQuery($userId: String) {
        allMessage(userId: $userId) {
          list {
            title
            content
          }
        }
      }
    `}
    variables={{
      userId: '140',
    }}
    render={({ error, props }) => {
      if (props?.allMessage) {
        return <App allMessage={props.allMessage} />;
      } else if (error) {
        return <div>{error.message}</div>;
      }
      return <div>Loading</div>;
    }}
  />,
  document.getElementById('root')
);
