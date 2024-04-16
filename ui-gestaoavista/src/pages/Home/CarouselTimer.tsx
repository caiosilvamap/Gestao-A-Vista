import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { useState } from 'react';

const Input = styled(MuiInput)`
  width: 42px;
`;

interface CarouselTimerProps {
  onChange: (value: number) => void; 
}

export default function CarouselTimer({ onChange }: CarouselTimerProps) {
  const [value, setValue] = useState<number>(5);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    onChange(newValue as number); 
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 5) {
      setValue(5);
    } else if (value > 15) {
      setValue(15);
    }
    onChange(value);
  };

  return (
    <Box sx={{ width: 250 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            defaultValue={5}
            min={5}
            max={15}
            step={1}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            sx= {{color: '#1976d2'}}
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 5,
              max: 15,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
