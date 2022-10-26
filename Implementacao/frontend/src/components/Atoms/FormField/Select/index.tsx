import React, { ChangeEvent, useEffect, useState } from 'react';

/** Styles */
import * as El from './Select.style';

export type Option = {
  value: any;
  label: string;
}

export type SelectProps = {
  key?: string;
  name?: string;
  selected?: Option;
  options: Option[];
  label: string;
  onChange?: (selectedOption: Option, optionIndex?: number) => void;
}

const Select = ({
  key,
  name,
  selected,
  options,
  label,
  onChange
}: SelectProps) => {
  const [_selected, setSelected] = useState<Option>();
  const [_selectedIndex, setSelectedIndex] = useState<number>();

  useEffect(() => {
    if (selected) {
      setSelected(selected);
    } else if (!_selected) {
      handleChange();
    }
  }, [selected, setSelected])

  const handleChange = (e?: ChangeEvent<HTMLSelectElement>, _selectedIndex: number = 0) => {
    if (options.length) {
      const selectedIndex: number = Number(e?.target?.value || _selectedIndex);
  
      if (selectedIndex >= 0) {
        setSelectedIndex(selectedIndex);
        setSelected(options?.[selectedIndex]);
        onChange?.(options?.[selectedIndex], selectedIndex);
      }
    }
  }

  return (
    <El.Container key={key}>
      <El.Label htmlFor={name}>{label}</El.Label>
      <El.Select name={name} onChange={handleChange} defaultValue={_selectedIndex}>
        {options.map((option, index) => (
          <El.Option value={index}>{option.label}</El.Option>
        ))}
      </El.Select>
    </El.Container>
  )
}

export default Select;