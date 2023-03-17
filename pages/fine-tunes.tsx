import { MouseEvent, useState } from 'react';
import type { NextPage } from 'next';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CreateFineTuneRequest } from 'openai';
import Dashboard from '../layouts/dashboard';
import { useOpenai } from '../context/openai';
import H2 from '../components/heading/h2';
import { useFineTuneStore } from '../store/use-fine-tune-store';
import FineTunes from '../components/fine-tunes/fine-tunes';
import Button from '../lib/form/button';
import ModalCreateFineTune from '../components/fine-tunes/modal-create-fine-tune';

const Home: NextPage = () => {
  const { openai } = useOpenai();
  const fineTunes = useFineTuneStore((s) => s.fineTunes);
  const addFineTune = useFineTuneStore((s) => s.addFineTune);
  const setFineTunes = useFineTuneStore((s) => s.setFineTunes);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const createMut = useMutation(openai.createFineTune, {
    onSuccess: (fineTune) => {
      setShowCreateModal(false);
      addFineTune(fineTune);
    },
  });

  useQuery({
    enabled: openai.enabled,
    queryKey: ['fine-tunes'],
    queryFn: () => openai.listFineTunes(),
    onSuccess: (data) => setFineTunes(data.data),
  });

  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
    setShowCreateModal(true);
  };

  const onCreate = (dto: CreateFineTuneRequest) => createMut.mutate(dto);

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
        <ModalCreateFineTune
          visible={showCreateModal}
          onCancel={() => setShowCreateModal(false)}
          onCreate={onCreate}
        />
      </div>
    </Dashboard>
  );
};

export default Home;
