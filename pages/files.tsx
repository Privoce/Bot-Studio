import type { NextPage } from 'next';
import { useMutation, useQuery } from '@tanstack/react-query';
import Dashboard from '../layouts/dashboard';
import H2 from '../components/heading/h2';
import { useOpenai } from '../context/openai';
import FilesTable from '../components/table/files-table';
import { useFineTuneStore } from '../store/use-fine-tune-store';
import Button from '../lib/form/button';
import Upload from '../lib/form/upload';
import { toast } from '../lib/toast';

const Home: NextPage = () => {
  const { openai } = useOpenai();
  const files = useFineTuneStore((s) => s.files);
  const addFile = useFineTuneStore((s) => s.addFile);
  const setFiles = useFineTuneStore((s) => s.setFiles);
  const removeFile = useFineTuneStore((s) => s.removeFile);

  const { isLoading } = useQuery({
    enabled: openai.enabled,
    queryKey: ['files'],
    queryFn: () => openai.listFiles(),
    onSuccess: (data) => setFiles(data.data.sort((a, b) => a.created_at - b.created_at)),
  });

  const uploadMut = useMutation(openai.createFile, {
    onSuccess: (f) => {
      toast.success('File uploaded successfully');
      addFile(f);
    },
  });
  const onUpload = (file: File) => uploadMut.mutate({ file, purpose: 'fine-tune' });

  return (
    <Dashboard>
      <div className="px-4 sm:px-6 pb-24">
        <H2 className="flex items-center">
          <div>Files</div>
          <div className="flex-1" />
          <div className="relative flex">
            <Button type="button" variant="contained">
              Upload File (JSONL)
            </Button>
            <Upload accept="application/jsonl+json" onChange={onUpload} />
          </div>
        </H2>
        <FilesTable
          showMore
          files={files}
          isLoading={isLoading}
          onDelete={(fileId) => removeFile(fileId)}
        />
      </div>
    </Dashboard>
  );
};

export default Home;
