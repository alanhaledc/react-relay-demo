const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

const schema = buildSchema(`
  input MessageInput {
    title: String
    content: String
  }

  type Message {
    id: String
    title: String
    content: String
  }

  type Messages {
    list: [Message]
  }

  type Result {
    success: Boolean
    status: String
  }

  type Query {
    allMessage(userId: String): Messages
    message(userId: String, messageId: String): Message
  }

  type Mutation {
    createMessage(userId: String, input: MessageInput): Message
    updateMessage(userId: String, messageId: String, input: MessageInput): Message
    removeMessage(userId: String, messageId: String): Result
  }
`);

class Message {
  constructor(id, { title, content }) {
    this.id = id;
    this.title = title;
    this.content = content;
  }
}

const messageById = new Map();
const messageIdsByUserId = new Map();

let tmpId = 0;

function addMessage({ title, content }) {
  const messageId = `msg${tmpId++}`;
  const message = new Message(messageId, { title, content });
  messageById.set(messageId, message);
  const userId = '140';
  messageIdsByUserId.set(
    userId,
    (messageIdsByUserId.get(userId) ?? []).concat(messageId)
  );
}

addMessage({ title: 'python', content: 'study python' });
addMessage({ title: 'typescript', content: 'study typescript' });

const root = {
  allMessage({ userId }) {
    const messageIds = messageIdsByUserId.get(userId);
    const messages = [];
    for (const messageId of messageIds) {
      const message = messageById.get(messageId);
      messages.push(message);
    }
    return { list: messages };
  },
  message: ({ userId, messageId }) => {
    if (!messageById.has(messageId)) {
      throw new Error('no message exists with id ' + messageId);
    }
    return messageById.get(messageId);
  },
  createMessage: ({ userId, input }) => {
    const id = `msg${tmpId++}`;
    const message = new Message(id, input);
    messageById.set(id, message);
    const messageIds = messageIdsByUserId.get(userId);
    messageIds.push(id);
    return message;
  },
  updateMessage: ({ userId, messageId, input }) => {
    if (!messageById.has(messageId)) {
      throw new Error('no message exists with id ' + messageId);
    }
    const message = new Message(messageId, input);
    messageById.set(messageId, message);
    return message;
  },
  removeMessage: ({ userId, messageId }) => {
    if (!messageById.has(messageId)) {
      throw new Error('no message exists with id ' + messageId);
    }
    messageById.delete(messageId);
    return {
      success: true,
      status: '200',
    };
  },
};

const app = express();
app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

const PORT = 4000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
});
