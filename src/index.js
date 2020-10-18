import React from 'react';
import ReactDOM from 'react-dom';
import { QueryRenderer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { Environment, Network, Store, RecordSource } from 'relay-runtime';
import App from './App';

async function fetchQuery(operation, variables) {
  const response = await fetch('http://127.0.0.1:3800/graphql', {
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

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.render(
    <QueryRenderer
      environment={environment}
      query={graphql`
        query srcQuery($userId: String) {
          user(userId: $userId) {
            ...App_user
          }
        }
      `}
      variables={{
        userId: '140',
      }}
      render={({ error, props }) => {
        if (props && props.user) {
          return <App user={props.user} />;
        } else if (error) {
          return <div>{error.message}</div>;
        }
        return <div>Loading</div>;
      }}
    />,
    rootElement
  );
}
