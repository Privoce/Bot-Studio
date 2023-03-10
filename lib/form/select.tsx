import { FC } from 'react';
import Select from 'react-select';
import { Size } from './types';
import { SIZE_STYLE, Option } from './select-style';

interface Props {
  options: Option[];
  size?: Size;
  placeholder?: string;
  value?: Option;
  defaultValue?: Option;
  onChange?: (option: Option) => void;
}

const Index: FC<Props> = ({ size, options, ...props }) => (
  <Select<Option, false>
    options={options}
    value={props.value}
    defaultValue={props.defaultValue}
    styles={SIZE_STYLE[size || 'md']}
    placeholder={props.placeholder}
    onChange={(newValue) => {
      if (newValue !== null) props.onChange?.(newValue);
    }}
  />
);

Index.defaultProps = {
  size: 'md',
};

export default Index;
