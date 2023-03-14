import { FC, useState } from 'react';

interface Props {}

const Index: FC<Props> = (props) => {
  const [visible, setVisible] = useState(false);
  return <div>Modal</div>;
};

export default Index;
