import { FC, useEffect } from 'react';
import { CreateFineTuneRequest } from 'openai';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { object, string, number, boolean, array } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Modal from '../../lib/modal';
import Close7 from '../button/close-7';
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

type CreateFineTuneDTO = Omit<CreateFineTuneRequest, 'classification_betas'> & {
  classification_betas?: { value: number }[];
};

const defaultValues: CreateFineTuneDTO = {
  training_file: '',
  validation_file: undefined,
  model: '',
  n_epochs: undefined,
  batch_size: undefined,
  learning_rate_multiplier: undefined,
  prompt_loss_weight: undefined,
  compute_classification_metrics: undefined,
  classification_n_classes: undefined,
  classification_positive_class: undefined,
  classification_betas: undefined,
  suffix: undefined,
};

const Index: FC<Props> = ({ visible, onCancel, onCreate }) => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CreateFineTuneDTO>({
    defaultValues,
    resolver: yupResolver(
      object({
        training_file: string().trim().required('Training file is required'),
        validation_file: string()
          .trim()
          .transform((v) => (!v || v.length === 0 ? undefined : v))
          .notRequired(),
        model: string().trim().required('Model is requires'),
        n_epochs: number()
          .transform((v) => (Number.isNaN(v) ? undefined : v))
          .integer()
          .positive()
          .notRequired(),
        batch_size: number()
          .transform((v) => (Number.isNaN(v) ? undefined : v))
          .integer()
          .positive()
          .notRequired(),
        learning_rate_multiplier: number()
          .transform((v) => (Number.isNaN(v) ? undefined : v))
          .positive()
          .notRequired(),
        prompt_loss_weight: number()
          .transform((v) => (Number.isNaN(v) ? undefined : v))
          .positive()
          .notRequired(),
        compute_classification_metrics: boolean().notRequired(),
        classification_n_classes: number()
          .transform((v) => (Number.isNaN(v) ? undefined : v))
          .integer()
          .positive()
          .notRequired(),
        classification_positive_class: string()
          .trim()
          .transform((v) => (!v || v.length === 0 ? undefined : v))
          .notRequired(),
        classification_betas: array()
          .transform((v) => (!Array.isArray(v) || v.length === 0 ? undefined : v))
          .of(object({ value: number().typeError('value can not be blank').required() }))
          .notRequired(),
        suffix: string()
          .trim()
          .transform((v) => (!v || v.length === 0 ? undefined : v))
          .max(40, 'Suffix can have up to 40 characters')
          .notRequired(),
      })
    ),
  });

  useEffect(() => {
    if (!visible) reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const { fields, append, remove } = useFieldArray({ control, name: 'classification_betas' });

  const onSubmit = (values: CreateFineTuneDTO) => {
    onCreate?.({
      ...values,
      classification_betas:
        values.classification_betas?.length === 0
          ? undefined
          : values.classification_betas?.map((i) => i.value),
    });
  };

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <div className="w-80 sm:w-120 bg-white rounded-xl shadow-lg">
        <div className="relative">
          <div className="h-13 flex items-center justify-center text-xl font-medium px-13">
            Create Fine-tune
          </div>
          <Close7 className="absolute right-2.5 top-2.5" onClick={onCancel} />
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
              <Controller
                control={control}
                name="model"
                render={({ field: { value, onChange } }) => (
                  <Select
                    placeholder=""
                    value={value ? { value, label: value } : undefined}
                    onChange={(option) => onChange(option.value)}
                    options={[
                      { value: 'ada', label: 'ada' },
                      { value: 'babbage', label: 'babbage' },
                      { value: 'curie', label: 'curie' },
                      { value: 'davinci', label: 'davinci' },
                    ]}
                  />
                )}
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
                <Controller
                  control={control}
                  name="compute_classification_metrics"
                  render={({ field: { value, onChange } }) => (
                    <Switch size="lg" checked={value ?? undefined} onChange={onChange} />
                  )}
                />
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
            className="flex-1 "
            errorMessage={errors.classification_betas?.message}
          >
            <div className="space-y-3">
              {fields.map((field, i) => (
                <Field
                  key={field.id}
                  errorMessage={errors.classification_betas?.[i]?.value?.message}
                >
                  <div className="flex space-x-3">
                    <Input
                      className="w-full"
                      type="number"
                      {...register(`classification_betas.${i}.value`)}
                    />
                    <Button type="button" variant="outlined" onClick={() => remove(i)}>
                      Remove
                    </Button>
                  </div>
                </Field>
              ))}
              <Button type="button" variant="outlined" onClick={() => append({ value: 0 })}>
                Add
              </Button>
            </div>
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
