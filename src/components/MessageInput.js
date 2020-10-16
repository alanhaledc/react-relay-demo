import React, { useState } from 'react';
import Input from './Input';

const MessageInput = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const onTitleSave = (text) => setTitle(text);
  const onContentSave = (text) => setContent(text);

  const handleSubmit = () => {
    onSubmit(title, content);
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <Input
        placeholder={'add title'}
        initialValue={title}
        onSave={onTitleSave}
      />
      <Input
        style={{ marginLeft: '10px' }}
        placeholder={'add content'}
        initialValue={content}
        onSave={onContentSave}
      />
      <button onClick={handleSubmit} style={{ marginLeft: '10px' }}>
        submit
      </button>
    </div>
  );
};

export default MessageInput;
