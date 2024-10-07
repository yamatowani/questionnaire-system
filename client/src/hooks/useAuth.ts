import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt, { JwtPayload } from 'jsonwebtoken';

const useAuth = () => {
  const router = useRouter();
  const [adminUserId, setAdminUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
    } else {
      try {
        const decodedToken = jwt.decode(token) as JwtPayload;
        setAdminUserId(Number(decodedToken.sub));
      } catch (error) {
        console.error('Token decoding error:', error);
        router.push('/login');
      }
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return { logout, adminUserId };
};

export default useAuth;
