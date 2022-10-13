import { StylesConfig } from 'react-select';
import { Tag } from '../../types/tag';
import chroma from 'chroma-js';

export const colourStyles: StylesConfig<Tag, true> = {
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled ? '#ccc' : isSelected ? (chroma.contrast(color, 'white') > 2 ? 'white' : 'black') : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled ? (isSelected ? data.color : color.alpha(0.3).css()) : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      borderRadius: 8,
      backgroundColor: data.color,
    };
  },
  // multiValueLabel: (styles, { data }) => ({
  //   ...styles,
  //   color: data.color,
  // }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    cursor: 'pointer',
    color: data.color,
    ':hover': {
      borderRadius: 8,
      backgroundColor: data.color,
      color: 'black',
    },
  }),
};
