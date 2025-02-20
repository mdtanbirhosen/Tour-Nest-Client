import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import OurPackages from './OurPackages/OurPackages';
import MeetOurTourGuides from './MeetOurTourGuides/MeetOurTourGuides';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ padding: '2px' }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TourismAndTravelGuide() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'transparent', display: 'flex', justifyContent:'center' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab sx={{fontFamily: 'Roboto Mono', }} label="Our Packages" {...a11yProps(0)} />
          <Tab sx={{fontFamily: 'Roboto Mono'}}  label="Meet Our Tour Guides" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel  value={value} index={0}>
        <OurPackages></OurPackages>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MeetOurTourGuides></MeetOurTourGuides>
      </CustomTabPanel>
    </Box>
  );
}
