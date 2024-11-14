import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProductTable from '../product/ProductTable';

export default function ProductsTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ maxWidth: { xs: 380, sm: '100%' }, bgcolor: '#b0b0b0' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
          sx={{
            '& .MuiTabs-scrollButtons.Mui-disabled': { opacity: 0.3 },
            '& .MuiTabs-indicator': {
              backgroundColor: '#FF5722', // Custom indicator color
            },
            '& .MuiTab-root': {
              // color: '#FFFFFF', // Font color for unselected tabs
              '&.Mui-selected': {
                color: 'black', // Font color for selected tab
              },
            },
          }}
        >
          <Tab label="All Products" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
          <Tab label="Item Four" />
          <Tab label="Item Five" />
          <Tab label="Item Six" />
          <Tab label="Item Seven" />
        </Tabs>

        {/* Render content for each tab */}
        <Box sx={{ p: 3, width: '100%', overflow: 'auto' }}>
          {value === 0 && <ProductTable />}
          {value === 1 && <Box>Content for Item Two</Box>}
          {value === 2 && <Box>Content for Item Three</Box>}
          {value === 3 && <Box>Content for Item Four</Box>}
          {value === 4 && <Box>Content for Item Five</Box>}
          {value === 5 && <Box>Content for Item Six</Box>}
          {value === 6 && <Box>Content for Item Seven</Box>}
        </Box>
      </Box>
    </div>
  );
}
