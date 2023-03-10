import { CSSProperties, FC, ReactNode } from 'react';
import clsx from 'clsx';

interface Props {
  label?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  errorMessage?: string;
}

const Index: FC<Props> = ({ label, children, style, className, errorMessage }) => (
  <div className={clsx('mt-3', className)} style={style}>
    <div>
      {label && <div className="text-color-primary text-sm pb-2">{label}</div>}
      <div>{children}</div>
    </div>
    {errorMessage && <div className="text-sm text-error-500 pt-0.5">{errorMessage}</div>}
  </div>
);

export default Index;
