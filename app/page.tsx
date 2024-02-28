import { getServerSession } from 'next-auth';
import authOptions from './api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }
  return (
    <>
      <div className='bg-neutral-800'>
        getServerSession Result
        {session?.user?.name ? (
          <div>{session?.user?.name}</div>
        ) : (
          <div>Not logged in</div>
        )}
      </div>
    </>
  );
}
