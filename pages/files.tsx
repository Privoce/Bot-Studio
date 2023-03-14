import type { NextPage } from 'next';
import { useMutation, useQuery } from '@tanstack/react-query';
import Dashboard from '../layouts/dashboard';
import H2 from '../components/heading/h2';
import { useOpenai } from '../context/openai';
import FilesTable from '../components/table/files-table';
import { useFineTuneStore } from '../store/use-fine-tune-store';

const Home: NextPage = () => {
  const { openai } = useOpenai();
  const files = useFineTuneStore((s) => s.files);
  const setFiles = useFineTuneStore((s) => s.setFiles);
  const removeFile = useFineTuneStore((s) => s.removeFile);
  useQuery({
    enabled: openai.enabled,
    queryKey: ['files'],
    queryFn: () => openai.listFiles(),
    onSuccess: (data) => setFiles(data.data.sort((a, b) => a.created_at - b.created_at)),
  });

  const deleteMut = useMutation(openai.deleteFile, {
    onSuccess: (data) => removeFile(data.id),
  });

  return (
    <Dashboard>
      <div className="px-4 sm:px-6">
        <H2>Files</H2>
        <FilesTable
          showMore
          files={files}
          isLoading={deleteMut.isLoading}
          onDelete={(f) => deleteMut.mutate(f.id)}
        />
      </div>
    </Dashboard>
  );
};

export default Home;
