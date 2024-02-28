'use server';
import { AuthSession } from '@/types/types';
import { getServerSession } from 'next-auth';
import authOptions from '@/api/auth/[...nextauth]/authOptions';
import { warn } from 'console';

export async function customGet(url: string, session: AuthSession | null) {
  if (!session) {
    return null;
  }
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.user.access_token}`,
    },
  });
  let data = await res.json();
  return data;
}

export async function customPost(
  url: string = '',
  data: any = {},
  session: AuthSession | null,
) {
  if (!session) {
    return null;
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.user.access_token}`,
    },
    body: JSON.stringify(data),
  });
  let d = await res.json();
  return d;
}

export async function getAuthSession() {
  const session = (await getServerSession(authOptions)) as AuthSession;
  if (!session) {
    return null;
  }
  if (Date.now() <= session.user.expires_at) {
    return null;
  }
  return session;
}
