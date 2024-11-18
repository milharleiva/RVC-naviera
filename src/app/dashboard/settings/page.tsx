'use client'

import { useState, useEffect } from 'react';

interface UserData {
  name: string;
  email: string;
}

export default function Settings() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Simulate fetching user data
    const fetchUserData = async () => {
      const data = await new Promise<UserData>((resolve) =>
        setTimeout(() => resolve({ name: 'John Doe', email: 'john.doe@example.com' }), 1000)
      );
      setUserData(data);
    };

    fetchUserData();
    }, []);
  
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