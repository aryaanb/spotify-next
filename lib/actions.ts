import { AuthSession, PlaylistDetails } from '@/types/types';
import { customGet, customPost } from '@/utils/serverUtils';

export async function getTracks(
  session: AuthSession,
  timeRange: string = 'short_term',
) {
  let url = `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=50`;
  let tracks = await customGet(url, session);
  return tracks?.items;
}

export async function createPlaylist(
  session: AuthSession,
  data: PlaylistDetails,
) {
  const { playlist_id } = await createEmptyPlaylist(session, data.name);
  let url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
  let body = {
    uris: data.trackUris,
  };
  let res = customPost(url, body, session);
  return res;
}
async function createEmptyPlaylist(session: AuthSession, name: string) {
  let url = `https://api.spotify.com/v1/users/${session.user.name}/playlists`;
  let data = {
    name: name,
    public: false,
  };
  let res = await customPost(url, data, session);
  const playlistDetails = {
    playlist_id: res.id,
    playlistUrl: res.external_urls.spotify,
  };
  return playlistDetails;
}
