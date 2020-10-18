import React, { useState } from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { commit as updateMessageMutationCommit } from '../mutations/UpdateMessageMutation';
import { commit as removeMessageMutationCommit } from '../mutations/RemoveMessageMutation';
import Input from './Input';

const Message = ({ relay, user, message }) => {
  const [title, setTitle] = useState(message.title);
  const [content, setContent] = useState(message.content);
  const onTitleSave = (text) => setTitle(text);
  const onContentSave = (text) => setContent(text);

  const [isEdit, setIsEdit] = useState(false);
  const openEdit = () => setIsEdit(true);
  const closeEdit = () => setIsEdit(false);

  const updateMessage = () => {
    updateMessageMutationCommit(relay.environment, {
      user,
      message,
      title,
      content,
    });
    closeEdit();
  };

  const removeMessage = () => {
    removeMessageMutationCommit(relay.environment, {
      user,
      id: message.id,
    });
  };

  return (
    <li>
      <h3>{title}</h3>
      <p>{content}</p>
      <button onClick={openEdit}>edit</button>
      <button onClick={removeMessage} style={{ marginLeft: '5px' }}>
        remove
      </button>
      {isEdit && (
        <div>
          <Input initialValue={message.title} onSave={onTitleSave} />
          <br />
          <Input initialValue={message.content} onSave={onContentSave} />
          <br />
          <button onClick={updateMessage}>save</button>
          <button style={{ marginLeft: '5px' }} onClick={closeEdit}>
            cancel
          </button>
        </div>
      )}
    </li>
  );
};
export default createFragmentContainer(Message, {
  user: graphql`
    fragment Message_user on User {
      id
      userId
    }
  `,
  message: graphql`
    fragment Message_message on Message {
      id
      title
      content
    }
  `,
});
