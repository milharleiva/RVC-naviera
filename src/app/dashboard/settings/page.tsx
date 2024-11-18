'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import db from '@/lib/db'; // Asegúrate de ajustar la ruta según tu estructura de proyecto

export default function Settings() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    if (session) {
      const fetchUserData = async () => {
        const user = session.user ? await db.usuario.findUnique({
          where: { email: session.user.email ?? '' },
        }) : null;
        if (user) {
          setUserData({ name: `${user.nombre} ${user.apellido}`, email: user.email });
        }
      };

      fetchUserData();
    }
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
}
