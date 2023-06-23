import React, { ChangeEvent, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';

const professions = [ 'professions1', 'professions2', 'professions3', 'professions4', 'professions5', 'professions6', 'professions7', 'professions8', 'professions9', 'professions10', 'professions11' ]

// interface ProfessionProps {
//   professions: string[];
// }

const ProfessionSelectField: React.FC = () => {
  const [ selectedProfessions, setSelectedProfessions ] = useState<string[]>( [] );

  const handleProfessionChange = (
    event: SelectChangeEvent<string[]>
  ) => {
    // setSelectedProfessions( event.target.value as string[] );
    setSelectedProfessions( event.target.value as string[] || [] );
  };

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    profession: string
  ) => {
    const isChecked = event.target.checked;
    if ( isChecked ) {
      setSelectedProfessions( ( prevSelection ) => [ ...prevSelection, profession ] );
    } else {
      setSelectedProfessions( ( prevSelection ) =>
        prevSelection.filter( ( selectedProfession ) => selectedProfession !== profession )
      );
    }
  };

  return (
    <FormControl fullWidth size='small'
    >
      {selectedProfessions.length === 0 && (
        <InputLabel shrink={false} id="profession-label">
          Profession
        </InputLabel>
      )}
      <Select
        id="profession"
        multiple
        value={selectedProfessions}
        onChange={handleProfessionChange}
        input={<OutlinedInput id="profession-select" />}
        renderValue={( selected ) => (
          <Box display='flex' flexWrap='wrap' gap='4px'>
            {( selected as string[] ).map( ( value ) => (
              <Chip key={value} label={value} />
            ) )}
          </Box>
        )}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 224,
            },
          },
        }}
      >
        {professions.map( ( profession ) => (
          <MenuItem key={profession} value={profession} >
            <Checkbox
              sx={{ p: '4px' }}
              size='small'
              checked={selectedProfessions.includes( profession )}
              onChange={( e ) => handleCheckboxChange( e, profession )}
            />
            {profession}
          </MenuItem>
        ) )}
      </Select>
    </FormControl>
  );
};

export default ProfessionSelectField;
