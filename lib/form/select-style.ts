import { StylesConfig } from 'react-select';
import { Size } from './types';

const colors = {
  theme500: '#EAAA08',
  gray50: '#F9FAFB',
  gray100: '#F2F4F7',
  gray200: '#EAECF0',
  gray400: '#98A2B3',
  gray500: '#667085',
  gray700: '#344054',
  gray900: '#101828',
};

type SizeStyle = Record<Size, string>;

const BORDER_RADIUS: SizeStyle = { sm: '4px', md: '6px', lg: '8px' };
const MIN_HEIGHT: SizeStyle = { sm: '24px', md: '32px', lg: '40px' };
const PADDING: SizeStyle = { sm: '0 4px', md: '0 12px', lg: '0 16px' };
const FONT_SIZE: SizeStyle = { sm: '12px', md: '14px', lg: '16px' };
const LINE_HEIGHT: SizeStyle = { sm: '18px', md: '20px', lg: '24px' };
const MENU_MARGIN: SizeStyle = { sm: '4px 0', md: '6px 0', lg: '8px 0' };

const OPTION_PADDING: SizeStyle = PADDING;
const OPTION_MIN_HEIGHT: SizeStyle = MIN_HEIGHT;
const OPTION_LINE_HEIGHT: SizeStyle = OPTION_MIN_HEIGHT;

export interface Option {
  label: string;
  value: string;
}

export function getStyles(size: Size): StylesConfig<Option> {
  return {
    container: (base) => ({ ...base, width: '100%' }),
    control: (base, { isFocused }) => ({
      ...base,
      borderRadius: BORDER_RADIUS[size],
      padding: 0,
      minHeight: MIN_HEIGHT[size],
      border: isFocused ? `1px solid ${colors.theme500}` : `1px solid ${colors.gray200}`,
      backgroundColor: colors.gray50,
      outline: isFocused ? `1px solid ${colors.theme500}` : 'none',
      '.dark &': {
        border: isFocused ? `1px solid ${colors.theme500}` : `1px solid ${colors.gray700}`,
        outline: isFocused ? `1px solid ${colors.theme500}` : 'none',
        backgroundColor: colors.gray900,
      },
    }),
    valueContainer: (base) => ({ ...base, padding: PADDING[size] }),
    indicatorsContainer: (base) => ({
      ...base,
      display: 'none',
    }),
    indicatorSeparator: (base) => ({ ...base, display: 'none' }),
    input: (base) => ({
      ...base,
      color: colors.gray900,
      fontSize: FONT_SIZE[size],
      lineHeight: LINE_HEIGHT[size],
      padding: 0,
      '.dark &': {
        caretColor: 'white',
        color: 'white',
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: colors.gray900,
      '.dark &': {
        color: colors.gray200,
      },
      fontSize: FONT_SIZE[size],
    }),
    placeholder: (base) => ({
      ...base,
      fontSize: FONT_SIZE[size],
      color: colors.gray400,
      '.dark &': {
        color: colors.gray400,
      },
    }),
    menu: (base) => ({
      ...base,
      overflow: 'hidden',
      margin: MENU_MARGIN[size],
      borderRadius: BORDER_RADIUS[size],
      boxShadow: 'none',
      backgroundColor: 'white',
      border: `1px solid ${colors.gray200}`,
      '.dark &': {
        border: `1px solid ${colors.gray700}`,
        backgroundColor: colors.gray900,
      },
    }),
    option: (base, state) => ({
      ...base,
      fontSize: FONT_SIZE[size],
      minHeight: OPTION_MIN_HEIGHT[size],
      lineHeight: OPTION_LINE_HEIGHT[size],
      padding: OPTION_PADDING[size],
      cursor: 'pointer',
      backgroundColor: state.isFocused || state.isSelected ? colors.gray100 : 'transparent',
      ':hover': {
        ...base[':hover'],
        backgroundColor: colors.gray100,
      },
      ':active': {
        ...base[':active'],
        backgroundColor: colors.gray100,
      },
      color: colors.gray900,
      '.dark &': {
        color: 'white',
        backgroundColor: state.isFocused || state.isSelected ? colors.gray700 : 'transparent',
        ':hover': {
          ...base[':hover'],
          backgroundColor: colors.gray700,
        },
      },
    }),
    noOptionsMessage: (base) => ({
      ...base,
      color: colors.gray400,
      '.dark &': {
        color: colors.gray400,
      },
    }),
  };
}

export const SIZE_STYLE: Record<Size, StylesConfig<Option>> = {
  sm: getStyles('sm'),
  md: getStyles('md'),
  lg: getStyles('lg'),
};
