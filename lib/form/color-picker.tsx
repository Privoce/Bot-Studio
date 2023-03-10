import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';

type Props = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'className' | 'maxLength' | 'type'
>;

const Index = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <div className="rounded-lg overflow-hidden text-sm border-primary flex w-fit">
    <div className="border-r-primary py-1.5 px-3">Hex</div>
    <input
      ref={ref}
      type="text"
      className="pl-2.5 py-1.5 w-20 focus:outline-none"
      maxLength={7}
      {...props}
    />
    <div
      className="w-6 h-6 rounded m-1 border-primary"
      style={{ backgroundColor: typeof props.value === 'string' ? props.value : '' }}
    />
  </div>
));

export default Index;
