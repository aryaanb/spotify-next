// src/theme.ts
'use client';
import { Roboto } from 'next/font/google';
import { Varela_Round } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const varela = Varela_Round({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'dark', // handle the dark mode state on toggle
    background: {
      default: '#222222',
    },
  },
  typography: {
    fontFamily: varela.style.fontFamily,
    fontSize: 16,
  },
});
export default theme;
