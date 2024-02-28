import * as React from 'react';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface Props {
  alignment: string;
  setAlignment: React.Dispatch<React.SetStateAction<string>>;
}
export default function ToggleButtons({ alignment, setAlignment }: Props) {
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label='text alignment'
    >
      <ToggleButton value='short_term' aria-label='left aligned'>
        4 weeks
      </ToggleButton>
      <ToggleButton value='medium_term' aria-label='centered'>
        6 months
      </ToggleButton>
      <ToggleButton value='long_term' aria-label='right aligned'>
        lifetime
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
