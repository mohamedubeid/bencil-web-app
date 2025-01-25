import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import { ProfessionProps } from '../../auth/interfaces';

const professions: string[] = [ 'professions1', 'professions2', 'professions3', 'professions4', 'professions5', 'professions6', 'professions7', 'professions8', 'professions9', 'professions10', 'professions11' ]

const ProfessionSelectField: React.FC<ProfessionProps> = ( {
  placeholder,
  name,
  onChange,
  handleCheckboxChange,
  value,
  helperText,
  error
} ) => {
  return (
    <FormControl fullWidth size='small' error={error}>
      {value.length === 0 && (
        <InputLabel shrink={false} id="profession-label">
          {placeholder}
        </InputLabel>
      )}
      <Select id="profession" multiple name={name} value={value} onChange={onChange} input={<OutlinedInput id="profession-select" />}
        renderValue={( selected: string[] ) => (
          <Box display='flex' flexWrap='wrap' gap='4px'>
            {( selected as string[] ).map( ( value ) => (
              <Chip key={value} label={value} />
            ) )}
          </Box>
        )}
        MenuProps={{ PaperProps: {style: {maxHeight: 224}}}}>
        {professions.map( ( profession ) => (
          <MenuItem key={profession} value={profession} >
            <Checkbox
              sx={{ p: '4px' }}
              size='small'
              checked={value.includes( profession )}
              onChange={( e ) => handleCheckboxChange( e, profession )}
            />
            {profession}
          </MenuItem>
        ) )}
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default ProfessionSelectField;
