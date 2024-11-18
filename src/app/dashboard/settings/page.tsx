'use client';

import { useState, useEffect } from 'react';
import { useSession} from 'next-auth/react';
import db from '@/lib/db';

const SettingsPage: React.FC = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.email) {
        const user = await db.usuario.findUnique({
          where: { email: session.user.email },
        });

        if (user) {
          setUserData({ name: `${user.nombre} ${user.apellido}`, email: user.email });
        }
      }
    };

    fetchUserData();
  }, [session]);

  return (
    <div>
      <h1>Settings</h1>
      {userData ? (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SettingsPage;
