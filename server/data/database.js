class Message {
  constructor(id, title, content) {
    this.id = id;
    this.title = title;
    this.content = content;
  }
}

class User {
  constructor(id) {
    this.id = id;
  }
}

const USER_ID = '140';

// user mock
const usersById = new Map([[USER_ID, new User(USER_ID)]]);

// message mock
const messagesById = new Map();
const messageIdsByUser = new Map([[USER_ID, []]]);

let tmpId = 0;

const getUser = (id) => {
  const user = usersById.get(id);
  if (!user) throw new Error(`Invariant exception, User ${id} not found`);
  return user;
};

const getMessageIds = (id) => {
  return messageIdsByUser.get(id) || [];
};

const getMessage = (id) => {
  const message = messagesById.get(id);
  if (!message) throw new Error(`Invariant exception, Message ${id} not found`);
  return message;
};

const getMessages = () => {
  const messageIds = getMessageIds(USER_ID);
  const messages = messageIds.map(getMessage);
  return messages;
};

const addMessage = (title, content) => {
  const message = new Message(`${tmpId++}`, title, content);
  messagesById.set(message.id, message);
  const messageIds = getMessageIds(USER_ID);
  messageIdsByUser.set(USER_ID, messageIds.concat(message.id));
  return message.id;
};

const updateMessage = (id, title, content) => {
  messagesById.set(id, new Message(id, title, content));
};

const removeMessage = (id) => {
  const messageIds = messageIdsByUser.get(USER_ID);
  messageIds.splice(messageIds.indexOf(id), 1);
  messagesById.delete(id);
};

addMessage('JavaScript', 'Learn JavaScript');
addMessage('TypeScript', 'Learn TypeScript');

module.exports = {
  Message,
  User,
  USER_ID,
  getUser,
  getMessage,
  getMessages,
  addMessage,
  updateMessage,
  removeMessage,
};
