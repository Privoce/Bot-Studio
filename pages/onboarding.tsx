import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import IconOpenAI from '../assets/logo/openai.svg';
import Field from '../lib/form/field';
import Input from '../lib/form/input';
import Button from '../lib/form/button';
import { OpenaiConfig } from '../types/config';
import { useOpenai } from '../context/openai';

interface Props {}

const Index: FC<Props> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OpenaiConfig>({
    resolver: yupResolver(
      object({
        originationName: string().trim().required('Origination Name is required.'),
        originationId: string().trim().required('Origination ID is required.'),
        apiKey: string().trim().required('API Key is required.'),
      })
    ),
    defaultValues: {
      originationId: '',
      originationName: '',
      apiKey: '',
    },
  });

  const router = useRouter();
  const { saveConfig, selectConfig } = useOpenai();
  const onSubmit = (values: OpenaiConfig) => {
    saveConfig(values);
    selectConfig(values.originationId);
    router.push('/');
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="flex items-center text-theme-500">
          <IconOpenAI className="w-9 h-9" />
          <div className="text-2xl font-medium pl-3">Bot Studio</div>
        </div>
        <form className="mt-6 w-80" onSubmit={handleSubmit(onSubmit)}>
          <Field errorMessage={errors.originationName?.message}>
            <Input
              size="lg"
              className="w-full"
              placeholder="Origination Name"
              {...register('originationName')}
            />
          </Field>
          <Field errorMessage={errors.originationId?.message}>
            <Input
              size="lg"
              className="w-full"
              placeholder="Origination ID"
              {...register('originationId')}
            />
          </Field>
          <Field errorMessage={errors.apiKey?.message}>
            <Input size="lg" className="w-full" placeholder="API key" {...register('apiKey')} />
          </Field>
          <Button type="submit" size="lg" variant="contained" className="w-full mt-8">
            Enter Dashboard
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Index;
