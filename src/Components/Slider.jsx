import { Slider, Switch } from 'antd';
import { useState } from 'react';

const Sliders = ({ value, onChange }) => {
  const [disabled, setDisabled] = useState(false);

  const handleSliderChange = (newValue) => {
    onChange(newValue, disabled);
  };


  return (
    <>
      <Slider value={value} onAfterChange={handleSliderChange} onChange={handleSliderChange} disabled={disabled} />
    </>
  );
};

export default Sliders;
