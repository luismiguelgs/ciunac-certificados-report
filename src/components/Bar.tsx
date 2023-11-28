import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Bar() {
  return (
    <React.Fragment>
        <Box sx={{ flexGrow: 1, pb:2}}>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Recepción de Certificados 
                </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    </React.Fragment>
  )
}
