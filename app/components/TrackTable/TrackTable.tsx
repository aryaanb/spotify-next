'use client';
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { tableCellClasses } from '@mui/material/TableCell';
import Grid from '@mui/material/Grid';
import { Button, Container } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { AuthSession, PlaylistDetails, Track } from '@/types/types';
import ToggleButtons from './ToggleButtons';
import AddIcon from '@mui/icons-material/Add';
import { createPlaylist, getTracks } from '../../../lib/actions';
import {
  parseTrackObjects,
  extractTrackUris,
  getDate,
} from '../../../lib/utils';
import SnackBar from '../SnackBar';
import { useSession } from 'next-auth/react';
import authOptions from '@/api/auth/[...nextauth]/authOptions';
import { useRouter } from 'next/navigation';

export default function TrackTable() {
  // session
  const { data: session } = useSession();
  const router = useRouter();

  const [alignment, setAlignment] = useState<string>('short_term');
  const [tracks, setTracks] = useState<Track[]>([]);
  // Snackbar properties
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('Created playlist!');
  const [buttonText, setButtonText] = useState<string>('Add Playlist');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  useEffect(() => {
    const fetchTracks = async () => {
      if (!session) {
        router.push('/login');
      }
      setTracks([]);
      let data = await getTracks(session as AuthSession, alignment);
      if (data) {
        data = parseTrackObjects(data);
        setTracks(data);
      }
    };
    fetchTracks();
  }, [session, alignment, router]);

  const handleCreatePlaylist = async () => {
    let { month, year } = getDate();
    let body: PlaylistDetails = {
      name: `Top Tracks: ${month} ${year}`,
      userId: session?.user?.name || '',
      trackUris: extractTrackUris(tracks),
    };
    setButtonText('Adding playlist');
    setIsButtonDisabled(true);
    await createPlaylist(session as AuthSession, body);
    setOpen(true);
    setButtonText('Add Playlist');
    setIsButtonDisabled(false);
  };
  return (
    <Container maxWidth='xl' className='bg-neutral-900'>
      <SnackBar open={open} setOpen={setOpen} message={message} />
      <Grid
        container
        justifyContent='space-between'
        alignItems='center'
        sx={{ padding: '20px' }}
      >
        {/* Left side */}
        <Grid item>
          <Typography variant='h2'>Top Tracks</Typography>
        </Grid>

        {/* Right side */}
        <Grid item>
          <ToggleButtons alignment={alignment} setAlignment={setAlignment} />
          <Button
            sx={{
              color: 'white',
              marginLeft: '20px',
            }}
            onClick={handleCreatePlaylist}
            startIcon={<AddIcon sx={{}} />}
            disabled={isButtonDisabled}
          >
            {buttonText}
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 450,
            [`& .${tableCellClasses.root}`]: {
              borderBottom: 'none',
            },
          }}
          aria-label='dark-themed table'
          className='bg-neutral-900'
        >
          <TableHead>
            <TableRow>
              <TableCell align='center'>
                <Typography variant='h6' color='#bdbdbd'>
                  #
                </Typography>
              </TableCell>
              <TableCell align='left'>
                <Typography variant='h6' color='#bdbdbd'>
                  Title
                </Typography>
              </TableCell>
              <TableCell align='left'>
                <Typography
                  variant='h6'
                  style={{ textDecoration: 'none', color: 'white' }}
                  color='#bdbdbd'
                >
                  Album
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tracks.map((row, index) => (
              <TableRow
                hover={true}
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='center' sx={{ padding: 0, margin: 0 }}>
                  {index + 1}
                </TableCell>
                <TableCell component='th' scope='row' sx={{ padding: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      src={row.imageUrl}
                      variant='rounded'
                      sx={{
                        width: '80px',
                        height: '80px',
                        marginRight: '16px',
                      }}
                    />

                    <div>
                      <Typography variant='h6'>{row.track}</Typography>
                      <Typography variant='subtitle1' color='#bdbdbd'>
                        {row.artists}
                      </Typography>
                    </div>
                  </div>
                </TableCell>
                <TableCell align='left'>
                  <Typography variant='subtitle1' color='#bdbdbd'>
                    {row.album}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
