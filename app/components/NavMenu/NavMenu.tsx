'use client';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { on } from 'events';
import { StyledEngineProvider } from '@mui/material';
import Container from '@mui/material/Container';
import Image from 'next/image';
import { AuthSession } from '@/types/types';

function SignOutButton() {
  return (
    <button
      className='bg-base-100 border-transparent '
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}

export default function NavMenu() {
  const { data } = useSession();
  const session = data as AuthSession;
  return (
    <div className='navbar bg-neutral-900 '>
      <div className='flex-1'>
        <Link href='/' className='btn btn-ghost text-xl hover:bg-transparent'>
          Spotify TRACKer
        </Link>
      </div>
      <div>
        <Link className='btn btn-ghost text-xl' href='/tracks'>
          Top Tracks
        </Link>
      </div>
      <div className='flex-none mx-3'>
        <div className='dropdown dropdown-end'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost btn-circle avatar'
          >
            <div className='w-10 rounded-full'>
              {session ? (
                <img
                  alt='Tailwind CSS Navbar component'
                  src={session.user.image}
                />
              ) : (
                <img
                  alt='Tailwind CSS Navbar component'
                  src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                />
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-md dropdown-content mt-1 z-[1] p-1 shadow rounded-box w-52'
          >
            {session && (
              <li>
                <SignOutButton />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
