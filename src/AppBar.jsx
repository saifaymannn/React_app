import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/system';

function CustomAppBar({ setDietFilter, setCountryFilter }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Recipe Web
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Select
            defaultValue=""
            onChange={(e) => setDietFilter(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{ mr: 2 }}
          >
            <MenuItem value="">
              <em>Dietary Filter</em>
            </MenuItem>
            <MenuItem value="balanced">Balanced</MenuItem>
            <MenuItem value="high-protein">High-Protein</MenuItem>
            <MenuItem value="low-fat">Low-Fat</MenuItem>
            <MenuItem value="low-carb">Low-Carb</MenuItem>
            <MenuItem value="vegan">Vegan</MenuItem>
            <MenuItem value="vegetarian">Vegetarian</MenuItem>
            {/* Add more dietary options as needed */}
          </Select>
          <Select
            defaultValue=""
            onChange={(e) => setCountryFilter(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">
              <em>Country Filter</em>
            </MenuItem>
            <MenuItem value="italian">Italian</MenuItem>
            <MenuItem value="mexican">Mexican</MenuItem>
            <MenuItem value="chinese">Chinese</MenuItem>
            <MenuItem value="indian">Indian</MenuItem>
            {/* Add more country options as needed */}
          </Select>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default CustomAppBar;
