import { FC, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CreateCompletionRequest, CreateCompletionResponse } from 'openai';
import { Chat, CompletionMessage } from '../../types/chat';
import { useChatStore } from '../../store/use-chat-store';
import { useOpenaiStream } from '../../hooks/use-openai-stream';

interface Props {
  chat: Chat;
  promptId: string;
  apiKey?: string;
}

const Index: FC<Props> = ({ chat, promptId, apiKey }) => {
  const globalConfig = useChatStore((s) => s.globalConfig);
  const startCompletion = useChatStore((s) => s.startCompletion);
  const updateCompletion = useChatStore((s) => s.updateCompletion);
  const endCompletion = useChatStore((s) => s.endCompletion);
  const prompt = useChatStore((s) => s.messages[promptId]?.content ?? '');
  const { mutateAsync } = useOpenaiStream(apiKey);
  const ref = useRef<boolean>(false);

  useEffect(() => {
    const query = async () => {
      if (ref.current) return;
      const completion: CompletionMessage = {
        type: 'completion',
        id: uuidv4(),
        content: '',
        chatId: chat.id,
        promptId,
        duration: 0,
      };
      startCompletion(completion);
      const start = performance.now();
      try {
        await mutateAsync<CreateCompletionRequest>({
          url: 'https://api.openai.com/v1/completions',
          body: {
            model: chat.model.id,
            prompt,
            // user config
            ...globalConfig,
            ...chat.config,
          },
          onmessage: (e) => {
            if (e.data === '[DONE]') {
              const end = performance.now();
              endCompletion({ ...completion, duration: end - start });
              return;
            }
            const data = JSON.parse(e.data) as CreateCompletionResponse;
            updateCompletion({ id: completion.id, content: data.choices[0].text ?? '' });
          },
        });
      } catch (e) {
        console.error(e);
      }
    };
    query();
    return () => {
      ref.current = true;
    };
    // eslint-disable-next-line
  }, []);

  return null;
};

export default Index;
