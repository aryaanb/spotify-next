import { Track } from '@/types/types';

export function parseTrackObjects(tracks: any): Track[] {
  if (!tracks) {
    return [];
  }
  let result = [];
  for (let track of tracks) {
    let trackObject = {
      track: track.name,
      artists: '',
      album: track.album.name,
      imageUrl: track.album.images[0].url,
      spotifyUri: track.uri,
    };
    // get artists of the track
    let artists = track.artists;
    let artistsArr = [];
    for (let artist of artists) {
      artistsArr.push(artist.name);
    }
    trackObject.artists = artistsArr.join(', ');
    result.push(trackObject);
  }
  return result;
}
export const extractTrackUris = (tracks: Track[]) => {
  let uris = [];
  for (let row of tracks) {
    uris.push(row.spotifyUri);
  }
  return uris;
};

export const getDate = () => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const d = new Date();
  let month = months[d.getMonth()];
  let year = new Date().getFullYear();
  return {
    month,
    year,
  };
};
