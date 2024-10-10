import { useRouter } from 'next/navigation';

const useAuth = () => {
  const router = useRouter();

  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return { logout, token };
};

export default useAuth;
