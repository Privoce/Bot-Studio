import { MouseEvent } from 'react';
import type { NextPage } from 'next';
import { useMutation, useQuery } from '@tanstack/react-query';
import Dashboard from '../layouts/dashboard';
import { useOpenai } from '../context/openai';
import H2 from '../components/heading/h2';
import { useFineTuneStore } from '../store/use-fine-tune-store';
import FineTunes from '../components/fine-tunes/fine-tunes';
import Button from '../lib/form/button';

const Home: NextPage = () => {
  const { openai } = useOpenai();
  const { fineTunes, setFineTunes } = useFineTuneStore((s) => s);
  const createMut = useMutation(openai.createFineTune);

  useQuery({
    enabled: openai.enabled,
    queryKey: ['fine-tunes'],
    queryFn: () => openai.listFineTunes(),
    onSuccess: (data) => setFineTunes(data.data),
  });

  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
    createMut.mutate({ model: '', training_file: '' });
  };

  return (
    <Dashboard>
      <div className="px-4 sm:px-6 pb-13">
        <H2 className="flex justify-between items-center">
          <div>Fine Tunes</div>
          <div>
            <Button type="button" variant="contained" onClick={onClick}>
              Create Fine-tune
            </Button>
          </div>
        </H2>
        <FineTunes fineTunes={fineTunes} />
      </div>
    </Dashboard>
  );
};

export default Home;
