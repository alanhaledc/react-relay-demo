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

const USER_ID = "140";

const getUser= ({ userId }) => {
  const ids = idsByUserId(userId);
  const messageList = [];
  for (const id of ids) {
    const message = idsByUserId.get(id);
    messageList.push(message);
  }
  return {
    userId,
    messageList
  };
};

const getMessage = ({ userId, id }) => {
  const ids = idsByUserId.get(userId);
  if (!ids.include(id))  {
    throw new Error('no message exists with id ' + id);
  }
  const message = messageById.get(id);
  return message;
};

const addMessage = ({ userId, title, content }) => {
  const id = `msg${tmpId++}`;
  const message = new Message(id, title, content);
  messageById.set(id, message);
  const ids = idsByUserId.get(userId ?? '140') || [];
  idsByUserId.set(userId, ids.concat(id));
  return message;
};

const updateMessage = ({ userId, id, title, content }) => {
  const ids = idsByUserId.get(userId);
  if (!ids.include(id))  {
    throw new Error('no message exists with id ' + id);
  }
  const message = new Message(id, title, content);
  message.set(id, message);
  return message;
};

const removeMessage = ({ userId, id }) => {
  const ids = idsByUserId.get(userId ?? '140');
  if (!ids.include(id))  {
    throw new Error('no message exists with id ' + id);
  }
  const index = ids.indexOf(id);
  if (index > -1) {
    ids.splice(index, 1);
  }
  messageById.delete(id);
  return {
    success: true,
  };
};

// initial data
addMessage({ title: 'JavaScript', content: 'Learn JavaScript' });
addMessage({ title: 'TypeScript', content: 'Learn TypeScript' });

module.exports = {
  USER_ID,
  getUser,
  getMessage,
  addMessage,
  updateMessage,
  removeMessage,
};
