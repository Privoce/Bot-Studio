import { FC } from 'react';
import { CreateFineTuneRequest } from 'openai';
import { useForm, Controller } from 'react-hook-form';
import { object, string, number } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Modal from '../../lib/modal';
import Close8 from '../button/close-8';
import Field from '../../lib/form/field';
import Input from '../../lib/form/input';
import Select from '../../lib/form/select';
import Switch from '../../lib/form/switch';
import Button from '../../lib/form/button';

interface Props {
  visible?: boolean;
  onCancel?: () => void;
  onCreate?: (dto: CreateFineTuneRequest) => void;
}

const Index: FC<Props> = ({ visible, onCancel, onCreate }) => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateFineTuneRequest>({
    defaultValues: {
      training_file: '',
      validation_file: '',
      model: '',
      n_epochs: null,
      batch_size: null,
      learning_rate_multiplier: null,
      prompt_loss_weight: null,
      compute_classification_metrics: null,
      classification_n_classes: null,
      classification_positive_class: null,
      classification_betas: null,
      suffix: null,
    },
    resolver: yupResolver(
      object({
        training_file: string().trim().required('Training file is required'),
        model: string().trim().required('Model is requires'),
        n_epochs: number().integer().positive().notRequired(),
        suffix: string().trim().max(40, 'Suffix can have up to 40 characters').notRequired(),
      })
    ),
  });

  const onSubmit = (values: CreateFineTuneRequest) => onCreate?.(values);

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <div className="w-80 sm:w-120 bg-white rounded-xl shadow-lg">
        <div className="relative">
          <div className="h-13 flex items-center justify-center text-xl font-medium px-13">
            Create Fine-tune
          </div>
          <Close8 className="absolute right-2.5 top-2.5" onClick={onCancel} />
        </div>
        <form className="px-4 sm:px-6 pb-6" onSubmit={handleSubmit(onSubmit)}>
          <Field label="Training file" errorMessage={errors.training_file?.message}>
            <Input className="w-full" {...register('training_file')} />
          </Field>
          <Field label="Validation file" errorMessage={errors.validation_file?.message}>
            <Input className="w-full" {...register('validation_file')} />
          </Field>
          <div className="flex flex-wrap space-x-3">
            <Field label="Model" className="flex-1" errorMessage={errors.model?.message}>
              <Select
                placeholder=""
                options={[
                  { value: 'ada', label: 'ada' },
                  { value: 'babbage', label: 'babbage' },
                  { value: 'curie', label: 'curie' },
                  { value: 'davinci', label: 'davinci' },
                ]}
              />
            </Field>
            <Field label="Suffix" className="flex-1" errorMessage={errors.suffix?.message}>
              <Input className="w-full" {...register('suffix')} />
            </Field>
          </div>
          <div className="flex flex-wrap space-x-3">
            <Field label="N Epochs" className="flex-1" errorMessage={errors.n_epochs?.message}>
              <Input className="w-full" type="number" {...register('n_epochs')} />
            </Field>
            <Field label="Batch Size" className="flex-1">
              <Input className="w-full" type="number" {...register('n_epochs')} />
            </Field>
          </div>
          <div className="flex flex-wrap space-x-3">
            <Field label="Learning rate multiplier" className="flex-1">
              <Input className="w-full" type="number" {...register('n_epochs')} />
            </Field>
            <Field label="Prompt loss weight" className="flex-1">
              <Input className="w-full" type="number" {...register('n_epochs')} />
            </Field>
          </div>
          <div className="flex flex-wrap space-x-3">
            <Field
              label="Compute classification metrics"
              className="flex-1"
              errorMessage={errors.compute_classification_metrics?.message}
            >
              <div className="flex items-center h-8">
                <Switch size="lg" />
              </div>
            </Field>
            <Field
              label="Classification positive class"
              className="flex-1"
              errorMessage={errors.classification_positive_class?.message}
            >
              <Input
                className="w-full"
                type="number"
                {...register('classification_positive_class')}
              />
            </Field>
          </div>
          <Field
            label="Classification betas"
            className="flex-1"
            errorMessage={errors.classification_betas?.message}
          >
            <Input
              className="w-full"
              type="number"
              {...register('classification_positive_class')}
            />
          </Field>
          <div className="flex mt-12 space-x-3">
            <Button type="submit" variant="contained" className="flex-1">
              Submit
            </Button>
            <Button type="button" variant="outlined" className="flex-1" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default Index;
