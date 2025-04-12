import { useEffect, useState } from 'react';
import { ref, onValue, off, set, get, DataSnapshot } from 'firebase/database';
import { database } from '../config/firebase';
import { hashIP, getRateLimitKey } from '../utils/security';

export function useFirebaseData<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const dbRef = ref(database, path);

    const handleData = (snapshot: DataSnapshot) => {
      setData(snapshot.val());
      setLoading(false);
    };

    const handleError = (err: Error) => {
      setError(err);
      setLoading(false);
    };

    onValue(dbRef, handleData, handleError);

    return () => {
      off(dbRef);
    };
  }, [path]);

  const updateData = async (newData: T) => {
    try {
      const dbRef = ref(database, path);
      await set(dbRef, newData);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return { data, loading, error, updateData };
}

export async function checkRateLimit(ipAddress: string): Promise<boolean> {
  const ipHash = await hashIP(ipAddress);
  const rateLimitRef = ref(database, getRateLimitKey(ipHash));
  const snapshot = await get(rateLimitRef);
  
  if (snapshot.exists()) {
    const lastSubmission = snapshot.val().lastSubmission;
    const timeDiff = Date.now() - lastSubmission;
    return timeDiff >= 300000; // 5 minutes in milliseconds
  }
  
  return true;
}

export async function updateRateLimit(ipAddress: string): Promise<void> {
  const ipHash = await hashIP(ipAddress);
  const rateLimitRef = ref(database, getRateLimitKey(ipHash));
  await set(rateLimitRef, {
    lastSubmission: Date.now()
  });
}