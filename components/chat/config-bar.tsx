import { FC, useState, MouseEvent } from 'react';
import Button from '../../lib/form/button';
import Field from '../../lib/form/field';
import Textarea from '../../lib/form/textarea';
import Input from '../../lib/form/input';
import { getDefaultChat } from '../../types/chat';
import { useChatStore } from '../../store/use-chat-store';

interface Props {}

const Index: FC<Props> = () => {
  // eslint-disable-next-line no-template-curly-in-string
  const [promptTemplate, setPromptTemplate] = useState('${input_text}');
  const [suffix, setSuffix] = useState(' ->');

  const addChat = useChatStore((s) => s.addChat);
  const onAddChat = (e: MouseEvent) => {
    e.stopPropagation();
    const chat = getDefaultChat();
    addChat(chat);
  };

  return (
    <div className="relative h-full w-72 overflow-y-auto grow-0 shrink-0">
      <div className="absolute left-0 top-0 bottom-0 border-l" />
      <div className="relative h-13 flex items-center text-lg font-medium px-4">
        <div>Global Configuration</div>
        <div className="absolute bottom-0 left-0 right-0 border-b" />
      </div>
      <div className="px-4">
        <Field label="Prompt Template">
          <Textarea
            rows={1}
            value={promptTemplate}
            className="w-full min-h-[32px]"
            onChange={(e) => setPromptTemplate(e.target.value)}
          />
        </Field>
        <Field label="Suffix">
          <Input value={suffix} className="w-full" onChange={(e) => setSuffix(e.target.value)} />
        </Field>
        <div className="flex space-x-3">
          <Field label="Max Tokens">
            <Input
              value={suffix}
              className="w-full"
              type="number"
              onChange={(e) => setSuffix(e.target.value)}
            />
          </Field>
          <Field label="Temperature">
            <Input
              value={suffix}
              className="w-full"
              type="number"
              onChange={(e) => setSuffix(e.target.value)}
            />
          </Field>
        </div>
        <div className="flex space-x-3">
          <Field label="Top P">
            <Input
              value={suffix}
              className="w-full"
              type="number"
              onChange={(e) => setSuffix(e.target.value)}
            />
          </Field>
          <Field label="N">
            <Input
              value={suffix}
              className="w-full"
              type="number"
              onChange={(e) => setSuffix(e.target.value)}
            />
          </Field>
        </div>
        <div className="flex space-x-3">
          <Field label="Logprobs">
            <Input
              value={suffix}
              className="w-full"
              type="number"
              onChange={(e) => setSuffix(e.target.value)}
            />
          </Field>
          <Field label="Presence Penalty">
            <Input
              value={suffix}
              className="w-full"
              type="number"
              onChange={(e) => setSuffix(e.target.value)}
            />
          </Field>
        </div>
        <div className="flex space-x-3">
          <Field label="Frequency Penalty">
            <Input
              value={suffix}
              className="w-full"
              type="number"
              onChange={(e) => setSuffix(e.target.value)}
            />
          </Field>
          <Field label="Best of">
            <Input
              value={suffix}
              className="w-full"
              type="number"
              onChange={(e) => setSuffix(e.target.value)}
            />
          </Field>
        </div>
      </div>
      <div className="px-4 pt-4">
        <Button type="button" variant="contained" className="w-full" onClick={onAddChat}>
          Add Chat Window
        </Button>
      </div>
    </div>
  );
};

export default Index;
