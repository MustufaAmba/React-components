import { FC } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';

const Header: FC = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="warning">
          <Toolbar>
            <div style={{ flexGrow: 1 }}>
              <Link href="/" passHref legacyBehavior>
                <a href="/">
                  <Typography variant="h6" component="div">
                    <Button sx={{ color: 'white' }}> React Components</Button>
                  </Typography>
                </a>
              </Link>
            </div>

            <Link href="/" passHref legacyBehavior>
              <a href="/">
                {' '}
                <Button sx={{ color: 'white' }}>Todo</Button>
              </a>
            </Link>
            <Link href="/threaded-comments" passHref legacyBehavior>
              <a href="/threaded-comments">
                {' '}
                <Button sx={{ color: 'white' }}>Threaded Comments</Button>
              </a>
            </Link>
            <Link href="/calender" passHref legacyBehavior>
              <a href="/calender">
                {' '}
                <Button sx={{ color: 'white' }}>Calender</Button>
              </a>
            </Link>
            <Link href="/video-player" passHref legacyBehavior>
              <a href="/video-player">
                {' '}
                <Button sx={{ color: 'white' }}>Video Player</Button>
              </a>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Header;
