import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ThemeKey } from "./resume.theme";

const ResumeThemeSelector = ({
  value,
  onChange,
}: {
  value: ThemeKey;
  onChange: (v: ThemeKey) => void;
}) => {
  return (
    <FormControl fullWidth size="small">
      <InputLabel>Resume Theme</InputLabel>
      <Select
        value={value}
        label="Resume Theme"
        onChange={(e) => onChange(e.target.value as ThemeKey)}
      >
        <MenuItem value="classic">Classic</MenuItem>
        <MenuItem value="elegant">Elegant</MenuItem>
        <MenuItem value="modern">Modern</MenuItem>
        <MenuItem value="dark">Dark</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ResumeThemeSelector;
