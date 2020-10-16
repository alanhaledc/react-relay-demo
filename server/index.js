const express = require('express');
const { graphqlHTTP } = require('express-graphql');
// const schema = require('./data/schema');
const { buildSchema } = require('graphql');
const cors = require('cors');

const schema = buildSchema(`
  type Message {
    id: String
    title: String
    content: String
  }

  type User {
    userId: String
    messageList: [Message]
  }

  input MessageInput {
    userId: String
    id: String
  }

  type MessagePayload {
    user: User 
    message: Message
  }

  type Query {
    user(userId: String): User
    message(input: MessageInput): MessagePayload
  }

  type Mutation {
    addMessage(input: AddMessageInput): AddMessagePayload
    updateMessage(input: UpdateMessageInput): UpdateMessagePayload
    removeMessage(input: RemoveMessageInput): RemoveMessagePayload
  }

  input AddMessageInput {
    userId: String
    title: String
    content: String
  }

  type AddMessagePayload {
    user: User
    message: Message
  }

  input UpdateMessageInput {
    userId: String
    id: String
    title: String
    content: String
  }

  type UpdateMessagePayload {
    user: User
    message: Message
  }

  input RemoveMessageInput {
    userId: String
    id: String
  }

  type RemoveMessagePayload {
    user: User
    message: Message
  }
`);

class Message {
  constructor(id, title, content) {
    this.id = id;
    this.title = title;
    this.content = content;
  }
}

const messageById = new Map();
const idsByUserId = new Map();
let tmpId = 0;

const rootValue = {
  user({ userId }) {
    const ids = idsByUserId.get(userId);
    const messageList = [];
    for (const id of ids) {
      const message = messageById.get(id);
      messageList.push(message);
    }
    return {
      userId,
      messageList,
    };
  },

  message({ input: { userId, id } }) {
    if (!messageById.has(id)) {
      throw new Error('no message exists with id ' + id);
    }
    const message = messageById.get(id);
    return {
      user: this.user({ userId }),
      message,
    };
  },

  addMessage({ input: { userId, title, content } }) {
    const id = `msg${tmpId++}`;
    const message = new Message(id, title, content);
    messageById.set(id, message);
    const ids = idsByUserId.get(userId) || [];
    idsByUserId.set(userId, ids.concat(id));
    return {
      user: this.user({ userId }),
      message,
    };
  },

  updateMessage({ input: { userId, id, title, content } }) {
    if (!messageById.has(id)) {
      throw new Error('no message exists with id ' + id);
    }
    const message = new Message(id, title, content);
    messageById.set(id, message);
    return {
      user: this.user({ userId }),
      message,
    };
  },

  removeMessage({ input: { userId, id } }) {
    if (!messageById.has(id)) {
      throw new Error('no message exists with id ' + id);
    }
    const message = messageById.get(id);
    const ids = idsByUserId.get(userId);
    const index = ids.indexOf(id);
    if (index > -1) {
      ids.splice(index, 1);
    }
    messageById.delete(id);
    return {
      user: this.user({ userId }),
      message,
    };
  },
};

const USER_ID = '140';

const addMsg = ({ title, content }) => {
  const id = `msg${tmpId++}`;
  const message = new Message(id, title, content);
  messageById.set(id, message);
  const userId = USER_ID;
  const ids = idsByUserId.get(userId) || [];
  idsByUserId.set(userId, ids.concat(id));
};

addMsg({ title: 'JavaScript', content: 'learn JavaScript' });
addMsg({ title: 'TypeScript', content: 'learn TypeScript' });

const app = express();
app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    pretty: true,
    graphiql: true,
  })
);

const PORT = 4000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
});
