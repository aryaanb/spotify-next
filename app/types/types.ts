import { DefaultSession } from 'next-auth';
export interface Track {
  track: string;
  artists: string;
  album: string;
  imageUrl: string;
  spotifyUri: string;
}

export interface AuthUser {
  name: string;
  email: string;
  image: string;
  access_token: string;
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  scope: string;
  id: string;
}

export interface AuthSession extends Omit<DefaultSession, 'user'> {
  user: AuthUser;
  error: string;
}
export interface PlaylistDetails {
  name: string;
  userId: string;
  trackUris: string[];
}
