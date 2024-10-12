import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState('');

  const updateTime = () => {
    const now = new Date().toLocaleString();
    setCurrentTime(now);
  };

  useEffect(() => {
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box 
      sx={{ 
        backgroundColor: '#333', 
        color: 'white', 
        textAlign: 'center', 
        padding: '10px', 
        position: 'fixed', 
        bottom: 0, 
        left: 0,
        right: 0,
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}
    >
      <Typography variant="body2" sx={{ marginLeft: 2 }}>
        {currentTime} 
      </Typography>
      <Typography variant="body2" sx={{ marginRight: 2 }}>
        Developed by Mahin Hussain<br/>IIT KGP
      </Typography>
    </Box>
  );
};

export default Footer;
