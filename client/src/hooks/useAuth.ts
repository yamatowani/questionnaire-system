import { useRouter } from 'next/navigation';

const useAuth = () => {
  const router = useRouter();

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return { logout, getToken };
};

export default useAuth;
