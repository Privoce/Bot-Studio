import type { NextPage } from 'next';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import Dashboard from '../layouts/dashboard';
import { useOpenai } from '../context/openai';
import MyModels from '../components/models/my-models';
import OtherModels from '../components/models/other-models';
import H2 from '../components/heading/h2';
import { useModelStore } from '../store/use-model-store';

const official = ['openai', 'openai-dev', 'openai-internal', 'system'];

const Home: NextPage = () => {
  const { openai } = useOpenai();
  const models = useModelStore((s) => s.models);
  const setModels = useModelStore((s) => s.setModels);

  useQuery({
    enabled: openai.enabled,
    queryKey: ['models'],
    queryFn: () => openai.listModels(),
    onSuccess: (data) => setModels(data.data),
  });

  const { myModels, officialModels } = useMemo(
    () => ({
      myModels: models
        .filter((m) => !official.includes(m.owned_by))
        .sort((a, b) => a.created - b.created),
      officialModels: models
        .filter((m) => official.includes(m.owned_by))
        .sort((a, b) => a.created - b.created),
    }),
    [models]
  );

  return (
    <Dashboard>
      <div className="px-4 sm:px-6 pb-13">
        <H2>My Models</H2>
        <MyModels
          models={myModels}
          onDelete={(id) => setModels([...models.filter((m) => m.id !== id)])}
        />
        <H2>Official Models</H2>
        <OtherModels models={officialModels} />
      </div>
    </Dashboard>
  );
};

export default Home;
