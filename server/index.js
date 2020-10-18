const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { schema } = require('./data/schema');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    pretty: true,
    graphiql: true,
  })
);

const PORT = 3800 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
});
