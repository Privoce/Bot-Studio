import { FC, MouseEvent, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { object, string, number, array } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../lib/form/button';
import Field from '../../lib/form/field';
// import Textarea from '../../lib/form/textarea';
import Input from '../../lib/form/input';
import { CompletionConfig, getDefaultChat } from '../../types/chat';
import { useChatStore } from '../../store/use-chat-store';

interface Props {}

type DTO = Omit<CompletionConfig, 'stop'> & {
  stop?: { value: string }[];
};

function configToDTO(config: CompletionConfig): DTO {
  if (!config.stop) return { ...config, stop: undefined };
  return {
    ...config,
    stop: Array.isArray(config.stop)
      ? config.stop.map((value) => ({ value }))
      : [{ value: config.stop }],
  };
}

function DTOToConfig(dto: DTO): CompletionConfig {
  if (!dto.stop) return { ...dto, stop: undefined };
  return { ...dto, stop: dto.stop.map((i) => i.value) };
}

const Index: FC<Props> = () => {
  // eslint-disable-next-line no-template-curly-in-string
  // const [promptTemplate, setPromptTemplate] = useState('${input_text}');

  const addChat = useChatStore((s) => s.addChat);
  const onAddChat = (e: MouseEvent) => {
    e.stopPropagation();
    const chat = getDefaultChat();
    addChat(chat);
  };

  const globalConfig = useChatStore((s) => s.globalConfig);
  const updateGlobalConfig = useChatStore((s) => s.updateGlobalConfig);
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<DTO>({
    defaultValues: configToDTO(globalConfig),
    resolver: yupResolver(
      object({
        suffix: string()
          .transform((v) => (!v || v.length === 0 ? undefined : v))
          .notRequired(),
        max_token: number()
          .integer()
          .positive()
          .max(4096)
          .transform((v) => (Number.isNaN(v) ? undefined : v))
          .notRequired(),
        temperature: number()
          .transform((v) => (Number.isNaN(v) ? undefined : v))
          .min(0)
          .max(2)
          .notRequired(),
        top_p: number()
          .transform((v) => (Number.isNaN(v) ? undefined : v))
          .min(0)
          .max(1)
          .notRequired(),
        n: number()
          .transform((v) => (Number.isNaN(v) ? undefined : v))
          .integer()
          .positive()
          .notRequired(),
        logprobs: number()
          .transform((v) => (Number.isNaN(v) ? undefined : v))
          .notRequired(),
        presence_penalty: number()
          .transform((v) => (Number.isNaN(v) ? undefined : v))
          .min(-2)
          .max(2)
          .notRequired(),
        frequency_penalty: number()
          .transform((v) => (Number.isNaN(v) ? undefined : v))
          .min(-2)
          .max(2)
          .notRequired(),
        best_of: number()
          .transform((v) => (Number.isNaN(v) ? undefined : v))
          .integer()
          .positive()
          .min(1)
          .notRequired(),
        stop: array()
          .transform((v) => (!Array.isArray(v) || v.length === 0 ? undefined : v))
          .of(object({ value: string().required() }))
          .notRequired(),
      })
    ),
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'stop' });

  useEffect(() => {
    reset(configToDTO(globalConfig));
    // eslint-disable-next-line
  }, [globalConfig]);

  const onUpdate = (dto: DTO) => {
    // todo: toast.success
    console.log(dto);
    updateGlobalConfig(DTOToConfig(dto));
  };

  return (
    <div className="relative h-full w-72 overflow-y-auto grow-0 shrink-0">
      <div className="absolute left-0 top-0 bottom-0 border-l" />
      <div className="relative h-13 flex items-center text-lg font-medium px-4">
        <div>Global Config</div>
        <div className="absolute bottom-0 left-0 right-0 border-b" />
      </div>
      <form className="px-4 border-b" onSubmit={handleSubmit(onUpdate)}>
        {/* <Field label="Prompt Template"> */}
        {/*  <Textarea */}
        {/*    rows={1} */}
        {/*    value={promptTemplate} */}
        {/*    className="w-full min-h-[32px]" */}
        {/*    onChange={(e) => setPromptTemplate(e.target.value)} */}
        {/*  /> */}
        {/* </Field> */}
        <Field label="Suffix" errorMessage={errors.suffix?.message}>
          <Input className="w-full" {...register('suffix')} />
        </Field>
        <div className="flex space-x-3">
          <Field label="Max Tokens" errorMessage={errors.max_tokens?.message}>
            <Input className="w-full" type="number" {...register('max_tokens')} />
          </Field>
          <Field label="Temperature" errorMessage={errors.temperature?.message}>
            <Input className="w-full" type="number" {...register('temperature')} />
          </Field>
        </div>
        <div className="flex space-x-3">
          <Field label="Top P" errorMessage={errors.top_p?.message}>
            <Input className="w-full" type="number" {...register('top_p')} />
          </Field>
          <Field label="N" errorMessage={errors.n?.message}>
            <Input className="w-full" type="number" {...register('n')} />
          </Field>
        </div>
        <div className="flex space-x-3">
          <Field label="Logprobs" errorMessage={errors.logprobs?.message}>
            <Input className="w-full" type="number" {...register('logprobs')} />
          </Field>
          <Field label="Presence Penalty" errorMessage={errors.presence_penalty?.message}>
            <Input className="w-full" type="number" {...register('presence_penalty')} />
          </Field>
        </div>
        <div className="flex space-x-3">
          <Field label="Frequency Penalty" errorMessage={errors.frequency_penalty?.message}>
            <Input className="w-full" type="number" {...register('frequency_penalty')} />
          </Field>
          <Field label="Best of" errorMessage={errors.best_of?.message}>
            <Input className="w-full" type="number" {...register('best_of')} />
          </Field>
        </div>
        <Field label="Stop" errorMessage={errors.stop?.message}>
          <div className="space-y-3">
            {fields.map((field, i) => (
              <Field key={field.id} errorMessage={errors.stop?.[i]?.value?.message}>
                <div className="flex space-x-3">
                  <Input className="w-full" type="text" {...register(`stop.${i}.value`)} />
                  <Button type="button" variant="outlined" onClick={() => remove(i)}>
                    Remove
                  </Button>
                </div>
              </Field>
            ))}
            <Button type="button" variant="outlined" onClick={() => append({ value: '' })}>
              Add Stop world
            </Button>
          </div>
        </Field>
        <div className="pt-3 pb-4">
          <Button type="submit" variant="contained" className="w-full">
            Update Completion Config
          </Button>
        </div>
      </form>
      <div className="px-4 pt-4">
        <Button type="button" variant="contained" className="w-full" onClick={onAddChat}>
          Add Chat Window
        </Button>
      </div>
    </div>
  );
};

export default Index;
