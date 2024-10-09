
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { AUTHENITCATE_ADMIN_USER } from '@/lib/graphql/mutations/mutations';
import { LoginResponse } from '@/types/types';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleLoginSuccess = (data: LoginResponse) => {
    const { access_token } = data.login;
    localStorage.setItem('token', access_token);
    alert('ログインに成功しました！');
    router.push('/');
  };

  const handleLoginError = () => {
    setError('メールアドレスまたはパスワードが無効です');
  };

  const [login, { loading }] = useMutation(AUTHENITCATE_ADMIN_USER, {
    onCompleted: handleLoginSuccess,
    onError: handleLoginError,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); 
    await login({
      variables: {
        authInput: { email, password },
      },
    });
  };

  return (
    <div>
      <h1>ログイン</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={email}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={password}
          required
        />
        <button type="submit" disabled={loading}>ログイン</button>
      </form>
      <br />
      <p>アカウントをお持ちでない方はこちら↓</p>
      <Link href='/admin_user'>アカウントを作成する</Link>
    </div>
  );
};

export default LoginPage;
