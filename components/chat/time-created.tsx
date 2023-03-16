import { FC } from 'react';
import dayjs from 'dayjs';

interface Props {
  ms: number;
  className?: string;
}

const Index: FC<Props> = ({ ms, className }) => (
  <time itemProp="dateCreated" dateTime={new Date(ms).toISOString()} className={className}>
    {dayjs.unix(ms / 1000).format('LT')}
  </time>
);

export default Index;
