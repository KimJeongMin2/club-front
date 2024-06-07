import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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

export default function TabBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(getInitialTab());

  function getInitialTab() {
    switch (location.pathname) {
      case "/club":
        return 0;
      case "/Notice":
        return 1;
      case "/video":
        return 2;
      case "/picture":
        return 3;
      case "/MyClub":
        return 4;
      default:
        return 5;
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/club");
        break;
      case 1:
        navigate("/Notice");
        break;
      case 2:
        navigate("/video");
        break;
      case 3:
        navigate("/picture");
        break;
      case 4:
        navigate("/MyClub");
        break;
      default:
        break;
    }
  };

  return (
    <Box
      position="static"
      sx={{
        marginTop: '10px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
      style={{ display: 'relative', zIndex: 3 }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
      >
        <Tab
          label="동아리 조회"
          sx={{ color: "black", marginLeft: "1em", marginRight: "1em", fontSize: '16px' }}
        />
        <Tab
          label="동아리 행사"
          sx={{ color: "black", marginLeft: "1em", marginRight: "1em", fontSize: '16px' }}
        />
        <Tab
          label="동영상"
          sx={{ color: "black", marginLeft: "1em", marginRight: "1em", fontSize: '16px' }}
        />
        <Tab
          label="사진"
          sx={{ color: "black", marginLeft: "1em", marginRight: "1em", fontSize: '16px' }}
        />
        <Tab
          label="내 동아리 조회"
          sx={{ color: "black", marginLeft: "1em", marginRight: "1em", fontSize: '16px' }}
        />
      </Tabs>
    </Box>
  );
}
